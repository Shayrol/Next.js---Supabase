import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";

export interface IBoard {
  id: number;
  title: string;
  body: string;
  created_at: string;
  // user_id: string;
  tag: string | string[] | undefined;
  storage: string | null;
  views: number;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
  user_id: string;
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

  const transformedData = {
    ...data,
    created_at: getRelativeTime(data.created_at),
  };

  return { data: transformedData as IBoard };
};
