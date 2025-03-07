// fetchSearchBoards로 통합으로 해당 fetchBoards는 사용 안함

// import { useQuery } from "@tanstack/react-query";
import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";
// import { supabase } from "../../../Supabase";

export interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  tag: string | string[] | undefined;
  storage: string | null;
  comment_count: number;
  like: number;
  user_id: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
}

// export const fetchBoards = async (
//   page: number,
//   tag: string | string[] | undefined
// ): Promise<{ data: IBoards[]; count: number | null }> => {
//   // console.log("page: ", page);
//   const supabase = createClient();
//   const start = page * 10;
//   const end = start + 9;

//   // 데이터 가져오기 쿼리
//   let dataQuery = supabase
//     .from("page")
//     .select(`*, user_id:users(id, name, email, picture)`)
//     .order("created_at", { ascending: false })
//     .range(start, end);

//   // 전체 개수를 가져오기 위한 쿼리
//   let countQuery = supabase.from("page").select("id", { count: "exact" }); // 단순히 count만 계산

//   if (tag !== "전체") {
//     // 태그 조건 적용
//     dataQuery = dataQuery.eq("tag", tag);
//     countQuery = countQuery.eq("tag", tag); // count도 동일 조건 적용
//   }

//   // 데이터 및 count 결과 가져오기
//   const { data, error: dataError } = await dataQuery;
//   const { count, error: countError } = await countQuery;
//   console.log("fetchBoards: ", data);

//   // 에러 처리
//   if (dataError || countError) {
//     console.error("Error fetching data:", dataError || countError);
//     return { data: [], count: null };
//   }

//   const transformedData = data.map((board) => ({
//     ...board,
//     created_at: getRelativeTime(board.created_at),
//   }));

//   return { data: transformedData as IBoards[], count };
// };

export const fetchBoardsPopular = async (
  page: number,
  tag: string | string[] | undefined
): Promise<{ data: IBoards[]; count: number | null }> => {
  // console.log("page: ", page);
  const supabase = createClient();
  const start = page * 10;
  const end = start + 9;

  // 데이터 가져오기 쿼리
  let dataQuery = supabase
    .from("page")
    .select(`*, user_id:users(id, name, email, picture)`)
    .order("like", { ascending: false })
    .range(start, end);

  // 전체 개수를 가져오기 위한 쿼리
  let countQuery = supabase.from("page").select("id", { count: "exact" }); // 단순히 count만 계산

  if (tag !== "전체") {
    // 태그 조건 적용
    dataQuery = dataQuery.eq("tag", tag);
    countQuery = countQuery.eq("tag", tag); // count도 동일 조건 적용
  }

  // 데이터 및 count 결과 가져오기
  const { data, error: dataError } = await dataQuery;
  const { count, error: countError } = await countQuery;
  console.log("fetchBoards: ", data);

  // 에러 처리
  if (dataError || countError) {
    console.error("Error fetching data:", dataError || countError);
    return { data: [], count: null };
  }

  const transformedData = data.map((board) => ({
    ...board,
    created_at: getRelativeTime(board.created_at),
  }));

  return { data: transformedData as IBoards[], count };
};

export const fetchBoards = async (
  page: number,
  tag: string | string[] | undefined,
  opt: string | string[] | undefined
): Promise<{ data: IBoards[]; count: number | null }> => {
  // console.log("page: ", page);
  const supabase = createClient();
  const start = page * 10;
  const end = start + 9;

  let dataQuery = supabase
    .from("page")
    .select(`*, user_id:users(id, name, email, picture)`);

  // 전체 개수를 가져오기 위한 쿼리
  let countQuery = supabase.from("page").select("id", { count: "exact" }); // 단순히 count만 계산

  // .order("created_at", { ascending: false })

  if (tag !== "전체") {
    if (opt === "popular") {
      // 태그 조건 적용
      dataQuery = dataQuery
        .range(start, end)
        .eq("tag", tag)
        .order("like", { ascending: false })
        .order("created_at", { ascending: false });
      countQuery = countQuery.eq("tag", tag);
    } else {
      dataQuery = dataQuery
        .range(start, end)
        .eq("tag", tag)
        .order("created_at", { ascending: false });
      countQuery = countQuery.eq("tag", tag);
    }
  } else {
    dataQuery = dataQuery.order("created_at", { ascending: false });
  }

  // 데이터 및 count 결과 가져오기
  const { data, error: dataError } = await dataQuery;
  const { count, error: countError } = await countQuery;
  console.log("fetchBoards: ", data);

  // 에러 처리
  if (dataError || countError) {
    console.error("Error fetching data:", dataError || countError);
    return { data: [], count: null };
  }

  const transformedData = data.map((board) => ({
    ...board,
    created_at: getRelativeTime(board.created_at),
  }));

  return { data: transformedData as IBoards[], count };
};
