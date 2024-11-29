import { createClient } from "@/utils/supabase/component";
import * as S from "./login.styles";
import Link from "next/link";
import { createSClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";

export default function LoginPage() {
  const supabase = createClient();

  // github
  const signInWithGithub = async () => {
    // 현재 페이지 URL을 가져옵니다.
    // const currentUrl = window.location.href;
    const url = sessionStorage.getItem("previousURL");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        // 현재 URL로 리디렉션 설정
        redirectTo:
          String(url) === "http://localhost:3000/boardWriter"
            ? "/"
            : String(url)
            ? String(url)
            : "/",
      },
    });
    if (error) {
      console.error("로그인 에러: ", error);
      return;
    }
  };

  // kakao
  const signInWithKakao = async () => {
    const url = sessionStorage.getItem("previousURL");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo:
          String(url) === "http://localhost:3000/boardWriter"
            ? "/"
            : String(url)
            ? String(url)
            : "/",
      },
    });
    if (error) {
      console.error("로그인 에러: ", error);
      return;
    }
  };

  // google
  const signInWithGoogle = async () => {
    const url = sessionStorage.getItem("previousURL");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          String(url) === "http://localhost:3000/boardWriter"
            ? "/"
            : String(url)
            ? String(url)
            : "/",
        queryParams: {
          // refresh Token 발급 - (카카오는 30일(자동), 깃허브(항상유지)) - 기능 끄기(online)
          access_type: "offline",
          // 로그인 시 계정 선택 - 자동 로그인이 아닌 계정 클릭 - 기능 켜기(consent)
          prompt: "none",
        },
      },
    });

    if (error) {
      console.error("로그인 에러: ", error);
      return;
    }
  };
  const color = "#e9e9e9";
  return (
    <S.Wrap>
      {/* <S.ModalContent onClick={(e) => e.stopPropagation()}> */}
      <S.LoginHeaderWrap>
        <Link href="/" passHref>
          <S.LogoWrap>
            <S.Logo src="/images/logo/login-bee-logo.svg" />
          </S.LogoWrap>
        </Link>
      </S.LoginHeaderWrap>
      <S.SectionWrap>
        <S.LoginTitle>로그인</S.LoginTitle>
        <S.Form>
          <S.LoginWrap>
            <S.InputWrap>
              <S.InputID type="text" placeholder=" " id="userID" />
              <S.Label htmlFor="userID">ID</S.Label>
            </S.InputWrap>
            <S.InputWrap>
              <S.InputID type="password" placeholder=" " id="userPW" />
              <S.Label htmlFor="userPW">PASSWORD</S.Label>
            </S.InputWrap>
          </S.LoginWrap>
          <S.LoginButtonWrap>
            <S.FormButton>로그인</S.FormButton>
            <S.FormButton>회원가입</S.FormButton>
          </S.LoginButtonWrap>
        </S.Form>
        <S.LineWrap>
          <S.Line />
          <S.Or>OR</S.Or>
          <S.Line />
        </S.LineWrap>
        <S.SocialLogin>
          <S.SocialLogoWrap_kakao onClick={signInWithKakao}>
            <img src={`/images/logo/social-logo/kakao-mark.png`} />
          </S.SocialLogoWrap_kakao>
          <S.SocialLogoWrap_google onClick={signInWithGoogle}>
            <img
              src={`/images/logo/social-logo/google-mark.png`}
              style={{ width: "35px" }}
            />
          </S.SocialLogoWrap_google>
          <S.SocialLogoWrap_github onClick={signInWithGithub}>
            <img src={`/images/logo/social-logo/github-mark.png`} />
          </S.SocialLogoWrap_github>
        </S.SocialLogin>
      </S.SectionWrap>
      {/* </S.ModalContent> */}
    </S.Wrap>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createSClient(context);
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    // 이미 로그인 상태라면, 홈 페이지나 대시보드로 리디렉션
    return {
      redirect: {
        destination: "/",
        permanent: false, // true로 설정하면 브라우저가 영구적으로 리디렉션
      },
    };
  }

  return {
    props: {}, // 로그인 상태가 아니면 로그인 페이지를 렌더링
  };
};
