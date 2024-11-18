import {
  fetchBoards,
  IBoards,
} from "@/src/components/commons/hooks/reactQuery/query/boards";
import { test } from "@/src/components/commons/hooks/reactQuery/query/test";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const tags = [
  { name: "전체" },
  { name: "자유" },
  { name: "유머" },
  { name: "질문" },
];

export default function TestBoards2Page({
  data: initialData,
}: {
  data: IBoards[];
}) {
  const router = useRouter();
  const [data, setData] = useState<IBoards[]>(initialData);
  const page = Number(router.query.page) || 0;

  const testQuery = async (tag: string) => {
    const query = await fetchBoards(page, tag);
    // setData(query);
  };

  console.log("data: ", data);
  console.log("tag: ", router.query.tag);

  return (
    <>
      {data.map((el) => (
        <div key={el.id} style={{ border: "1px solid red" }}>
          <div>{el.id}</div>
          <div>{el.title}</div>
          <div>{el.tag}</div>
        </div>
      ))}
      <div>Boards2 Page Test</div>
      {tags.map((el) => (
        <div>
          <div onClick={() => testQuery(el.name)}>{el.name}</div>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const page = Number(context.query.page) || 0;
  const tag = context.query.tag || "전체";
  // const tag = String(context.query.tag) === undefined ? "전체" : context.query.tag;

  const data = await fetchBoards(page, tag);

  return {
    props: {
      data,
    },
  };
};
