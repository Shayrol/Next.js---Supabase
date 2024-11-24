import Layout from "@/src/components/commons/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // loginOpen={pageProps.loginRequired || false}
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
