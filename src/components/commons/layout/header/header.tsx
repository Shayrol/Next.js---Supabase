import Link from "next/link";
import * as S from "./header.styles";
import { useRouter } from "next/router";

const headerNav = [
  { name: "Boards", path: "/" },
  { name: "Boards2", path: "/boards2" },
  { name: "Boards3", path: "/boards3" },
  { name: "Boards4", path: "/boards4" },
];

export default function Header(): JSX.Element {
  const router = useRouter();
  // const color = #fff1c6;

  return (
    <S.Wrap>
      <S.HeaderWrap>
        <Link href="/" passHref>
          <S.LogoWrap>
            <S.Logo src="/images/logo/bee-logo.svg" />
          </S.LogoWrap>
        </Link>
        <S.Nav>
          {headerNav.map((el) => (
            <S.UL key={el.name}>
              <S.LI
                currentPage={String(el.path) === String(router.asPath)}
                key={el.name}
              >
                <Link href={el.path} style={{ padding: "4px" }}>
                  {el.name}
                </Link>
              </S.LI>
            </S.UL>
          ))}
        </S.Nav>
        <S.Login>Login</S.Login>
      </S.HeaderWrap>
    </S.Wrap>
  );
}
