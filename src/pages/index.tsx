import AuthGuards from "@/AuthGuards/AuthGuards";
import BottomToTop from "@/common/BottopToTop";
import SnowEffect from "@/common/SnowEffect";
import LandingPage from "@/components/LandingPage/LandingPage";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
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
