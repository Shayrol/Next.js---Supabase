// pages/index.tsx 사용중

import styled from "@emotion/styled";

export const Wrap = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border: 4px solid red;
`;

// 게시글 전체 (main 태그로 변경)
export const BoardsWrap = styled.main`
  border: 4px solid green;
  max-width: 1200px; /* 최대 너비 설정 */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
`;

// 게시글 리스트 (section -> ul로 변경, 게시글은 list로 표현)
export const BoardsList = styled.ul`
  border: 4px solid blue;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 12px;
`;

export const Id = styled.div`
  background-color: #ebeef1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

export const TitleWrap = styled.div``;

export const Title = styled.h2`
  font-size: 14px;
`;

export const Tag = styled.div`
  font-size: 14px;
  color: #8b99a6;
`;

export const UserWrap = styled.div`
  display: flex;
`;

export const Created = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
`;

export const User = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
`;

export const Img = styled.img`
  width: 93px;
  height: 60px;
`;
