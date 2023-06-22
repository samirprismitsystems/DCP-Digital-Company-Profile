import MainScrollAnimation from "@/common/MainScrollAnimation";
import Link from "next/link";
import { useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";

export default function FreeTrail() {
  const result = useContext(LandingPageContextApi);
  const data = result.pageDetails;
  return (
    <div className="container md:my-48 mx-auto flex md:flex-row flex-col items-center md:justify-between lg:justify-around">
      <div className="container md:pr-8 md:pl-0  xs:w-full sm:w-[55%] align-middle mb-10 md:mb-0">
        <img
          className="max-w-full lg:w-[413px] h-auto"
          alt="hero"
          src="/assets/landing/mobile_overlay_sm.webp"
        />
      </div>
      <div className="sm:w-full md:w-1/2 flex flex-col xs:items-start md:items-start  md:text-left lg:items-left text-left lg:w-1/2">
        <h1 className="text-white title-font xs:mb-3 text-[3.0rem] font-semibold xs:text-left xs:w-full">
          {data.fttitle}
        </h1>
        <p className="text-white md:pr-16 text-[1.8rem] sm:mb-4 xs:mb-5">
          {data.ftdesc}
        </p>
        <Link
          href="#"
          className="mt-4 first-letter text-xl btnHoverEffect text-white  text-center px-12 py-6"
        >
          <button
            className="text-center rounded text-white text-[2rem]"
            style={{
              fontFamily: "GothamRoundedBook",
            }}
          >
            {data.ftbtnlink}
          </button>
        </Link>
      </div>
    </div>
  );
}
