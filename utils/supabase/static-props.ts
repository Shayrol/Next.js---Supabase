// CSR(클라이언트에서 요청 시)
// 용도: 클라이언트에서 데이터를 요청하거나 수정하는 데 사용.
// 예시: 검색, 버튼 클릭, 실시간 업데이트와 같은 작업.
// 특징: 쿠키 관리나 인증 상태를 다루지 않음.
// 즉 모두에게 공개 된(로그인 필요없는) 데이터를 CSR로만 불러오는 경우 사용

import { createClient as createClientPrimitive } from "@supabase/supabase-js";

export function createClient() {
  const supabase = createClientPrimitive(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
}
