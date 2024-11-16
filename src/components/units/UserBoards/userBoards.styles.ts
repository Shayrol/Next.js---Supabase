import styled from "@emotion/styled";

export const Wrap = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

// 게시글 전체
export const BoardsWrap = styled.main`
  /* border: 1px solid green; */
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
`;

// 게시글 구분
export const BoardsTable = styled.table`
  /* border: 1px solid red; */
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const TBody = styled.tbody`
  border: 1px solid #ebeef1;
  border-bottom: none;
  width: 100%;
`;

export const TBodyTR = styled.tr`
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

export const BoardInfoWrap = styled.section`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 12px;
`;

export const Id = styled.td`
  /* border: 1px solid red; */
  background-color: #ebeef1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  /* margin: 0 12px; */
`;
export const TitleWrap = styled.td`
  /* border: 1px solid red; */
`;
export const Title = styled.h2`
  font-size: 14px;
`;

export const Body = styled.td`
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: nowrap; /* 텍스트를 한 줄로 처리 */
  text-overflow: ellipsis;
`;

export const UserWrap = styled.section`
  display: flex;
`;

export const Created = styled.td`
  /* border: 1px solid red; */
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
`;

export const User = styled.td`
  /* border: 1px solid red; */
  overflow: hidden; /* 넘치는 내용 숨김 */
  white-space: nowrap; /* 텍스트를 한 줄로 처리 */
  text-overflow: ellipsis;
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
`;

export const Img = styled.img`
  /* border: 1px solid red; */
  width: 93px;
  height: 60px;
`;
