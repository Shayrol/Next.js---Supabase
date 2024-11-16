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
  background-color: #ffeebc;
  z-index: 100;
`;

export const HeaderWrap = styled.div`
  border: 1px solid blue;
  width: 1200px;
  height: 3rem;
  display: flex;
  align-items: center;
`;

// Logo Wrap
export const LogoWrap = styled.div`
  /* border: 1px solid red; */
  width: 160px;
  margin-left: 2rem;
  cursor: pointer;
`;

// Logo
export const Logo = styled.img`
  height: 3rem;
`;

// Navigation
export const Nav = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

// Navigation - ul
export const UL = styled.ul`
  /* border: 1px solid red; */
  display: flex;
`;

// Navigation - li
export const LI = styled.li<{ currentPage: boolean }>`
  /* border: 1px solid blue; */
  border-radius: 5px;
  margin: 0 10px;
  background-color: ${({ currentPage }) =>
    currentPage ? "#00000033" : "transparent"};
  :hover {
    background-color: #00000033;
  }
`;

// Login - 따로 컴포트로 분리할지 생각중
export const Login = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  color: #666;
  margin-right: 2rem;
`;
