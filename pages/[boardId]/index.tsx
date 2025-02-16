import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "../../styles/userBoard.styles";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";
import {
  fetchBoardComment,
  IBoardComment,
} from "@/src/components/commons/hooks/reactQuery/query/boardComment";
import {
  fetchReply,
  IReply,
} from "@/src/components/commons/hooks/reactQuery/query/boardCommentReply";
import CommentList from "@/src/components/boardDetail/CommentList/commentList";

interface ISSRProps {
  initialData: IBoard;
  dataComment: IBoardComment[];
  userLogin: User | null;
  reply: IReply[];
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

export interface IFormReply {
  bodyReply: string;
}

export interface IFormCommentReply {
  bodyCommentReply: string;
}

export default function UserBoard({
  initialData,
  dataComment,
  userLogin,
  reply,
}: ISSRProps): JSX.Element {
  const router = useRouter();
  const [comment] = useState<IBoardComment[]>(dataComment);
  const [like, setLike] = useState<number>(initialData.like);
  const [unlike, setUnlike] = useState<number>(initialData.unlike);

  const boardUserId = String(initialData.user_id);
  const loginUserId = String(userLogin?.id);
  const supabase = createClient();

  // 게시글 삭제
  const onClickDeleteBoard = async () => {
    const { error } = await supabase
      .from("page")
      .delete()
      .eq("id", initialData.id);

    if (error) {
      console.log("게시글 삭제 실패: ", error);
    } else {
      router.push("/");
    }
  };

  // 추천 - 게시물
  const onClickUpLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    // 추천을 했는지 추천한 유저 데이터 가져오기
    const { data: currentComment, error: fetchError } = await supabase
      .from("page")
      .select("like_users")
      .eq("id", router.query.boardId)
      .single();

    if (fetchError) {
      console.error("Error fetching comment:", fetchError.message);
      return;
    }

    // 현재 로그인한 유저 id와 data 저장 확인 후 추천 했는지 확인
    const likeUsers = currentComment.like_users || [];
    if (likeUsers.includes(userLogin.id)) {
      alert("이미 추천하셨습니다.");
      return;
    }

    // 추천 카운트 증가 및 추천한 유저 정보 저장
    const { data, error } = await supabase
      .from("page")
      .update({
        like: like + 1,
        like_users: [...likeUsers, userLogin.id],
      })
      .eq("id", initialData.id);

    if (error) {
      console.log("like count error: ", error.message);
    }
    setLike((prev) => prev + 1);
  };

  // 비추천 - 게시물
  const onClickDownLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data: currentComment, error: fetchError } = await supabase
      .from("page")
      .select("like_users")
      .eq("id", router.query.boardId)
      .single();

    if (fetchError) {
      console.error("Error fetching comment:", fetchError.message);
      return;
    }

    const likeUsers = currentComment.like_users || [];
    if (likeUsers.includes(userLogin.id)) {
      alert("이미 추천하셨습니다.");
      return;
    }

    const { data, error } = await supabase
      .from("page")
      .update({
        unlike: unlike + 1,
        like_users: [...likeUsers, userLogin.id], // Add user ID to like_users
      })
      .eq("id", initialData.id);

    if (error) {
      console.log("like count error: ", error.message);
    }
    setUnlike((prev) => prev + 1);
  };

  useEffect(() => {
    const result = async () => {
      const { data, error } = await supabase
        .from("page")
        .update({ views: initialData.views + 1 })
        .eq("id", router.query.boardId);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
        });
      }
      return new Response(JSON.stringify({ data }), { status: 200 });
    };

    result();
  }, []);

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
                  <S.ViewCount>조회수: {initialData.views + 1}</S.ViewCount>
                  <S.CommentCount>댓글: {comment.length}</S.CommentCount>
                  <S.LikeCount>추천: {initialData.like}</S.LikeCount>
                </S.MetaInfoWrap>
              </S.TitleUserInfoWrap>
              {boardUserId === loginUserId ? (
                <S.EditDeleteWrap>
                  <S.Edit>
                    <Link href={`/${router.query.boardId}/edit`}>수정</Link>
                  </S.Edit>
                  <S.Delete>
                    <div onClick={onClickDeleteBoard}>삭제</div>
                  </S.Delete>
                </S.EditDeleteWrap>
              ) : (
                <></>
              )}
            </S.BoardTitleWrap>
            <S.BoardBody>
              <ToastViewer content={initialData.body} />
            </S.BoardBody>
            <S.LikeCountWrap>
              <S.LikeCountBtn onClick={onClickUpLike}>
                <S.LikeImg src="/images/logo/up-arrow.png" />
                <S.LikeCountInfo>{like}</S.LikeCountInfo>
              </S.LikeCountBtn>
              <S.UnLikeCountBtn onClick={onClickDownLike}>
                <S.LikeImg src="/images/logo/down-arrow.png" />
                <S.LikeCountInfo>{unlike}</S.LikeCountInfo>
              </S.UnLikeCountBtn>
            </S.LikeCountWrap>
          </S.BoardInfoWrap>
        )}

        {/* 댓글, 대댓글 */}
        <CommentList
          dataComment={dataComment}
          userLogin={userLogin}
          initialData={initialData}
          reply={reply}
        />
      </S.BoardWrap>

      {/* 게시글 댓글 */}
    </S.Wrap>
  );
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const boardId = String(context.query.boardId);

//   const { data } = await fetchBoard(boardId);
//   const { data: dataComment } = await fetchBoardComment(boardId, "latest");
//   const { data: reply } = await fetchReply(boardId);

//   return {
//     props: {
//       initialData: data,
//       dataComment,
//       reply,
//     },
//   };
// };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const boardId = String(context.query.boardId);

  const results = await Promise.allSettled([
    fetchBoard(boardId),
    fetchBoardComment(boardId, "latest"),
    fetchReply(boardId),
  ]);

  const [data, dataComment, reply] = results.map((result) =>
    result.status === "fulfilled" ? result.value.data : null
  );

  return {
    props: {
      initialData: data,
      dataComment,
      reply,
    },
  };
};
