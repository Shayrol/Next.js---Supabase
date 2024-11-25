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

// Navigation
export const Nav = styled.nav`
  /* border: 1px solid red; */
  flex-grow: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: right;
  }
`;

export const HamburgerNav = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    /* border: 1px solid blue; */
    display: flex;
    justify-content: left;
  }
`;

// 반응형 이미지
export const ResponsiveImage = styled.img`
  width: 24px;
  height: 24px;
`;

// Navigation - ul
export const UL = styled.ul`
  /* border: 1px solid red; */
  display: flex;

  @media (max-width: 768px) {
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
