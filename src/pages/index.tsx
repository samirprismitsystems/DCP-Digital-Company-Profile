import BottomToTop from "@/common/BottopToTop";
import SnowEffect from "@/common/SnowEffect";
import LandingPage from "@/components/LandingPage/LandingPage";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          href="/revenue.png"
          sizes="any"
        />
      </Head>
      <div className="absolute -z-[12000]">
        <SnowEffect />
      </div>
      <div className="absolute z-[12000]">
        <BottomToTop />
      </div>
      <LandingPage />
    </React.Fragment>
  );
}
