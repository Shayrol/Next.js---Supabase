import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "../../styles/userBoard.styles";
import dynamic from "next/dynamic";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createSClient } from "@/utils/supabase/server-props";
import { createClient } from "@/utils/supabase/component";
import {
  fetchBoardComment,
  IBoardComment,
} from "@/src/components/commons/hooks/reactQuery/query/boardComment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaComment } from "@/src/components/commons/hooks/yup/validation";

interface ISSRProps {
  initialData: IBoard;
  dataComment: IBoardComment[];
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
}

const ToastViewer = dynamic(
  () => import("../../src/components/commons/hooks/Editor/TuiViewer"),
  {
    ssr: false,
  }
);

export interface IForm {
  body: string;
}

export default function UserBoard({
  initialData,
  dataComment,
  userLogin,
}: ISSRProps): JSX.Element {
  const router = useRouter();
  const [comment, setComment] = useState<IBoardComment[]>(dataComment);
  const [inputCount, setInputCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"popular" | "latest">(
    "popular"
  );

  const boardUserId = initialData.user.id;
  const loginUserId = userLogin?.id;
  // const supabase = createClient();

  const color = "#cdcdcd";

  console.log("dataComment: ", dataComment);
  console.log("comment: ", comment);

  const { register, handleSubmit, trigger, formState } = useForm<IForm>({
    resolver: yupResolver(schemaComment),
    mode: "onChange",
  });

  const onClickSubmit = () => {};

  // 댓글 입력 수
  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };

  // 댓글 인기, 최신순
  const handleOptionClick = (option: "popular" | "latest") => {
    setSelectedOption(option);
  };

  return (
    <S.Wrap>
      {/* <Head> */}
      {/* 동적 메타 태그 */}
      <title>{`${initialData.title} - BeeHappy`}</title>
      <meta name="description" content={`${initialData.body}`} />

      {/* Open Graph 메타 태그 */}
      {/* <meta property="og:title" content={`${meta.metaTag} 게시판`} /> */}
      {/* <meta
          property="og:description"
          content={`${meta.metaTag} 커뮤니티 게시판. 다양한 주제의 게시글을 확인하세요.`}
        /> */}
      {/* <meta property="og:type" content="website" /> */}
      {/* <meta
          property="og:url"
          content={`https://your-domain.com${router.asPath}`}
        /> */}
      {/* <meta property="og:image" content="/path/to/default-og-image.jpg" /> */}

      {/* Twitter Card */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta name="twitter:title" content={`${meta.metaTag} 게시판`} /> */}
      {/* <meta
          name="twitter:description"
          content={`${meta.metaTag} 커뮤니티 게시판. 다양한 주제의 게시글을 확인하세요.`}
        /> */}
      {/* <meta name="twitter:image" content="/path/to/default-og-image.jpg" /> */}
      {/* </Head> */}

      <S.BoardWrap>
        {initialData.id && (
          <S.BoardInfoWrap>
            <S.BoardTitleWrap>
              <S.Title>{initialData.title}</S.Title>
              <S.TitleUserInfoWrap>
                <S.UserInfoWrap>
                  <S.Tag>{initialData.tag}</S.Tag>
                  <S.Created>{initialData.created_at}</S.Created>
                  <S.Name>{initialData.user.name}</S.Name>
                </S.UserInfoWrap>
                <S.MetaInfoWrap>
                  <S.ViewCount>조회수: {initialData.views}</S.ViewCount>
                  <S.CommentCount>댓글: 2</S.CommentCount>
                  <S.LikeCount>추천: 5</S.LikeCount>
                </S.MetaInfoWrap>
              </S.TitleUserInfoWrap>
              {boardUserId === loginUserId ? (
                <S.EditDeleteWrap>
                  <S.Edit>
                    <Link href={`/${router.query.boardId}/edit`}>수정</Link>
                  </S.Edit>
                  <S.Delete>
                    <Link href={"/"}>삭제</Link>
                  </S.Delete>
                </S.EditDeleteWrap>
              ) : (
                <></>
              )}
            </S.BoardTitleWrap>
            <S.BoardBody>
              <ToastViewer content={initialData.body} />
            </S.BoardBody>
          </S.BoardInfoWrap>
        )}
      </S.BoardWrap>

      {/* 게시글 댓글 */}
      <S.CommentWrap>
        <S.CommentHeader>
          <S.CommentHeaderTitle>댓글</S.CommentHeaderTitle>
          <S.CommentHeaderCount>
            총<S.Count>{comment.length}</S.Count>개
          </S.CommentHeaderCount>
        </S.CommentHeader>
        <S.TextAreaWrap onSubmit={handleSubmit(onClickSubmit)}>
          <S.TextArea
            {...register("body")}
            onChange={onTextareaHandler}
            maxLength={1000}
            placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 며예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
          />
          <S.TextButtonWrap>
            <S.TextCount>({inputCount}/1000)</S.TextCount>
            <S.CommentBtn>작성</S.CommentBtn>
          </S.TextButtonWrap>
          <S.Error>{formState.errors.body?.message}</S.Error>
        </S.TextAreaWrap>
        <S.CommentListWrap>
          <S.CommentListOpt>
            <S.ListOptBtn
              isSelected={selectedOption === "popular"}
              onClick={() => handleOptionClick("popular")}
            >
              인기순
            </S.ListOptBtn>
            <S.ListOptBtn
              isSelected={selectedOption === "latest"}
              onClick={() => handleOptionClick("latest")}
            >
              최신순
            </S.ListOptBtn>
          </S.CommentListOpt>
          {comment.map((el) => (
            <S.CommentListInfoWrap
              key={el.id}
              isAuthor={boardUserId === el.user_id}
            >
              <S.CommentLikeWrap>
                <div>↑</div>
                <div>0</div>
                <div>↓</div>
              </S.CommentLikeWrap>
              <S.CommentInfoWrap>
                <S.CommentUserInfoWrap>
                  <S.User isAuthor={boardUserId === el.user_id}>
                    {loginUserId === el.user.id ? "작성자" : el.user.name}
                  </S.User>
                  <S.CommentCreated>{el.created_at}</S.CommentCreated>
                </S.CommentUserInfoWrap>
                <S.CommentBody>{el.body}</S.CommentBody>
                <S.ReplyWrap>
                  <S.Report>신고</S.Report>
                  <S.Reply>답글 쓰기</S.Reply>
                </S.ReplyWrap>
              </S.CommentInfoWrap>
            </S.CommentListInfoWrap>
          ))}
        </S.CommentListWrap>
      </S.CommentWrap>
    </S.Wrap>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const boardId = String(context.query.boardId);

  const { data } = await fetchBoard(boardId);
  const { data: dataComment } = await fetchBoardComment(boardId);

  return {
    props: {
      initialData: data,
      dataComment,
    },
  };
};
