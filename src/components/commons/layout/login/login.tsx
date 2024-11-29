import React, { Dispatch, SetStateAction, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import * as S from "./login.styles";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";

const LOGIN_USER_PAGE = ["/boardWriter"];

export default function HamburgerMenu({
  userLogin,
  setUserLogin,
}: {
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const userData = userLogin?.user_metadata;
  const supabase = createClient();
  const router = useRouter();
  const userPage = LOGIN_USER_PAGE.find((el) => el === router.asPath);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (userPage) {
      router.push(`/login`);
    }
  };

  // 로그아웃
  const signOutWith = async () => {
    // scope: "local"은 사용자가 특정 기기에서만 로그아웃함 (다른 기기에 로그인 유지됨)
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (!error) {
      setUserLogin(null);
      setIsOpen((prev) => !prev);
      getUser();
      sessionStorage.setItem("previousURL", window.location.href);
    }
  };

  const color = "#cecece4a";

  const previousURL = () => {
    sessionStorage.setItem("previousURL", window.location.href);
  };

  return (
    <S.Container>
      {userData ? (
        <>
          <S.UserName onClick={toggleMenu}>
            {userData?.name ?? userData?.user_name}
          </S.UserName>
          <S.ResponsiveImage
            onClick={toggleMenu}
            src="/images/logo/menu-logo/user-mark.svg"
          />
        </>
      ) : (
        <>
          <S.LoginBtn>
            <Link href={"/login"} onClick={previousURL}>
              로그인
            </Link>
          </S.LoginBtn>
          <S.ResponsiveImage
            onClick={toggleMenu}
            src="/images/logo/menu-logo/user-mark.svg"
          />
        </>
      )}
      <S.SideTabWrap isOpen={isOpen} userLogin={userLogin === null}>
        <S.SideTab isOpen={isOpen} userLogin={userLogin === null}>
          {/* <div onClick={toggleMenu}>X</div> */}
          <S.CloseImg src="/images/logo/close.png" onClick={toggleMenu} />
          <S.MenuList>
            <S.SideTabUserName>
              {userData ? userData.name : "로그인이 필요합니다."}
            </S.SideTabUserName>
            <li>
              {userData ? (
                <S.SideTabSignWrap onClick={signOutWith}>
                  <S.SideTabLogInOutFont>로그아웃</S.SideTabLogInOutFont>
                  <S.SideTabSignImg src="/images/logo/logout.png" />
                </S.SideTabSignWrap>
              ) : (
                <Link href={"/login"} onClick={previousURL}>
                  <S.SideTabSignWrap>
                    <S.SideTabLogInOutFont>로그인</S.SideTabLogInOutFont>
                    <S.SideTabSignImg src="/images/logo/login.png" />
                  </S.SideTabSignWrap>
                </Link>
              )}
            </li>
          </S.MenuList>
        </S.SideTab>
      </S.SideTabWrap>
    </S.Container>
  );
}
