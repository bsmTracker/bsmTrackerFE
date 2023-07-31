import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  // const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <Router history={history}> */}
        <Component {...pageProps} />
        <ToastContainer />
        {/* </Router> */}
      </RecoilRoot>
    </QueryClientProvider>
  );
}
