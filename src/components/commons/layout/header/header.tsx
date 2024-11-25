import Link from "next/link";
import * as S from "./header.styles";
import { useRouter } from "next/router";
import Modal from "../login/login";
import { useEffect, useRef, useState } from "react";
import { User, UserMetadata } from "@supabase/supabase-js";
// import { GetServerSidePropsContext } from "next";
// import { createSClient } from "@/utils/supabase/server-props";
import { createClient } from "@/utils/supabase/component";
import HamburgerMenu from "../login/login";

const headerNav = [
  { name: "커뮤니티", path: "/" },
  { name: "Boards2", path: "/boards2" },
  { name: "Boards3", path: "/boards3" },
  { name: "Boards4", path: "/boards4" },
];

export default function Header(): JSX.Element {
  const router = useRouter();
  const supabase = createClient();
  const [userLogin, setUserLogin] = useState<User | null>(null);
  // const color = #fff1c6;

  console.log("userLogin: ", userLogin);

  // 로그인 상태 확인 / 유저 정보 저장
  const getUser = async () => {
    const session = await supabase.auth.getUser();
    const result = session.data.user;
    console.log("login Data: ", result);
    setUserLogin(result);

    // 로그인 상태에서만 user table에 저장 실행 - (table에 이미 해당 id가 있으면 유지)
    if (result) {
      const { data, error } = await supabase.from("users").upsert({
        name: result?.user_metadata.user_name ?? result?.user_metadata.name,
        email: result?.email,
        picture: result?.user_metadata.picture ?? null,
        created_at: result?.created_at,
        last_sign_in_at: result?.last_sign_in_at,
        updated_at: result?.updated_at,
      });

      if (error) {
        console.log("error: ", error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <S.Wrap>
      <S.HeaderWrap>
        <Link href="/" passHref>
          <S.LogoWrap>
            <S.Logo src="/images/logo/bee-logo.svg" />
            <S.LogoWhite src="/images/logo/bee-logo-white.svg" />
          </S.LogoWrap>
        </Link>
        <S.Nav>
          <S.HamburgerNav>
            <S.ResponsiveImage src="/images/logo/menu-logo/hamburger-menu-mark.svg" />
            {/* <S.ResponsiveImage src="/images/logo/menu-logo/user-mark.svg" /> */}
          </S.HamburgerNav>
          {headerNav.map((el) => (
            <S.UL key={el.name}>
              <S.LI
                currentPage={String(el.path) === String(router.pathname)}
                key={el.name}
              >
                <Link href={el.path} style={{ padding: "4px" }}>
                  {el.name}
                </Link>
              </S.LI>
            </S.UL>
          ))}
        </S.Nav>
        <HamburgerMenu userLogin={userLogin} setUserLogin={setUserLogin} />
        {/* {userLogin ? (
          <HamburgerMenu userLogin={userLogin} />
        ) : (
          <HamburgerMenu userLogin={userLogin} />
        )} */}
      </S.HeaderWrap>
    </S.Wrap>
  );
}
