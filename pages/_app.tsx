import Layout from "@/src/components/commons/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: 5 * 60 * 1000,
  //         },
  //       },
  //     })
  // );

  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
    // <SWRConfig value={option}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </SWRConfig>
    // </QueryClientProvider>
  );
}
