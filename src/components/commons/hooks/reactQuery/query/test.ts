import { supabase } from "../../../Supabase";
import { IBoards } from "./boards";

export const test = async (tag: string): Promise<IBoards[]> => {
  let query = supabase
    .from("page")
    .select("*")
    .order("created_at", { ascending: false });

  if (tag !== "전체") {
    query = query.eq("tag", tag);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data;
};
