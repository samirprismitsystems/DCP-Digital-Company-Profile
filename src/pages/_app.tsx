import BottomToTop from "@/common/BottopToTop";
import SnowEffect from "@/common/SnowEffect";
import "@/styles/globals.css";
import "animate.css/animate.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="absolute -z-[12000]">
        <SnowEffect />
      </div>
      <div className="absolute z-[12000]">
        <BottomToTop />
      </div>
      <Component {...pageProps} />
    </>
  );
}
