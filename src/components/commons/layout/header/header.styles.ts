import styled from "@emotion/styled";

export const Wrap = styled.header`
  /* border: 1px solid red; */
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  /* background-color: #ffeebc; */
  /* background-color: #16ae81; */
  background-color: #46cfa7;
  z-index: 100;

  @media (max-width: 768px) {
    position: static;
  }
`;

export const HeaderWrap = styled.div`
  /* border: 1px solid blue; */
  width: 1200px;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

// Logo Wrap
export const LogoWrap = styled.div`
  /* border: 1px solid red; */
  width: 160px;
  /* margin-left: 2rem; */
  cursor: pointer;
`;

// Logo
export const Logo = styled.img`
  height: 3rem;
  display: block;

  @media (max-width: 769px) {
    display: none;
  }
`;

export const LogoWhite = styled.img`
  height: 3rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Navigation - Navigation 전체 공간
export const Nav = styled.nav`
  /* border: 4px solid red; */
  flex-grow: 1;
  display: flex;
  justify-content: center;
  /* position: relative; */

  @media (max-width: 768px) {
    justify-content: right;
  }
`;

// 햄버거 아이콘 공간
export const HamburgerNav = styled.div`
  /* border: 1px solid red; */
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    /* border: 1px solid blue; */
    display: flex;
    justify-content: left;
  }
`;

// 반응형 이미지 - 햄버거 아이콘
export const ResponsiveImage = styled.img`
  width: 24px;
  height: 24px;
`;

// Navigation - ul
export const UL = styled.ul<{ isOpen: boolean }>`
  /* border: 4px solid blue; */
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    position: fixed;
    background-color: #fff;
    top: 0;
    right: 0;
    z-index: 51;
    width: 100%;
    flex-direction: column;
    padding: 10px;
    height: ${({ isOpen }) => (isOpen ? "100%" : "0px")};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    transition: height 0.3s ease, opacity 0.3s ease;
    pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  }
`;

// Navigation - close 버튼
export const CloseImg = styled.img`
  /* border: 1px solid red; */
  width: 25px;
  height: 25px;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

// Navigation - li
export const LI = styled.li<{ currentPage: boolean }>`
  /* border: 1px solid blue; */
  border-radius: 5px;
  margin: 0 10px;
  background-color: ${({ currentPage }) =>
    currentPage ? "#00000033" : "transparent"};
  color: ${({ currentPage }) => (currentPage ? "#fff" : "#000000")};
  :hover {
    background-color: #00000033;
    color: #fff;
  }
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 5px 0;
    padding: 6px 3px;

    background-color: ${({ currentPage }) =>
      currentPage ? "#cecece4a" : "transparent"};
    color: #000000;

    :hover {
      background-color: #cecece4a;
      color: #000000;
    }
  }
`;

// Login - 따로 컴포트로 분리할지 생각중
export const LoginWrap = styled.div`
  /* border: 1px solid red; */
  border-radius: 5px;
  margin: 0 5px;

  :hover {
    background-color: #00000033;
    color: #fff;
  }
`;
