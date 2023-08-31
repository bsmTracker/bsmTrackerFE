import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";

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

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    axios.defaults.headers["access_token"] = accessToken;
    axios.defaults.headers.common["access_token"] = accessToken;
  }, []);

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
