import React, { useState } from "react";
import styled from "@emotion/styled";
import { User, UserMetadata } from "@supabase/supabase-js";

const Container = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

const SideTab = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ isOpen }) => (isOpen ? "350px" : "0")};
  height: 100dvh;
  padding: 10px 20px;
  background-color: #141414c3;
  color: #fff;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 999;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "100%" : "0")};
    height: 100dvh;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;

  & li {
    margin: 15px 0;
  }

  & a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// 웹뷰 유저 정보 - 이름
const UserName = styled.span`
  display: block;
  border-radius: 5px;
  padding: 0 3px;
  cursor: pointer;

  :hover {
    background-color: #00000033;
    color: #fff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 반응형 유저 정보 - 이미지
const ResponsiveImage = styled.img`
  display: none;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    /* border: 1px solid red; */
    display: block;
    margin-left: 10px;
  }
`;

export default function HamburgerMenu({
  userLogin,
}: {
  userLogin: User | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const userData = userLogin?.user_metadata;
  return (
    <Container>
      <UserName onClick={toggleMenu}>
        {userData?.name ?? userData?.user_name}
      </UserName>
      <ResponsiveImage
        onClick={toggleMenu}
        src="/images/logo/menu-logo/user-mark.svg"
      />
      <SideTab isOpen={isOpen}>
        <div onClick={toggleMenu}>X</div>
        <MenuList>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </MenuList>
      </SideTab>
    </Container>
  );
}
