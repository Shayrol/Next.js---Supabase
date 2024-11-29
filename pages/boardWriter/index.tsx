import { createClient } from "@/utils/supabase/component";
import { createSClient } from "@/utils/supabase/server-props";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "./boardWriter.styles";
import { FormEvent } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/src/components/commons/hooks/yup/validation";

const ToastEditor = dynamic(
  () => import("../../src/components/commons/hooks/Editor/ToastEditor"),
  {
    ssr: false,
  }
);

export interface IForm {
  title: string;
  body: string;
  tag: string;
}

export default function BoardWriter({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();

  const { register, handleSubmit, trigger, setValue, formState } =
    useForm<IForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

  const onClickSubmit = async (data: IForm): Promise<void> => {
    const { title, body, tag } = data;

    const { data: insertedData, error } = await supabase
      .from("page")
      .insert([{ title, body, tag }])
      .select();

    if (error) {
      console.error("데이터 저장 실패:", error.message);
    } else {
      console.log("저장된 데이터:", insertedData);
      void router.push("/");
    }
  };

  const onClickBack = () => {
    router.back();
  };

  const color = "#b3b3b3";
  return (
    <S.Wrap>
      <S.WriteWrap>
        <S.BoardTitle>게시글 작성</S.BoardTitle>
        <S.FormWrap onSubmit={handleSubmit(onClickSubmit)}>
          <S.OptionWrap>
            <S.Option {...register("tag")} name="tag" defaultValue="">
              <option value="" disabled>
                태그를 선택하세요
              </option>
              <option value="자유">자유</option>
              <option value="질문">질문</option>
              <option value="유머">유머</option>
            </S.Option>
            <S.Error>{formState.errors.tag?.message}</S.Error>
          </S.OptionWrap>

          {/* <input type="text" name="title" placeholder="title" /> */}
          {/* <input type="text" name="body" placeholder="body" /> */}
          <S.TitleWrap>
            <S.Title type="text" {...register("title")} placeholder="제목" />
            <S.Error>{formState.errors.title?.message}</S.Error>
          </S.TitleWrap>

          <S.EditorWrap>
            <ToastEditor setValue={setValue} trigger={trigger} />
            <S.Error>{formState.errors.body?.message}</S.Error>
          </S.EditorWrap>

          <S.ButtonWrap>
            <S.Button type="button" onClick={onClickBack}>
              취소
            </S.Button>
            <S.Button type="submit">등록</S.Button>
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

  if (error || !data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      // loginRequired: true,
    };
  }

  return {
    props: {
      user: data.user || null,
      // loginRequired: false, // 로그인 상태 전달
    },
  };
};

// 텍스트 등록은 되는데 이미지 저장을 어떻게 처리를 해줘야 할지 찾는중
// 이미지가 base64로 저장이 되어 서버에 저장하기에는 과부화 걸릴 수 있어
// 먼저 이미지를 서버에 저장을 하고 서버에서 반환되는 이미지 주소를
// 게시물 서버에 저장을 하고 불러올 때도 해당 이미지를 가져와야 하는데
// 어떻게 해줘야 할지 모르겠음
// 이미지와 텍스트가 혼합되어서 저장을 하고 이미지를 불러오는 방법 찾아야 함
