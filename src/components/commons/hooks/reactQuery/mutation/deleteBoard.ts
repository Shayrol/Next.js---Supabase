import { createClient } from "@/utils/supabase/component";

export const fetchBoardDelete = async (boardId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("page").delete().eq("id", boardId);

  if (error) {
    console.log("Delete error: ", error);
  }
};
