import { useRouter } from "next/router";
import Header from "./header/header";

interface ILayoutProps {
  children: JSX.Element;
}

const HEADER_HIDDEN = ["/login"];

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const header = HEADER_HIDDEN.includes(router.asPath);

  return (
    <>
      {!header && <Header />}
      <main>{props.children}</main>
    </>
  );
}
