import { store } from "@/services/store/store";
import "@/styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react"; // Import useEffect
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    require("react-toastify/dist/ReactToastify.css");
    setIsRender(true);
  }, []);

  return (
    isRender && (
      <Provider store={store}>
        <div className="absolute z-[99999]">
          <ToastContainer position="top-right" theme="light" autoClose={3000} pauseOnHover={true} />
        </div>
        <Component {...pageProps} />
      </Provider>
    )
  );
}
