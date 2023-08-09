import { store } from "@/services/store/store";
import "@/styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";
import { useEffect } from "react"; // Import useEffect
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("react-toastify/dist/ReactToastify.css");
  }, []);

  return (
    <Provider store={store}>
      <div className="absolute z-[99999]">
        <ToastContainer />
      </div>
      <Component {...pageProps} />
    </Provider>
  );
}
