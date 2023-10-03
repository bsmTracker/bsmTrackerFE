import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";
import { Header } from "@/Components/Header";
import { USER_CACH_KEYS } from "@/query/queryKey";
import { useRouter } from "next/router";

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
  const [render, setRender] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    axios.defaults.headers["access_token"] = accessToken;
    axios.defaults.headers.common["access_token"] = accessToken;
  }, []);

  useEffect(() => {
    (async () => {
      let canRender = false;
      if (router.pathname !== "/login") {
        console.log("Asdfghjkl");
        const user = await queryClient.fetchQuery(USER_CACH_KEYS.userKey);
        if (user) {
          canRender = true;
        }
        if (!user) {
          canRender = false;
          router.replace("/login");
        }
      } else {
        canRender = true;
      }
      setRender(canRender);
    })();
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        {render && <Component {...pageProps} />}
        <ToastContainer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
