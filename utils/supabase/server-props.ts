// SSR(로그인 상태 관리 포함)
// 용도: SSR 환경에서 데이터를 가져오거나, 인증된 상태를 관리하는 경우.
// 예시: 로그인 후 특정 페이지에서 데이터 렌더링 시.
// 특징: req.cookies에서 인증 정보를 읽음 / Set-Cookie 헤더로 쿠키 업데이트.

// 즉 로그인을 통한 정보(로그인 유저 정보, 유저가 등록한 게시물, 댓글 등등)
// 의 데이터를 가져올 때 사용됨 그 외 ssr, csr 요청은 component.ts를 사용하고..
// getServerSideProps()에서만 사용됨 api.ts는 /api 폴더 경로에서 요청하는 경우에만 사용
import { type GetServerSidePropsContext } from "next";
import { createServerClient, serializeCookieHeader } from "@supabase/ssr";

export function createSClient({ req, res }: GetServerSidePropsContext) {
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

// 로그인 같은 경우는 일반적인 csr, ssr 요청이 가능한 component.ts에서 사용을 하고

// 로그인 후 유저 정보나 유저가 등록한 게시물, 댓글 등의 데이터를 ssr로 가져오거나
// 로그인이 필요한 페이지 접속을 할 경우 사용됨
