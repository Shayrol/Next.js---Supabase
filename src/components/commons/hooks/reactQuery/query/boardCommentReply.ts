import { getRelativeTime } from "@/src/commons/date/getRelativeTime";
import { createClient } from "@/utils/supabase/component";

export interface IReply {
  id: number;
  comment_id: number;
  board_id: number;
  created_at: string;
  body: string;
  user_id: {
    id: number;
    name: string;
    email: string;
    picture: string | null;
  };
}

export const fetchReply = async (
  board_id: string
): Promise<{ data: IReply[] }> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reply")
    .select(`*, user_id:users(id, name, email, picture)`)
    .eq("board_id", board_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log("Error fetching reply: ", error.message);
    return { data: [] };
  }

  const transformedData: IReply[] = data.map((reply) => ({
    ...reply,
    created_at: getRelativeTime(reply.created_at),
  }));
  return { data: transformedData };
};
