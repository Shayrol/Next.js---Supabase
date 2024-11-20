import Link from "next/link";
import * as S from "./header.styles";
import { useRouter } from "next/router";
import Modal from "../login/login";
import { useEffect, useState } from "react";
import { supabase } from "../../Supabase";
import { UserMetadata } from "@supabase/supabase-js";

const headerNav = [
  { name: "커뮤니티", path: "/" },
  { name: "Boards2", path: "/boards2" },
  { name: "Boards3", path: "/boards3" },
  { name: "Boards4", path: "/boards4" },
];

export default function Header(): JSX.Element {
  const router = useRouter();
  // const color = #fff1c6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLogin, setUserLogin] = useState<UserMetadata | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로그인 상태 확인 / 유저 정보 저장
  const getUser = async () => {
    const session = await supabase.auth.getUser();
    const result = session.data.user;
    console.log("session-(header): ", session.data.user?.user_metadata);
    console.log("session-(header): ", session.data.user);
    setUserLogin(result);

    // 로그인 상태에서만 user table에 저장 실행 - (table에 이미 해당 id가 있으면 유지)
    // if (result) {
    //   const { data, error } = await supabase.from("users").upsert({
    //     name: result?.user_metadata.user_name,
    //     email: result?.email,
    //     picture: null,
    //     created_at: result?.created_at,
    //     last_sign_in_at: result?.last_sign_in_at,
    //     updated_at: result?.updated_at,
    //   });

    //   // console.log("login_user_data: ", data);
    //   if (error) {
    //     console.log("error: ", error);
    //   }
    // }
  };

  // 로그아웃
  const signOutWithGithub = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("error: ", error);

    if (!error) {
      setUserLogin(null);
    }
  };

  useEffect(() => {
    getUser();
    // 로그인이 안됨...
    // // 소셜 로그인 후 #(헤쉬) 생성으로 삭제 처리함
    // if (window.location.hash) {
    //   // 페이지를 새로고침하지 않고 해시를 제거
    //   window.history.pushState(
    //     {},
    //     document.title,
    //     window.location.pathname + window.location.search
    //   );
    // }
  }, []);

  return (
    <S.Wrap>
      <S.HeaderWrap>
        <Link href="/" passHref>
          <S.LogoWrap>
            <S.Logo src="/images/logo/bee-logo.svg" />
          </S.LogoWrap>
        </Link>
        <S.Nav>
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
        {userLogin ? (
          <div onClick={signOutWithGithub}>logout</div>
        ) : (
          <S.Login onClick={() => openModal()}>Login</S.Login>
        )}
      </S.HeaderWrap>

      {isModalOpen && <Modal onClose={closeModal} />}
    </S.Wrap>
  );
}
