import { createClient } from "@/utils/supabase/component";
import { createSClient } from "@/utils/supabase/server-props";
import { User } from "@supabase/supabase-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "./boardWriter.styles";

export default function BoardWriter({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();

  return (
    <S.Wrap>
      <S.WriteWrap>
        <div>{user.user_metadata.name}님 환영합니다.</div>
        <div>입력공간</div>
      </S.WriteWrap>
    </S.Wrap>
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
