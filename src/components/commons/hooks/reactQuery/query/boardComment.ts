import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";

export interface IBoardComment {
  id: number;
  board_id: number;
  user_id: string;
  created_at: string;
  body: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
}

export const fetchBoardComment = async (
  boardId: string
): Promise<{ data: IBoardComment[] }> => {
  const supabase = createClient();

  let dataQuery = supabase
    .from("comment")
    .select("*, user:users(id, name, email, picture)")
    .eq("board_id", boardId)
    .order("created_at", { ascending: false });

  const { data, error } = await dataQuery;

  if (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }

  const transformedData: IBoardComment[] = data.map((board) => ({
    ...board,
    created_at: getRelativeTime(board.created_at),
  }));

  return { data: transformedData };
};
