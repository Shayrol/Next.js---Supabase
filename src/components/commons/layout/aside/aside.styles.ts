import styled from "@emotion/styled";

// 게시글 선택 표시
interface AsideLiProps {
  activeOption: boolean;
}

// test right Aside
export const TestAsideWrap = styled.aside`
  /* border: 1px solid red; */
  border: 1px solid #ebeef1;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  /* max-width: 200px; */
  max-width: 300px;
  width: 100%;
  /* height: 600px; */
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5px;
  margin-top: 10px;
  top: 48px;
  position: sticky;

  @media (max-width: 1040px) {
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
