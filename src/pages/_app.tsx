import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Layout } from "../components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </Layout>
  );
};

export default trpc.withTRPC(MyApp);
