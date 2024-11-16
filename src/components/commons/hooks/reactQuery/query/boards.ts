import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../Supabase";

interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

const fetchBoards = async (page: number): Promise<IBoards[]> => {
  console.log("page: ", page);
  const start = page * 5;
  const end = start + 4;
  const { data, error } = await supabase
    .from("page")
    .select("*")
    .order("created_at", { ascending: false })
    .range(start, end);
  if (error) throw new Error(error.message);
  return data as IBoards[];
};

export const useBoards = (page: number) => {
  return useQuery<IBoards[]>({
    queryKey: ["boards", page],
    queryFn: () => fetchBoards(page),
    gcTime: Infinity,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 요청X 이후 새로운 데이터 요청함
  });
};
