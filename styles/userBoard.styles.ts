import styled from "@emotion/styled";

interface CommentOptProps {
  isSelected: boolean;
}

interface CommentIsAuthor {
  isAuthor: boolean;
}

export const Wrap = styled.section`
  max-width: 728px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #7b858e;
  padding: 1px 10px;
  cursor: pointer;

  :hover {
    background-color: #7b858e33;
  }
`;

export const Delete = styled.div`
  border: 1px solid #ff4f4f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 1px 10px;
  color: #ff4f4f;
  cursor: pointer;

  :hover {
    background-color: #ff4f4f33;
  }
`;

// 게시글 추천
export const LikeCountWrap = styled.div`
  border-top: 1px solid #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px;
`;

export const LikeCountBtn = styled.button`
  border: 1px solid #dddfe4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  padding: 5px 25px;
  max-width: 88px;
  width: 100%;
  gap: 5px;

  :hover {
    background-color: #f8f9fa;
  }
`;

export const UnLikeCountBtn = styled.button`
  border: 1px solid #dddfe4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  padding: 5px 25px;
  max-width: 88px;
  width: 100%;
  gap: 5px;

  :hover {
    background-color: #f8f9fa;
  }
`;

export const LikeCountInfo = styled.span`
  color: #7b858e;
  font-size: 14px;
`;

export const LikeImg = styled.img`
  width: 15px;
  height: 15px;
`;

// 게시글 댓글
export const CommentWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CommentHeader = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
`;

// 댓글 상단
export const CommentHeaderTitle = styled.div`
  font-size: 18px;
`;

export const CommentHeaderCount = styled.div`
  font-size: 14px;
  color: #7b858e;
  letter-spacing: 2px;
`;

export const Count = styled.span`
  color: #16ae81;
`;

// 댓글 입력
export const TextAreaWrap = styled.form`
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 7px; */
  padding: 20px;
  position: relative;
`;

export const TextArea = styled.textarea`
  border: 1px solid #dddfe4;
  width: 100%;
  height: 70px;
  outline: none;
  resize: none;
  font-size: 13px;
  padding: 5px;
`;

export const TextButtonWrap = styled.div`
  border: 1px solid #dddfe4;
  border-top: none;
  background-color: #fff;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const TextCount = styled.div`
  /* border: 1px solid red; */
  color: #7b858e;
`;

export const CommentBtn = styled.button`
  border: 1px solid #46cfa7;
  background-color: #46cfa7;
  color: #fff;
  font-weight: 600;
  padding: 4px 25px;

  :hover {
    background-color: #16ae81;
  }
`;

// 대댓글 입력
export const TextAreaWrapCom = styled.form`
  background-color: #f8f9fa;
  display: flex;
  padding: 20px 20px 20px 56px;
  gap: 10px;
`;

export const TextAreaInfoWrapCom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 7px; */
  /* padding: 20px; */
  position: relative;
  width: 100%;
`;

export const TextAreaCom = styled.textarea`
  border: 1px solid #dddfe4;
  width: 100%;
  height: 70px;
  outline: none;
  resize: none;
  font-size: 13px;
  padding: 5px;
`;

export const TextButtonWrapCom = styled.div`
  border: 1px solid #dddfe4;
  border-top: none;
  background-color: #fff;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const TextCountCom = styled.div`
  /* border: 1px solid red; */
  color: #7b858e;
`;

export const CommentBtnCom = styled.button`
  border: 1px solid #46cfa7;
  background-color: #46cfa7;
  color: #fff;
  font-weight: 600;
  padding: 4px 25px;

  :hover {
    background-color: #16ae81;
  }
`;

// 댓글 리스트
export const CommentListWrap = styled.div`
  /* border: 1px solid red; */
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  display: flex;
  flex-direction: column;
`;

export const CommentListOpt = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  border: 1px solid #dddfe4;
  padding: 0 20px;
`;

export const ListOptBtn = styled.button<CommentOptProps>`
  color: ${({ isSelected }) => (isSelected ? "#16ae81" : "#7b858e")};
  font-size: 14px;
  /* line-height: 1; */
  height: 36px;
  border: none;
  background: none;
  padding: 8px 15px;
  /* box-sizing: border-box; */

  border-bottom: ${({ isSelected }) =>
    isSelected ? "2px solid #16ae81" : "none"};
`;

export const Error = styled.label`
  color: red;
  font-size: 10px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 20px;
  min-width: 100px;
  width: 100%;
`;

// 댓글, 대댓글 목록 공간
export const CommentReplyWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

// 댓글 리스트
export const CommentListInfoWrap = styled.div<CommentIsAuthor>`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 12px 12px 12px 20px;
  gap: 15px;

  background-color: ${({ isAuthor }) => (isAuthor ? "#f8f9fa" : "#fff")};
`;

// 댓글 추천
export const CommentLikeWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 댓글 UP 버튼
export const CommentLikeUpButton = styled.div`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;
  background-image: url("/images/logo/comment/up-like.png");
  background-size: cover;
  cursor: pointer;

  &:hover {
    background-image: url("/images/logo/comment/up-like-red.png");
  }
`;

// 댓글 DOWN 버튼
export const CommentLikeDownButton = styled.div`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;
  background-image: url("/images/logo/comment/down-like.png");
  background-size: cover;
  cursor: pointer;

  &:hover {
    background-image: url("/images/logo/comment/down-like-blue.png");
  }
`;

export const CommentLikeCount = styled.span`
  font-size: 14px;
  color: #7b858e;
`;

export const CommentInfoWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentUserInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const User = styled.div<CommentIsAuthor>`
  /* border: 1px solid red; */
  font-size: 14px;
  color: ${({ isAuthor }) => (isAuthor ? "#46cfa7" : "#000")};
`;

export const CommentCreated = styled.div`
  /* border: 1px solid red; */
  color: #8b99a6;
  font-size: 14px;

  ::before {
    content: "|";
    color: #dddfe4;
    padding: 0 7px;
  }
`;

export const CommentBody = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

// 대댓글 답변 시 추가되는 태그
export const TagName = styled.span`
  border-radius: 5px;
  background-color: #d1f2e8;
  color: #16ae81;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0 3px;
`;

export const CommentOptWrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3px;
  gap: 10px;
`;

export const DeleteComment = styled.div`
  border: 1px solid #7e878b;
  background-color: #7e878b22;
  border-radius: 5px;
  padding: 3px 5px;
  font-size: 14px;
  padding: 1px 5px;
  color: #7e878b;
  cursor: pointer;

  :hover {
    color: red;
    border: 1px solid #f95b54;
    background-color: #f95b5433;
  }
`;

export const ReportBtn = styled.button`
  font-size: 14px;
  padding: 1px 0;
  color: #f95b54;
  line-height: 1;

  :hover {
    color: red;
  }
`;

export const ReplyBtn = styled.button`
  font-size: 14px;
  padding: 1px 0;
  color: #7e878b;
  line-height: 1;

  :hover {
    color: #33383c;
  }
`;

// 댓글 없는 경우
export const NoneComment = styled.div`
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

export const NoneCommentImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const NoneCommentText = styled.p`
  color: #7b858e;
  padding-top: 10px;
`;

// 대댓글 공간
export const ReplyWrap = styled.div`
  background-color: #f8f9fa;
`;

export const ReplyInfoWrap = styled.div`
  display: flex;
  padding: 12px 12px 12px 56px;
  gap: 10px;
`;

export const ReplyIcon = styled.span`
  color: #7b858e;
  line-height: 1;
`;
