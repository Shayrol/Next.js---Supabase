import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "../../styles/userBoard.styles";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface ISSRProps {
  initialData: IBoard;
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
}

const ToastViewer = dynamic(
  () => import("../../src/components/commons/hooks/Editor/TuiViewer"),
  {
    ssr: false,
  }
);

export default function UserBoard({
  initialData,
  userLogin,
}: ISSRProps): JSX.Element {
  const router = useRouter();

  const boardUserId = initialData.user.id;
  const loginUserId = userLogin?.id;
  console.log("boardId: ", router.query.boardId);
  console.log("initialData: ", initialData.user.id);

  console.log("login Data: ", userLogin?.id);

  const color = "#cdcdcd";

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
                  <S.ViewCount>조회수: 229</S.ViewCount>
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
    </S.Wrap>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const boardId = String(context.query.boardId);

  const { data } = await fetchBoard(boardId);

  return {
    props: {
      initialData: data,
    },
  };
};
