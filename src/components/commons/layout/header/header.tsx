import Link from "next/link";
import * as S from "./header.styles";
import { useRouter } from "next/router";
import Modal from "../login/login";
import { useState } from "react";

const headerNav = [
  { name: "Boards", path: "/" },
  { name: "Boards2", path: "/boards2" },
  { name: "Boards3", path: "/boards3" },
  { name: "Boards4", path: "/boards4" },
];

export default function Header(): JSX.Element {
  const router = useRouter();
  // const color = #fff1c6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    color: "",
  });

  const openModal = (title: string, description: string, color: string) => {
    setModalContent({ title, description, color });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <S.Login onClick={() => openModal("로그인", "로긍닌하기", "#000")}>
          Login
        </S.Login>
      </S.HeaderWrap>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title={modalContent.title}
          description={modalContent.description}
          color={modalContent.color}
        />
      )}
    </S.Wrap>
  );
}
