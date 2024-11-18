// import { useState } from "react";
// import * as S from "./userBoard.styles";
// import { createClient } from "@supabase/supabase-js";
// import { useQuery } from "@tanstack/react-query";

// const supabaseUrl = "https://jhkgsclggcdyvqleruhq.supabase.co";
// const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_KEY);
// const supabase = createClient(supabaseUrl, supabaseKey);

// interface IDataItem {
//   id: number;
//   title: string;
//   body: string;
//   created_at: string;
//   user_id: string;
// }
// export default function UserBoard() {
//   const [pageNumber, setPageNumber] = useState(0);
//   const [page, setPage] = useState<any[]>([]);
//   // const { data, refetch } = fetchBoards(pageNumber);

//   const refreshHistory = async (): Promise<IDataItem[]> => {
//     const start = pageNumber * 5;
//     const end = start + 4; // 한 번에 5개의 항목만 가져옴
//     const { data, error } = await supabase
//       .from("page")
//       .select("*")
//       .order("created_at", { ascending: true })
//       .range(start, end); // 데이터 범위를 설정
//     if (error) {
//       console.error("Error fetching page data: ", error);
//     } else {
//       // setPage(data || []);
//       console.log("dataDATA: ", data);
//       return data;
//     }
//   };

//   const { data, refetch } = useQuery<IDataItem[]>({
//     queryKey: ["boards", pageNumber],
//     queryFn: refreshHistory,
//     keepPreviousData: true,
//   });

//   console.log("data: ", data);

//   return (
//     <S.Wrap>
//       <S.UserBoardWrap>
//         {data?.map((el) => (
//           <div>
//             <div>{el.title}</div>
//           </div>
//         ))}
//       </S.UserBoardWrap>
//     </S.Wrap>
//   );
// }

// // useQuery 사용 미숙...
// // 캐싱 및 데이터 타입 문제가 있음

// //
