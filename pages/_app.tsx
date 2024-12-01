import Layout from "@/src/components/commons/layout/layout";
import "@/styles/globals.css";
import { User } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [userLogin, setUserLogin] = useState<User | null>(null);

  return (
    <Layout userLogin={userLogin} setUserLogin={setUserLogin}>
      <Component
        userLogin={userLogin}
        setUserLogin={setUserLogin}
        {...pageProps}
      />
    </Layout>
  );
}
