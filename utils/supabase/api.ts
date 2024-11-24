// API 라우트에서 사용
// 용도: Next.js API 라우트에서 요청/응답을 통해 Supabase와 통신.
// 예시: 서버에서만 처리해야 하는 작업(예: 민감 데이터 처리, 인증 관련 작업)
//       데이터베이스와 통신하거나 특정 비즈니스 로직 수행.
// 특징: NextApiRequest와 NextApiResponse를 활용
//       요청(req)에서 쿠키를 읽고, 응답(res)으로 쿠키를 설정 가능.

import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { type NextApiRequest, type NextApiResponse } from "next";

export default function createClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || "",
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return supabase;
}
