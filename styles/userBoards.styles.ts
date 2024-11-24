// pages/index.tsx 사용중

import styled from "@emotion/styled";

// 게시글 선택 표시
interface AsideLiProps {
  activeOption: boolean;
}

export const Wrap = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin-top: 100px;
  gap: 10px;
  box-sizing: border-box;
`;

// 게시글 전체 (main 태그로 변경)
export const BoardsWrap = styled.main`
  /* border: 1px solid green; */
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  /* padding: 0 60px; */
`;

// 게시글 리스트 (section -> ul로 변경, 게시글은 list로 표현)
export const BoardsList = styled.ul`
  border: 1px solid #ebeef1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  list-style: none; /* 리스트 항목의 기본 스타일 제거 */
  padding: 0;
`;

// 각 게시글 아이템 (li로 변경)
export const BoardItem = styled.li`
  border-bottom: 1px solid #ebeef1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;

  :hover {
    background-color: #ebeef1;
  }
`;

export const BoardInfoWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  width: 100%;
  min-width: 0;
`;

export const Id = styled.div`
  background-color: #ebeef1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  height: 48px;
`;

export const TitleWrap = styled.div`
  /* border: 1px solid blue; */
  width: 100%;
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h2`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin: 0;
`;

export const Tag = styled.div`
  font-size: 14px;
  color: #8b99a6;
  white-space: nowrap;
`;

export const UserWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  min-width: 0;
`;

export const Created = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
  white-space: nowrap;
`;

export const User = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 3px;
`;

export const Img = styled.img`
  width: 93px;
  height: 60px;
`;

// 게시글 사이드 탭
export const AsideWrap = styled.aside`
  /* border: 1px solid red; */
  border: 1px solid #ebeef1;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  max-width: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5px;
  top: 60px;
  position: sticky;

  @media (max-width: 1044px) {
    display: none;
  }
`;

export const AsideNav = styled.nav`
  width: 100%;
`;

export const AsideUl = styled.ul`
  /* border: 1px solid blue; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AsideLi = styled.li`
  /* border: 1px solid green; */
  /* padding: 1px 5px; */
  width: 100%;
  :nth-child(2)::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #ebeef1;
    margin: 5px 0;
  }
`;

export const AsideBtn = styled.button<AsideLiProps>`
  padding: 4px 12px;
  width: 100%;
  font-size: 12px;
  border-radius: 5px;

  display: flex;
  justify-content: start;
  align-items: center;

  background-color: ${({ activeOption }) =>
    activeOption ? "#ebeef1" : "transparent"};
  color: ${({ activeOption }) => (activeOption ? "#16ae81" : "#000000")};
  :hover {
    background-color: #ebeef1;
    color: #16ae81;
  }
`;
