import { createClient } from "@/utils/supabase/component";
import { createSClient } from "@/utils/supabase/server-props";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function BoardWriter({ user }: { user: User }) {
  const isFirstMount = useRef(true);
  const supabase = createClient();
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      router.push(`/login`);
    }
  };

  useEffect(() => {
    // 첫 마운트 시 실행 X
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    console.log("userEffect 실행");
    getUser();
  }, []);

  return (
    <div>
      <div>{user.user_metadata.name}님 환영합니다.</div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createSClient(context);
  // const currentUrl = window.location.href;

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      // loginRequired: true,
    };
  }

  return {
    props: {
      user: data.user || null,
      // loginRequired: false, // 로그인 상태 전달
    },
  };
};
