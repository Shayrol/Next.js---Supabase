import { createClient } from "@/utils/supabase/component";

export interface IBoard {
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

export const fetchBoard = async (
  boardId: string
): Promise<{ data: IBoard }> => {
  const supabase = createClient();

  let dataQuery = supabase
    .from("page")
    .select(`*, user:users(id, name, email, picture)`)
    .eq("id", boardId)
    .single();

  const { data, error } = await dataQuery;
  console.log("상세 게시물: ", data);

  return { data: data as IBoard };
};
