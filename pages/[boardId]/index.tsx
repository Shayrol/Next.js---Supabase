import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "../../styles/userBoard.styles";
import dynamic from "next/dynamic";

interface ISSRProps {
  initialData: IBoard;
}

const ToastViewer = dynamic(
  () => import("../../src/components/commons/hooks/Editor/TuiViewer"),
  {
    ssr: false,
  }
);

export default function UserBoard({ initialData }: ISSRProps): JSX.Element {
  const router = useRouter();
  console.log("boardId: ", router.query.boardId);
  console.log("initialData: ", initialData);

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
        {/* <div>{initialData.id}</div>
        <div>{initialData.tag}</div>
        <div>{initialData.user?.name}</div>
        <div>{initialData.title}</div>
        <div>{initialData.body}</div> */}
        {initialData.id && (
          <>
            <div>title: {initialData.title}</div>
            <ToastViewer content={initialData.body} />
          </>
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
