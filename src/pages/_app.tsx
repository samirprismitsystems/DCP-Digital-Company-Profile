import { store } from "@/services/store/store";
import "@/styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    require("react-toastify/dist/ReactToastify.css");
    setIsRender(true);
    document.body.className = 'digimen'
  }, []);

  return (
    isRender && (
      <Provider store={store}>
        <div className="absolute z-[12500]">
          <ToastContainer
            position="top-right"
            theme="light"
            autoClose={3000}
            pauseOnHover={true}
            className="absolute z-[999999]"
          />
        </div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  );
}
