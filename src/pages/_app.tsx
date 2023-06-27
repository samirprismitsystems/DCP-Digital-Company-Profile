import "@/styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";
 import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="absolute z-[99999]">
        <ToastContainer />
      </div>
      <Component {...pageProps} />
    </>
  );
}
