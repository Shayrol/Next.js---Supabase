import Header from "./header/header";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
