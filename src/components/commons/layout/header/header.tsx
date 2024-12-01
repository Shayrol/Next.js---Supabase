import Link from "next/link";
import * as S from "./header.styles";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/component";
import HamburgerMenu from "../login/login";

const headerNav = [
  { name: "커뮤니티", path: "/" },
  { name: "Boards2", path: "/boards2" },
  { name: "Boards3", path: "/boards3" },
  { name: "Boards4", path: "/boards4" },
];

interface IHeaderProps {
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
}

export default function Header({
  userLogin,
  setUserLogin,
}: IHeaderProps): JSX.Element {
  const router = useRouter();
  const supabase = createClient();
  // const [userLogin, setUserLogin] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = String(router.pathname);
  const currentPath =
    pathname === "/boardWriter" || router.query.boardId ? "/" : pathname;

  // console.log("login Data: ", userLogin);
  console.log("router.pathname: ", router.pathname);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 로그인 상태 확인 / 유저 정보 저장
  const getUser = async () => {
    const session = await supabase.auth.getUser();
    const result = session.data.user;
    // console.log("login Data: ", result);
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
          {/* 모바일 환경 메뉴 */}
          <S.HamburgerNav onClick={toggleMenu}>
            <S.ResponsiveImage src="/images/logo/menu-logo/hamburger-menu-mark.svg" />
          </S.HamburgerNav>
          {/* 웹 환경 메뉴 */}
          <S.UL isOpen={isOpen}>
            <S.CloseImg src="/images/logo/close.png" onClick={toggleMenu} />
            {headerNav.map((el) => (
              <S.LI currentPage={String(el.path) === currentPath} key={el.name}>
                <Link href={el.path} style={{ padding: "4px" }}>
                  {el.name}
                </Link>
              </S.LI>
            ))}
          </S.UL>
        </S.Nav>
        <HamburgerMenu userLogin={userLogin} setUserLogin={setUserLogin} />
      </S.HeaderWrap>
    </S.Wrap>
  );
}
