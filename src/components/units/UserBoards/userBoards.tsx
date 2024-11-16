import { useState } from "react";
import { useBoards } from "../../commons/hooks/reactQuery/query/boards";
import * as S from "./userBoards.styles";
import { getRelativeTime } from "@/src/commons/date/getRelativeTime";

export default function UserBoards() {
  const [page, setPage] = useState<number>(0);
  const { data, refetch } = useBoards(page);
  console.log("data: ", data);
  console.log("page: ", page);

  return (
    <S.Wrap>
      <S.BoardsWrap>
        <S.BoardsTable>
          <S.TBody>
            {data?.map((el) => (
              <S.TBodyTR key={el.id} onClick={() => console.log("실행")}>
                <S.Id>{el.id}</S.Id> {/* 추후에 추천수 표기 예정 */}
                <S.BoardInfoWrap>
                  <S.TitleWrap>
                    <S.Title>{el.title}</S.Title>
                  </S.TitleWrap>
                  <S.UserWrap>
                    <div style={{ fontSize: "14px", color: "#8b99a6" }}>
                      {/* 커뮤니티에 자유, 유머, 질문, 영상 등 분류 예정 */}
                      Tag
                    </div>
                    <S.Created>{getRelativeTime(el.created_at)}</S.Created>
                    <S.User>{el.user_id}</S.User>
                  </S.UserWrap>
                </S.BoardInfoWrap>
                {/* <S.Img>이미지</S.Img> */}
                <S.Img src="/images/placeholders/placeholder-image.svg" />
              </S.TBodyTR>
            ))}
          </S.TBody>
        </S.BoardsTable>

        <nav>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            이전
          </button>
          <button onClick={() => setPage(page + 1)}>다음</button>
        </nav>
      </S.BoardsWrap>
    </S.Wrap>
  );
}
