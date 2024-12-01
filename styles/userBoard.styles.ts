import styled from "@emotion/styled";

export const Wrap = styled.section`
  max-width: 728px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 10px;
  margin-top: 10px;
  box-sizing: border-box;

  @media (max-width: 1040px) {
    max-width: 100%;
  }
`;

export const BoardWrap = styled.main`
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoardInfoWrap = styled.div`
  /* border-bottom: 1px solid #a3a3a3; */
  width: 100%;
`;

export const BoardTitleWrap = styled.div`
  /* border: 1px solid blue; */
  border-bottom: 1px solid #f2f4f7;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 32px;
`;

export const TitleUserInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

// 게시글 등록자 정보
export const UserInfoWrap = styled.div`
  display: flex;
`;

export const Tag = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;
`;

export const Created = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;

  ::before {
    content: "|";
    color: #7b858e;
    margin: 0 8px;
  }
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;

  ::before {
    content: "|";
    color: #7b858e;
    margin: 0 8px;
  }
`;

// 게시글 정보 - 조회수, 댓글, 추천
export const MetaInfoWrap = styled.div`
  display: flex;
`;

export const ViewCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;
`;

export const CommentCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;

  ::before {
    content: "|";
    color: #7b858e;
    margin: 0 8px;
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7b858e;

  ::before {
    content: "|";
    color: #7b858e;
    margin: 0 8px;
  }
`;

// 게시글
export const BoardBody = styled.div`
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
`;

// 수정 / 삭제
export const EditDeleteWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Edit = styled.div`
  border: 1px solid #7b858e;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  color: #7b858e;
  padding: 2px 10px;
  cursor: pointer;

  :hover {
    background-color: #7b858e33;
  }
`;

export const Delete = styled.div`
  border: 1px solid #ff4f4f;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  color: #ff4f4f;
  padding: 2px 10px;
  cursor: pointer;

  :hover {
    background-color: #ff4f4f33;
  }
`;
