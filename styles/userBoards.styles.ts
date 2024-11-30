// pages/index.tsx 사용중

import styled from "@emotion/styled";

// 게시글 선택 표시
interface AsideLiProps {
  activeOption: boolean;
}

export const Wrap = styled.section`
  border: 1px solid red;
  max-width: 728px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 10px;
  margin-top: 10px;
  /* padding: 0 20px; */
  box-sizing: border-box;

  @media (max-width: 1040px) {
    max-width: 100%;
  }
`;

// 게시글 전체 (main 태그로 변경)
export const BoardsWrap = styled.main`
  border: 1px solid green;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  /* max-width: 900px; */
  /* max-width: 728px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;

  /* @media (max-width: 1044px) {
    max-width: 100%;
  } */
`;

// 게시글 리스트 (section -> ul로 변경, 게시글은 list로 표현)
export const BoardsList = styled.ul`
  /* border: 1px solid #ebeef1; */
  /* max-width: 900px; */
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
  cursor: pointer;

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
  /* max-width: 200px; */
  max-width: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5px;
  top: 48px;
  position: sticky;

  @media (max-width: 1044px) {
    display: none;
  }
`;

// test right Aside
export const TestAsideWrap = styled.aside`
  /* border: 1px solid red; */
  border: 1px solid #ebeef1;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  /* max-width: 200px; */
  max-width: 300px;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5px;
  top: 48px;
  position: sticky;

  @media (max-width: 1370px) {
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

// export const TagSelect = styled.select`
//   border: 1px solid red;
//   border-radius: 5px;
//   padding: 0 10px;
// `;

// export const TagOption = styled.option`
//   border-radius: 5px;
// `;

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

// 검색 이미지
export const SearchImg = styled.img`
  /* border: 1px solid red; */
  width: 22px;
  height: 22px;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
`;
