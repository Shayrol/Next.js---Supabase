// pages/index.tsx 사용중

import styled from "@emotion/styled";

// 게시글 선택 표시
interface AsideLiProps {
  activeOption: boolean;
}

// 검색 키워드 표시
interface ITextTokenProps {
  isMatched: boolean;
}

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

// 게시글 전체 (main 태그로 변경)
export const BoardsWrap = styled.main`
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

// 게시글 리스트 공간 (section -> ul로 변경, 게시글은 list로 표현)
export const BoardsList = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  list-style: none; /* 리스트 항목의 기본 스타일 제거 */
  padding: 0;
`;

// 게시글 - 검색된 게시글 data가 없을 시 화면
export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #8b99a6;
  padding: 30px;
`;

// 게시글 - 각각의 게시글
export const BoardItem = styled.li`
  border-bottom: 1px solid #ebeef1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  :hover {
    background-color: #ebeef1;
  }
`;

export const BoardInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  width: 100%;
  min-width: 0;
`;

export const LikeWrap = styled.div`
  /* background-color: #ebeef1; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  height: 48px;
  gap: 5px;
`;

export const LikeCount = styled.span`
  color: #7b858b;
  font-size: 12px;
`;

export const LikeCountImg = styled.img`
  width: 10px;
  height: 10px;
`;

export const TitleWrap = styled.span`
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 4px 0;
`;

// 제목
export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 360px;
  box-sizing: border-box; /* 여백 정리 */
`;

// 제목 - 키워드 표시
export const TextToken = styled.span`
  background-color: ${(props: ITextTokenProps) =>
    props.isMatched ? "yellow" : "none"};
`;

// 게시물 댓글 카운트 표시
export const CommentCount = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 1.2;
  margin-left: 7px;
  color: #16ae81;
  box-sizing: border-box; /* 여백 정리 */
`;

// 게시물 태그
export const Tag = styled.div`
  font-size: 14px;
  color: #8b99a6;
  white-space: nowrap;
`;

// 게시물 작성자 공간
export const UserWrap = styled.div`
  display: flex;
  min-width: 0;
`;

// 게시물 등록일
export const Created = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
  white-space: nowrap;
`;

// 게시물 작성자
export const User = styled.div`
  font-size: 14px;
  color: #8b99a6;
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 3px;
`;

// 게시물 미리보기 이미지
export const Img = styled.img`
  max-width: 93px;
  width: 100%;
  height: 60px;
`;

// 게시물 사이드 탭
// export const AsideWrap = styled.aside`
//   border: 1px solid #ebeef1;
//   box-shadow: 0px 0px 10px -5px #a3a3a3;
//   max-width: 300px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: start;
//   padding: 5px;
//   top: 48px;
//   position: sticky;

//   @media (max-width: 1044px) {
//     display: none;
//   }
// `;

// test right Aside
// export const TestAsideWrap = styled.aside`
//   /* border: 1px solid red; */
//   border: 1px solid #ebeef1;
//   box-shadow: 0px 0px 10px -5px #a3a3a3;
//   /* max-width: 200px; */
//   max-width: 300px;
//   width: 100%;
//   height: 600px;
//   display: flex;
//   justify-content: center;
//   align-items: start;
//   padding: 5px;
//   top: 48px;
//   position: sticky;

//   @media (max-width: 1370px) {
//     display: none;
//   }
// `;

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
  /* border: 1px solid green; */
  padding: 7px 12px;
  width: 100%;
  font-size: 14px;
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

// 옵션 및 검색 공간
export const FilterWrap = styled.div`
  border: 1px solid #ebeef1;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  position: sticky;
  top: 48px;
  background-color: #fff;
  width: 100%;
  /* min-height: 60px; */
  z-index: 50;

  @media (max-width: 768px) {
    top: 0;
  }
`;

// 게시물 태그 / 검색 / 작성 공간
export const Filter = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
`;

// 태그 옵션
export const TagSelectWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  max-width: 80px;
  min-width: 80px;
  width: 100%;
  position: relative;
  gap: 5px;
`;

export const MainTag = styled.button`
  border: 1px solid #7b858e;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  width: 100%;
  gap: 15px;
`;

export const TagSelect = styled.div`
  /* border: 1px solid red; */
`;

export const TagSelectImg = styled.img`
  width: 13px;
  height: 13px;
`;

export const TagOptionWrap = styled.ul`
  border: 1px solid #7b858e;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
  align-items: center;
  padding: 2px 5px;
  width: 100%;
  /* bottom: -100px; */
  bottom: -6.3rem;
  position: absolute;
  background-color: #fff;
  /* display: none; */
`;

export const TagOption = styled.li`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TagOptionBtn = styled.button`
  width: 100%;
  border-radius: 5px;

  :hover {
    background-color: #00000011;
  }
`;

// 게시물 작성 및 검색 공간
export const OptionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

// 게시물 작성 이미지
export const OptionImg = styled.img`
  /* border: 1px solid red; */
  min-width: 17px;
  width: 17px;
  height: 17px;
`;

// 검색 공간
export const SearchWrap = styled.div`
  /* border: 1px solid red; */
  margin-left: 20px;
  position: relative;
`;

// 검색창
export const SearchInput = styled.input`
  background-color: #ebeef1;
  padding: 5px 40px 5px 10px;
  color: #7b858e;
  max-width: 250px;
  width: 100%;
  /* margin-left: 20px; */
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
`;

// 검색 버튼
export const SearchButton = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

// 검색 이미지
export const SearchImg = styled.img``;

// 게시물 리스트 옵션 - 인기순, 최신순
export const BoardsOptWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 16px 5px 16px;
  gap: 10px;
`;

export const BoardsPopular = styled.span<{ boardsOpt: boolean }>`
  /* border: 1px solid blue; */
  font-size: 14px;
  color: ${({ boardsOpt }) => (boardsOpt ? "#16ae81" : "#7b85e")};
  cursor: pointer;

  :hover {
    color: #16ae81;
  }
`;

export const BoardsAll = styled.span<{ boardsOpt: boolean }>`
  /* border: 1px solid blue; */
  font-size: 14px;
  color: ${({ boardsOpt }) => (boardsOpt ? "#7b85e" : "#16ae81")};
  cursor: pointer;

  :hover {
    color: #16ae81;
  }
`;

// 16ae81
