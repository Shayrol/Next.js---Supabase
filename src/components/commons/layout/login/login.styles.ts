import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
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

//
// --- SideTab ↓ ---

export const SideTabWrap = styled.div<{ isOpen: boolean; userLogin: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  background-color: #00000066;
  width: 100%;
  height: 100dvh;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;

  @media (min-width: 768px) {
    display: ${({ userLogin }) => (userLogin ? "none" : "block")};
  }
`;

export const SideTab = styled.div<{ isOpen: boolean; userLogin: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ isOpen, userLogin }) => (isOpen && !userLogin ? "350px" : "0px")};
  padding: 30px;
  height: 100dvh;
  background-color: #fff;
  color: #000;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 999;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "100%" : "0")};
    padding: ${({ isOpen }) => (isOpen ? "30px" : "0")};
    transition: width 0.3s ease;
    height: 100dvh;
    /* display: ${({ userLogin }) => (!userLogin ? "none" : "block")}; */
  }
`;

// 사이드 탭 - 닫기
export const CloseImg = styled.img`
  /* border: 1px solid red; */
  width: 25px;
  height: 25px;
  padding: 5px;
  cursor: pointer;
`;

// 사이드 탭 - 메뉴
export const MenuList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
`;

// 사이드 탭 - 유저 네임
export const SideTabUserName = styled.li`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  height: 63px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
`;

// 사이드 탭 - 로그아웃 / 로그인 공간
export const SideTabSignWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    background-color: #cecece4a;
  }
`;

// 사이드 탭 - 로그아웃 버튼
export const SideTabLogInOutFont = styled.div`
  font-weight: 600;
  white-space: nowrap;
  margin-right: 30px;
`;

// 사이드 탭 - 로그아웃 / 로그인 이미지
export const SideTabSignImg = styled.img`
  width: 21px;
  height: 21px;
`;

//
// --- Web ↓ ---

// 로그인 버튼 - 로그아웃 상태
export const LoginBtn = styled.div`
  display: block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  :hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 웹뷰 유저 정보 - 이름
export const UserName = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  :hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 반응형 유저 정보 - 이미지
export const ResponsiveImage = styled.img`
  display: none;
  border-radius: 5px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  :hover {
    background-color: #00000033;
    color: #fff;
  }

  @media (max-width: 768px) {
    /* border: 1px solid red; */
    display: block;
    margin-left: 10px;
  }
`;
