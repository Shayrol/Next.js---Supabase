import { AuthError, User } from "@supabase/supabase-js";
import { supabase } from "../../../Supabase";

type FetchUserIdResult = {
  data: { user: User } | { user: null };
  error: AuthError | null;
};

export const fetchUserId = async (): Promise<FetchUserIdResult> => {
  let dataQuery = supabase.auth.getUser();

  const { data, error } = await dataQuery;

  if (error) {
    console.log("Error fetching data:", error);
  }

  return { data, error };
};
