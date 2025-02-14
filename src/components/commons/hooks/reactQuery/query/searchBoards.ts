// import { useQuery } from "@tanstack/react-query";
import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";
// import { supabase } from "../../../Supabase";

export interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  // user_id: string;
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

export const fetchSearchBoards = async (
  page: number,
  tag: string | string[] | undefined,
  keyword: string | string[] | undefined,
  opt: string | string[] | undefined
): Promise<{ data: IBoards[]; count: number | null }> => {
  // console.log("page: ", page);
  const supabase = createClient();
  const start = page * 10;
  const end = start + 9;

  // 데이터 가져오기 쿼리
  let dataQuery = supabase
    .from("page")
    .select(`*, user_id:users(id, name, email, picture)`)
    .range(start, end);

  // 전체 개수를 가져오기 위한 쿼리
  let countQuery = supabase.from("page").select("id", { count: "exact" }); // 단순히 count만 계산

  // 태그가 전체가 아닌 경우
  if (tag !== "전체") {
    // 옵션이 인기순인 경우
    if (opt === "popular") {
      // 검색을 한 경우
      if (keyword !== undefined) {
        dataQuery = dataQuery
          .eq("tag", tag)
          .order("like", { ascending: false })
          .order("created_at", { ascending: false })
          .ilike("title", `%${keyword}%`);
        countQuery = countQuery.eq("tag", tag).ilike("title", `%${keyword}%`);
      } else {
        dataQuery = dataQuery
          // .range(start, end)
          .eq("tag", tag)
          .order("like", { ascending: false })
          .order("created_at", { ascending: false });
        countQuery = countQuery.eq("tag", tag);
      }
    } else {
      if (keyword !== undefined) {
        dataQuery = dataQuery
          .eq("tag", tag)
          .order("like", { ascending: false })
          .order("created_at", { ascending: false })
          .ilike("title", `%${keyword}%`);
        countQuery = countQuery.eq("tag", tag).ilike("title", `%${keyword}%`);
      } else {
        dataQuery = dataQuery
          .eq("tag", tag)
          .order("like", { ascending: false })
          .order("created_at", { ascending: false });
        countQuery = countQuery.eq("tag", tag);
      }
    }
  } else {
    if (opt === "popular") {
      if (keyword !== undefined) {
        dataQuery = dataQuery
          .order("like", { ascending: false })
          .order("created_at", { ascending: false })
          .ilike("title", `%${keyword}%`);
        countQuery = countQuery.ilike("title", `%${keyword}%`);
      } else {
        dataQuery = dataQuery
          .range(start, end)
          .order("like", { ascending: false })
          .order("created_at", { ascending: false });
        countQuery = countQuery.ilike("title", `%${keyword}%`);
      }
    } else {
      if (keyword !== undefined) {
        dataQuery = dataQuery
          .order("created_at", { ascending: false })
          .ilike("title", `%${keyword}%`);
        countQuery = countQuery.ilike("title", `%${keyword}%`);
      } else {
        dataQuery = dataQuery.order("created_at", { ascending: false });
      }
    }
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
