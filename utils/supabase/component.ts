// SSR과 CSR 통합이 필요한 경우
// 로그인이 필요없는 일반적인 data(게시글 목록, page, search, tag 등등)
// 즉 모든 사용자가 접근할 수 있는 데이터에 사용됨

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
}
