import { createClient } from "@/utils/supabase/component";
import { createSClient } from "@/utils/supabase/server-props";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "./boardEdit.styles";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/src/components/commons/hooks/yup/validation";
import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";

const ToastEditorEdit = dynamic(
  () => import("../../../src/components/commons/hooks/Editor/ToastEditorEdit"),
  {
    ssr: false,
  }
);

interface IBoardEditProps {
  user: User;
  initialData: IBoard;
}

export interface IForm {
  title: string;
  body: string;
  tag: string;
}

export default function BoardWriter({ user, initialData }: IBoardEditProps) {
  const supabase = createClient();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  console.log("user: ", user);
  console.log("initialData: ", initialData);

  const { register, handleSubmit, trigger, setValue, formState } =
    useForm<IForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

  const onClickSubmit = async (data: IForm): Promise<void> => {
    const { title, body, tag } = data;

    const { data: insertedData, error } = await supabase
      .from("page")
      .update([{ title, body, tag, storage: images }])
      .eq("id", router.query.boardId)
      .select();

    if (error) {
      console.error("데이터 저장 실패:", error.message);
    } else {
      console.log("저장된 데이터:", insertedData);
      void router.push(`/${router.query.boardId}`);
    }
  };

  const onClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setValue("body", initialData.body);
  }, []);

  const color = "#b3b3b3";
  return (
    <S.Wrap>
      <S.WriteWrap>
        <S.BoardTitle>게시글 수정</S.BoardTitle>
        <S.FormWrap onSubmit={handleSubmit(onClickSubmit)}>
          <S.OptionWrap>
            <S.Option
              {...register("tag")}
              name="tag"
              defaultValue={initialData.tag}
            >
              <option value="" disabled>
                태그를 선택하세요
              </option>
              <option value="자유">자유</option>
              <option value="질문">질문</option>
              <option value="유머">유머</option>
            </S.Option>
            <S.Error>{formState.errors.tag?.message}</S.Error>
          </S.OptionWrap>
          <S.TitleWrap>
            <S.Title
              type="text"
              {...register("title")}
              placeholder="제목"
              defaultValue={initialData.title}
            />
            <S.Error>{formState.errors.title?.message}</S.Error>
          </S.TitleWrap>

          <S.EditorWrap>
            <ToastEditorEdit
              images={images}
              setImages={setImages}
              setValue={setValue}
              trigger={trigger}
              data={initialData.body}
            />
            <S.Error>{formState.errors.body?.message}</S.Error>
          </S.EditorWrap>

          <S.ButtonWrap>
            <S.Button type="button" onClick={onClickBack}>
              취소
            </S.Button>
            <S.Button type="submit">수정</S.Button>
          </S.ButtonWrap>
        </S.FormWrap>
      </S.WriteWrap>
    </S.Wrap>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createSClient(context);

  const { data, error } = await supabase.auth.getUser();
  const { data: dataBoard } = await fetchBoard(String(context.query.boardId));

  if (error || !data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      // loginRequired: true,
    };
  }

  if (dataBoard.user_id !== data.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user || null,
      initialData: dataBoard,
    },
  };
};
