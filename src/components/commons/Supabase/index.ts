import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhkgsclggcdyvqleruhq.supabase.co";
const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_KEY);
export const supabase = createClient(supabaseUrl, supabaseKey);
