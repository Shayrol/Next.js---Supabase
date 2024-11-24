import { useEffect, useRef, useState } from "react";
import * as S from "../styles/userBoards.styles";
import { GetServerSidePropsContext } from "next";
import {
  fetchBoards,
  IBoards,
} from "@/src/components/commons/hooks/reactQuery/query/boards";
import { useRouter } from "next/router";
import Pagination01 from "@/src/components/pagination/01/pagination";
import Head from "next/head";
import Link from "next/link";

interface ISSRProps {
  initialData: IBoards[];
  count: number | null;
  metaData: {
    metaTag: string;
    metaPage: number;
  };
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
}: ISSRProps): JSX.Element {
  const [data, setData] = useState<IBoardsProps>({
    count: count,
    initialData: initialData,
  });
  const [meta, setMeta] = useState(metaData);

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

  // 켜뮤니티 사이드 탭 - 전체, 자유, 유머, 질문
  const AsideQuery = async (tag: string) => {
    const result = await fetchBoards(0, tag);

    setData({ count: result.count, initialData: result.data });
    setMeta({ metaTag: tag, metaPage: 0 });
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

  return (
    <S.Wrap>
      {/* <Head> */}
      {/* 동적 메타 태그 */}
      <title>{`${meta.metaTag} 게시판`}</title>
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

      <S.AsideWrap>
        <S.AsideNav>
          <S.AsideUl>
            {tags.map((el) => (
              <S.AsideLi key={el.name}>
                <S.AsideBtn
                  onClick={() => AsideQuery(el.name)}
                  activeOption={(router.query.tag ?? "전체") === el.name}
                >
                  {el.name}
                </S.AsideBtn>
              </S.AsideLi>
            ))}
          </S.AsideUl>
        </S.AsideNav>
      </S.AsideWrap>

      <S.BoardsWrap>
        <div style={{ width: "100%", height: "70px" }}>
          옵션 및 검색 공간<Link href={`/boardWriter`}>게시글 작성</Link>
        </div>
        <S.BoardsList>
          {data.initialData?.map((el) => (
            <S.BoardItem key={el.id} onClick={() => console.log("실행")}>
              <S.Id>{el.id}</S.Id> {/* 추후에 추천수 표기 예정 */}
              <S.BoardInfoWrap>
                <S.TitleWrap>
                  <S.Title>{el.title}</S.Title>
                </S.TitleWrap>
                <S.UserWrap>
                  <S.Tag>
                    {/* 커뮤니티에 자유, 유머, 질문, 영상 등 분류 예정 */}
                    {el.tag}
                  </S.Tag>
                  <S.Created>
                    {el.created_at
                      ? // ? getRelativeTime(el.created_at)
                        el.created_at
                      : "Loading.."}
                  </S.Created>
                  <S.User>{el.user?.name}</S.User>
                </S.UserWrap>
              </S.BoardInfoWrap>
              {/* 이미지 부분 */}
              <S.Img src="/images/placeholders/placeholder-image.svg" />
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

  const metaData = {
    metaTag: tag,
    metaPage: page,
  };
  return {
    props: {
      initialData: data || [],
      count: count || null,
      metaData: metaData,
    },
  };
};

// import UserBoard from "@/src/components/units/UserBoard/userBoard";
// import { AuthError, createClient, Provider, User } from "@supabase/supabase-js";
// import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

// type DataType =
//   | { provider: Provider; url: string }
//   | { provider: Provider; url: null };
// type ErrorType = AuthError | null;

// const supabaseUrl = "https://jhkgsclggcdyvqleruhq.supabase.co";
// const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_KEY);
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function SupabasesPage() {
// const [userLogin, setUserLogin] = useState<User | null>(null);
// const [page, setPage] = useState<any[]>([]); // 게시물 데이터를 저장할 상태 추가
// const [title, setTitle] = useState<string>(""); // 제목 상태
// const [body, setBody] = useState<string>(""); // 본문 상태
// console.log("user: ", userLogin);
// console.log("page: ", page);
// // github 소셜로그인 하기
// const signInWithGithub = async () => {
//   const { data }: { data: DataType; error: ErrorType } =
//     await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: "http://localhost:3000/",
//       },
//     });
//   console.log("data: ", data);
// };
// // 로그인 상태 확인
// const getUser = async () => {
//   const session = await supabase.auth.getUser();
//   console.log("session: ", session.data.user);
//   setUserLogin(session.data.user);
// };
// // 로그아웃
// const signOutWithGithub = async () => {
//   const { error } = await supabase.auth.signOut();
//   console.log("error: ", error);
//   if (!error) {
//     setUserLogin(null);
//   }
// };
// // 전체 게시물 개수
// const fetchTotalPages = async () => {
//   const { count } = await supabase
//     .from("page")
//     .select("*", { count: "exact" }); // 총 개수 가져오기
//   console.log(count); // 전체 페이지 수 계산
// };
// const [pageNumber, setPageNumber] = useState(0); // 페이지 번호 상태 추가
// // 게시물 데이터를 가져오는 함수
// const refreshHistory = async () => {
//   const start = pageNumber * 5;
//   const end = start + 4; // 한 번에 5개의 항목만 가져옴
// const { data, error } = await supabase
//   .from("page")
//   .select("*")
//   .order("created_at", { ascending: true })
//   .range(start, end); // 데이터 범위를 설정
//   if (error) {
//     console.error("Error fetching page data: ", error);
//   } else {
//     setPage(data || []);
//   }
// };
// // 다음 페이지로 이동하는 함수
// const loadNextPage = () => {
//   setPageNumber((prev) => prev + 1);
// };
// // 이전 페이지로 이동하는 함수
// const loadPreviousPage = () => {
//   setPageNumber((prev) => (prev > 0 ? prev - 1 : 0));
// };
// // 페이지 번호가 변경될 때마다 데이터 새로 불러오기
// useEffect(() => {
//   refreshHistory();
// }, [pageNumber]);
// // 게시물 등록 함수
// const recordHandler = async (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   if (userLogin === null) {
//     alert("로그인 후 이용 가능합니다.");
//     return;
//   }
//   const { data, error } = await supabase
//     .from("page")
//     .insert([{ title, body }])
//     .select();
//   console.log("sub: ", data);
//   refreshHistory();
//   setTitle("");
//   setBody("");
// };
// // 게시물 삭제 함수
// const deleteRecord = async (id: User) => {
//   if (confirm("삭제하시겠습니까?")) {
//     const { error } = await supabase.from("page").delete().eq("id", id);
//     refreshHistory();
//   }
//   return;
// };
// // 게시물 수정 함수
// const updateRecord = async (id: User) => {
//   const { data, error } = await supabase
//     .from("page")
//     .update([{ title: "수정하기5", body: "수정되었습니다." }])
//     .eq("id", id)
//     .select();
//   refreshHistory();
// };
// // title
// const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
//   setTitle(event.target.value);
// };
// // body
// const handleBodyChange = (event: ChangeEvent<HTMLInputElement>): void => {
//   setBody(event.target.value);
// };
// // useEffect로 컴포넌트가 처음 렌더링될 때 데이터와 로그인 상태 확인
// useEffect(() => {
//   getUser(); // 로그인 상태 확인
//   // refreshHistory(); // 게시물 데이터 가져오기
// }, []);
// return (
//   <main style={{ border: "1px solid blue" }}>
//     <h1>Supabase Auth</h1>
//     {userLogin === null ? (
//       <button id="login" onClick={signInWithGithub}>
//         Login
//       </button>
//     ) : (
//       <button id="logout" onClick={signOutWithGithub}>
//         Logout
//       </button>
//     )}
//     {/* 게시물 데이터 렌더링 */}
//     <div style={{ border: "1px solid red" }}>
//       {/* <h1>Boards</h1> */}
//       {page.length > 0 ? (
//         page.map((el) => (
//           <div
//             key={el.id}
//             style={{
//               border: "1px solid black",
//               borderRadius: "10px",
//               padding: "5px",
//             }}
//           >
//             <div>title: {el.title}</div>
//             <div>body: {el.body}</div>
//             <div>user_id: {el.user_id}</div>
//             <div>id: {el.id}</div>
//             {userLogin?.id === el.user_id ? (
//               <>
//                 <button onClick={() => deleteRecord(el.id)}>삭제</button>
//                 <button onClick={() => updateRecord(el.id)}>수정</button>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No page data available</p>
//       )}
//     </div>
//     {/* 게시물 작성 */}
//     <form style={{ border: "1px solid green" }} onSubmit={recordHandler}>
//       <input
//         type="text"
//         id="title"
//         placeholder="title"
//         onChange={handleTitleChange}
//       />
//       <input
//         type="text"
//         id="body"
//         placeholder="body"
//         onChange={handleBodyChange}
//       />
//       <button type="submit">create</button>
//     </form>
//     <button onClick={loadPreviousPage}>Prev</button>
//     <button onClick={loadNextPage}>Next</button>
//     <button onClick={fetchTotalPages}>게시물 개수</button>
//   </main>
// );
// }
