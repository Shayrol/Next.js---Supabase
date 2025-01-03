import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";

export interface IBoardComment {
  id: number;
  board_id: number;
  created_at: string;
  body: string;
  like: number;
  unlike: number;
  like_users: string;
  user_id: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
}

export const fetchBoardComment = async (
  boardId: string,
  opt: string
): Promise<{ data: IBoardComment[] }> => {
  const supabase = createClient();

  let dataQuery = supabase
    .from("comment")
    .select("*, user_id:users(id, name, email, picture)")
    .eq("board_id", boardId);

  if (opt === "popular") {
    dataQuery = dataQuery
      .order("like", { ascending: false })
      .order("created_at", { ascending: false });
  } else {
    dataQuery = dataQuery.order("created_at", { ascending: false });
  }

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
