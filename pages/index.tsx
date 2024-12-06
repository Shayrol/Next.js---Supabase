import { useEffect, useRef, useState } from "react";
import * as S from "../styles/userBoards.styles";
import { GetServerSidePropsContext } from "next";
import {
  fetchBoards,
  IBoards,
} from "@/src/components/commons/hooks/reactQuery/query/boards";
import { useRouter } from "next/router";
import Pagination01 from "@/src/components/pagination/01/pagination";
import Link from "next/link";
// import {
//   fetchBoardComments,
//   IBoardComments,
// } from "@/src/components/commons/hooks/reactQuery/query/boardComment";

interface ISSRProps {
  initialData: IBoards[];
  count: number | null;
  metaData: {
    metaTag: string;
    metaPage: number;
  };
  // commentData: IBoardComments[];
}

interface IBoardsProps {
  initialData: IBoards[];
  count: number | null;
}

// pagination 타입 - 현재 페이지, 전체 페이지 개수
interface IPage {
  currentPage: number;
  totalPages: number;
}

// 커뮤니티 사이트 탭
const tags = [
  { name: "전체" },
  { name: "자유" },
  { name: "유머" },
  { name: "질문" },
];

export default function UserBoards({
  initialData,
  count,
  metaData,
}: // commentData,
ISSRProps): JSX.Element {
  const [data, setData] = useState<IBoardsProps>({
    count: count,
    initialData: initialData,
  });

  // console.log("commentData", commentData);

  const [meta, setMeta] = useState(metaData);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const isFirstMount = useRef(true);
  const page = Number(router.query.page) || 1;
  const tag = router.query.tag || "전체";
  const limit = 10;

  const pagination: IPage = {
    currentPage: page,
    totalPages: Math.ceil((data.count ?? 10) / limit),
  };

  // 페이지 이동시 - tag 유지 상태로 페이지 이동
  useEffect(() => {
    // 첫 마운트 시 실행 X
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!router.query.page) return;

    const resultData = async () => {
      const result = await fetchBoards(page - 1, tag);
      setData({ count: result.count, initialData: result.data });
    };
    resultData();
  }, [router.query.page]);

  useEffect(() => {
    // 첫 마운트 시 실행 X
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!router.query.tag) return;

    const resultData = async () => {
      const result = await fetchBoards(0, tag);
      setData({ count: result.count, initialData: result.data });
    };
    resultData();
  }, [router.query.tag]);

  // 켜뮤니티 사이드 탭 - 전체, 자유, 유머, 질문
  const AsideQuery = async (tag: string) => {
    const result = await fetchBoards(0, tag);

    setData({ count: result.count, initialData: result.data });
    setMeta({ metaTag: tag, metaPage: 0 });
    setIsOpen(false);

    void router.push(
      {
        pathname: router.pathname,
        query: { tag },
      },
      undefined,
      { shallow: true }
    );
  };

  const color = "#a3a3a3";

  // 태그 옵션
  const onClickToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 태그 옵션 조건
  const onClickToggleOpen = () => {
    if (!isOpen) return;
    setIsOpen((prev) => !prev);
  };

  console.log("Imagedata: ", data.initialData);

  return (
    <S.Wrap onClick={onClickToggleOpen}>
      {/* <Head> */}
      {/* 동적 메타 태그 */}
      <title>{`${meta.metaTag} 게시판 - BeeHappy`}</title>
      <meta
        name="description"
        content={`${meta.metaTag} 커뮤니티 게시판. 다양한 주제의 게시글을 확인하세요.`}
      />

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

      <S.BoardsWrap>
        <S.FilterWrap>
          <S.Filter>
            <S.TagSelectWrap>
              <S.MainTag onClick={onClickToggle}>
                <S.TagSelect>{tag}</S.TagSelect>
                <S.TagSelectImg src="/images/logo/filter-logo/bottom-arrow.png" />
              </S.MainTag>
              {isOpen ? (
                <S.TagOptionWrap>
                  {tags.map((el) => (
                    <S.TagOption key={el.name}>
                      <S.TagOptionBtn onClick={() => AsideQuery(el.name)}>
                        {el.name}
                      </S.TagOptionBtn>
                    </S.TagOption>
                  ))}
                </S.TagOptionWrap>
              ) : (
                <></>
              )}
            </S.TagSelectWrap>
            <S.OptionWrap>
              <S.SearchWrap>
                <S.SearchInput
                  type="input"
                  placeholder="검색어를 입력해 주세요."
                />
                <S.SearchImg src="/images/logo/filter-logo/search.png" />
              </S.SearchWrap>
              <Link href={`/boardWriter`}>
                <S.OptionImg src="/images/logo/filter-logo/writer.png" />
              </Link>
            </S.OptionWrap>
          </S.Filter>
        </S.FilterWrap>
        <S.BoardsList>
          {data.initialData?.map((el) => (
            <S.BoardItem key={el.id} onClick={() => router.push(`${el.id}`)}>
              <S.Id>{el.id}</S.Id> {/* 추후에 추천수 표기 예정 */}
              <S.BoardInfoWrap>
                <S.TitleWrap>
                  <S.Title>{el.title}</S.Title>
                  <S.CommentCount>
                    {el.commentCount !== 0 ? `[${el.commentCount}]` : ""}
                  </S.CommentCount>
                </S.TitleWrap>
                <S.UserWrap>
                  <S.Tag>
                    {/* 커뮤니티에 자유, 유머, 질문, 영상 등 분류 예정 */}
                    {el.tag}
                  </S.Tag>
                  <S.Created>
                    {el.created_at ? el.created_at : "Loading.."}
                  </S.Created>
                  <S.User>{el.user_id.name}</S.User>
                </S.UserWrap>
              </S.BoardInfoWrap>
              {/* 이미지 부분 */}
              {el.storage?.length === 0 ? (
                <S.Img src="/images/placeholders/placeholder-image.svg" />
              ) : (
                <S.Img src={el.storage?.[0]} />
              )}
            </S.BoardItem>
          ))}
        </S.BoardsList>
        <Pagination01 pagination={pagination} />
      </S.BoardsWrap>
    </S.Wrap>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 데이터 요청은 page 0번 부터 가져오고 pagination은 1번 부터 가져와서 이렇게 해줘야 했음..
  const page =
    Number(context.query.page) === 0 ? 0 : Number(context.query.page) - 1 || 0;

  const tag = context.query.tag || "전체";

  const { data, count } = await fetchBoards(page, tag);
  // const { data: commentData } = await fetchBoardComments();

  const metaData = {
    metaTag: tag,
    metaPage: page,
  };
  return {
    props: {
      initialData: data || [],
      count: count || null,
      metaData: metaData,
      // commentData,
    },
  };
};
