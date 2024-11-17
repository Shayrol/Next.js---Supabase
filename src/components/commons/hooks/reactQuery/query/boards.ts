import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../Supabase";

export interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  tag: string | string[] | undefined;
}

export const fetchBoards = async (
  page: number,
  tag: string | string[] | undefined
): Promise<IBoards[]> => {
  console.log("page: ", page);
  const start = page * 5;
  const end = start + 4;
  let query = supabase
    .from("page")
    .select("*")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (tag !== "전체") {
    query = query.eq("tag", tag);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data;

  // if (error) throw new Error(error.message);
  // return data as IBoards[];
};

// export const useBoards = (page: number) => {
//   return useQuery<IBoards[]>({
//     queryKey: ["boards", page],
//     queryFn: () => fetchBoards(page),
//     gcTime: Infinity,
//     staleTime: 5 * 60 * 1000, // 5분간 데이터 요청X 이후 새로운 데이터 요청함
//   });
// };
