import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const HandleRouteChange = (url: string, { shallow }: any) => {
    NProgress.start();
  };

  const HandleRouterChangeComplete = () => {
    NProgress.done();
    console.log("Complete");
  };

  const HandleRouteChangeError = () => {
    NProgress.done();
    console.log("Error");
  };

  useEffect(() => {
    router.events.on("routeChangeStart", HandleRouteChange);
    router.events.on("routeChangeComplete", HandleRouterChangeComplete);
    router.events.on("routeChangeError", HandleRouteChangeError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", HandleRouteChange);
      router.events.off("routeChangeComplete", HandleRouterChangeComplete);
      router.events.off("routeChangeError", HandleRouteChangeError);
    };
  }, [router.events]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
        dedupingInterval: 2000,
      }}
    >
      <NextNProgress color="blue" />
      <Component {...pageProps} />;
    </SWRConfig>
  );
}
