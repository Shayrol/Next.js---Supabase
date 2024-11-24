// import { useQuery } from "@tanstack/react-query";
import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";
// import { supabase } from "../../../Supabase";

export interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  tag: string | string[] | undefined;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
}

export const fetchBoards = async (
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
    .select(`*, user:users(id, name, email, picture)`)
    .order("created_at", { ascending: false })
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

// export const fetchBoards = async (
//   page: number,
//   tag: string | string[] | undefined
// ): Promise<{ data: IBoards[]; count: number | null }> => {
//   console.log("page: ", page);
//   const start = page * 5;
//   const end = start + 4;
//   let query = supabase
//     .from("page")
//     .select("*", { count: "exact" })
//     .order("created_at", { ascending: false })
//     .range(start, end);

//   if (tag !== "전체") {
//     query = query.eq("tag", tag);
//   }

//   const { data, count, error } = await query;

//   if (error) {
//     console.error("Error fetching data:", error);
//     return { data: [], count: null };
//   }

//   return { data, count };
// };

// export const useBoards = (page: number) => {
//   return useQuery<IBoards[]>({
//     queryKey: ["boards", page],
//     queryFn: () => fetchBoards(page),
//     gcTime: Infinity,
//     staleTime: 5 * 60 * 1000, // 5분간 데이터 요청X 이후 새로운 데이터 요청함
//   });
// };
