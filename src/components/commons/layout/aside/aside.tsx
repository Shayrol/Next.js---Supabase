import styled from "@emotion/styled";
import * as S from "./aside.styles";
import { useRouter } from "next/router";
import { fetchBoards } from "../../hooks/reactQuery/query/boards";
import Link from "next/link";

// 커뮤니티 사이트 탭
const tags = [
  { name: "전체" },
  { name: "자유" },
  { name: "유머" },
  { name: "질문" },
];

export default function TestAside() {
  const router = useRouter();

  const AsideQuery = async (tag: string) => {
    void router.push(
      {
        pathname: "/",
        query: { tag },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <S.TestAsideWrap>
      <S.AsideNav>
        <S.AsideUl>
          {tags.map((el) => (
            <S.AsideLi key={el.name}>
              <S.AsideBtn
                onClick={() => AsideQuery(el.name)}
                activeOption={(router.query.tag ?? "전체") === el.name}
              >
                {el.name}
              </S.AsideBtn>
            </S.AsideLi>
          ))}
        </S.AsideUl>
      </S.AsideNav>
    </S.TestAsideWrap>
  );
}

const TestAsideWrap = styled.aside`
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
  margin-top: 10px;
  padding: 5px;
  top: 48px;
  position: sticky;

  @media (max-width: 1230px) {
    display: none;
  }
`;
