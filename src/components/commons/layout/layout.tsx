import { useRouter } from "next/router";
import Header from "./header/header";
import TestAside from "./aside/aside";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";

interface ILayoutProps {
  children: JSX.Element;
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
}

const HEADER_HIDDEN = ["/login"];

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const header = HEADER_HIDDEN.includes(router.asPath);

  return (
    <>
      {!header && (
        <Header userLogin={props.userLogin} setUserLogin={props.setUserLogin} />
      )}
      <Main>
        {!header && <TestAside />}
        {props.children}
        {!header && <Test>test</Test>}
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  /* height: calc(100vh - 48px); */
  gap: 10px;
`;

const Test = styled.div`
  border: 1px solid #ebeef1;
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  max-width: 300px;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5px;
  margin-top: 10px;
  top: 48px;
  position: sticky;

  @media (max-width: 1370px) {
    display: none;
  }
`;
