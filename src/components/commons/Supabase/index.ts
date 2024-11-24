import { createClient } from "@supabase/supabase-js";

const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabase = createClient(supabaseUrl, supabaseKey);

// 사용 안할거임 - 소셜로그인 #문제로 사용X
// utils / supabase / component.ts 사용할 예정
