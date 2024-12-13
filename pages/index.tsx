import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import * as S from "../styles/userBoards.styles";
import { GetServerSidePropsContext } from "next";
import {
  fetchBoards,
  fetchBoardsPopular,
  IBoards,
} from "@/src/components/commons/hooks/reactQuery/query/boards";
import { useRouter } from "next/router";
import Pagination01 from "@/src/components/pagination/01/pagination";
import Link from "next/link";
import { fetchSearchBoards } from "@/src/components/commons/hooks/reactQuery/query/searchBoards";
import { createClient } from "@/utils/supabase/component";
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

// 키워드 구분하기 위함
const SECRET = "@#$%";

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

  const [meta, setMeta] = useState(metaData);
  const [isOpen, setIsOpen] = useState(false);
  const [keywordState, setKeywordState] = useState<
    string | string[] | undefined
  >(undefined);
  const [boardsOpt, setBoardOpt] = useState(false);

  const supabase = createClient();

  const router = useRouter();
  const isFirstMountPage = useRef(true);
  const isFirstMountTag = useRef(true);
  const page = Number(router.query.page) || 1;
  const tag = router.query.tag || "전체";
  const Keyword = router.query.keyword || undefined;
  const limit = 10;

  console.log("검색 값: ", Keyword);

  const pagination: IPage = {
    currentPage: page,
    totalPages: Math.ceil((data.count ?? 10) / limit),
  };

  // pagination 업데이트
  useEffect(() => {
    // 첫 마운트 시 실행 X
    if (isFirstMountPage.current) {
      isFirstMountPage.current = false;
      return;
    }
    if (!router.query.page) return;

    const resultData = async () => {
      // const result = await fetchBoards(page - 1, tag);
      const result = await fetchSearchBoards(page - 1, tag, keywordState);
      setData({ count: result.count, initialData: result.data });
    };
    resultData();
  }, [router.query.page]);

  // tag 업데이트
  useEffect(() => {
    // 첫 마운트 시 실행 X
    if (isFirstMountTag.current) {
      isFirstMountTag.current = false;
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

  // 검색
  const onClickSearch = async () => {
    const result = await fetchSearchBoards(0, tag, keywordState);
    setData({ count: result.count, initialData: result.data });

    // 현재 queryString에서 page를 제거
    const { page, ...updatedQuery } = router.query;

    void router.push(
      {
        pathname: router.pathname,
        query: { ...updatedQuery, keyword: keywordState },
      },
      undefined,
      { shallow: true }
    );
  };

  // 검색 Enter
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  // 게시물 리스트 옵션
  const onClickAll = async () => {
    const result = await fetchBoards(0, "전체");

    setData({ count: result.count, initialData: result.data });
    setBoardOpt(false);
  };

  const onClickPopular = async () => {
    const result = await fetchBoardsPopular(0, "전체");

    setData({ count: result.count, initialData: result.data });
    setBoardOpt(true);
  };

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
                <S.TagOptionWrap onClick={() => setIsOpen((prev) => !prev)}>
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
                  defaultValue={keywordState}
                  onChange={(e) => setKeywordState(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <S.SearchButton onClick={onClickSearch}>
                  <S.SearchImg src="/images/logo/filter-logo/search.png" />
                </S.SearchButton>
              </S.SearchWrap>
              <Link href={`/boardWriter`}>
                <S.OptionImg src="/images/logo/filter-logo/writer.png" />
              </Link>
            </S.OptionWrap>
          </S.Filter>
          <S.BoardsOptWrap>
            <S.BoardsAll boardsOpt={boardsOpt} onClick={onClickAll}>
              최신
            </S.BoardsAll>
            <S.BoardsPopular boardsOpt={boardsOpt} onClick={onClickPopular}>
              인기
            </S.BoardsPopular>
          </S.BoardsOptWrap>
        </S.FilterWrap>
        <S.BoardsList>
          {data?.initialData?.length > 0 ? (
            data.initialData.map((el) => (
              <S.BoardItem key={el.id} onClick={() => router.push(`${el.id}`)}>
                <S.LikeWrap>
                  <S.LikeCountImg src="/images/logo/send.png" />
                  <S.LikeCount>{el.like}</S.LikeCount>
                </S.LikeWrap>{" "}
                {/* 추후에 추천수 표기 예정 */}
                <S.BoardInfoWrap>
                  <S.TitleWrap>
                    <S.Title>
                      {el.title
                        .replaceAll(
                          String(keywordState),
                          `${SECRET}${keywordState}${SECRET}`
                        )
                        .split(SECRET)
                        .map((el, index) => (
                          <S.TextToken
                            isMatched={keywordState === el}
                            key={el + index}
                          >
                            {el}
                          </S.TextToken>
                        ))}
                    </S.Title>
                    <S.CommentCount>
                      {el.comment_count !== 0 ? `[${el.comment_count}]` : ""}
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
            ))
          ) : (
            <S.EmptyMessage>게시물이 없습니다.</S.EmptyMessage>
          )}
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
  const keyword = context.query.keyword || undefined;

  // const { data, count } = await fetchBoards(page, tag);
  const { data, count } = await fetchSearchBoards(page, tag, keyword);
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

// 최신, 인기순 추가하기
// 댓글 추천 추가
// 대댓글 추가
