import { ILandingPageDetails } from "@/types/landingPageType";
import Link from "next/link";
import { useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";
import MobileScreenSection from "./MobileScreenSection";

export default function HeroSection() {
  const data = useContext(LandingPageContextApi);
  const pageDetails: ILandingPageDetails = data.pageDetails;

  return (
    <>
      <div
        className="relative min-h-[70vh] overflow-hidden mt-[1.5rem]"
        id="heroSection"
      >
        <svg

          id="tringle-shape"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          height={900}
          width={2134}
          viewBox="0 0 2134 900"
          className="absolute top-[-10rem] left-[50%] z-[-1] transform translate-x-[-50%]"
        >
          <path
            fillRule="evenodd"
            stroke="rgb(14, 204, 0)"
            strokeWidth="0px"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="rgb(216, 227, 231)"
            d="M1153.475,795.576 C1098.805,821.791 1035.195,821.791 980.525,795.576 L114.568,380.339 C-77.351,288.312 -11.800,-0.000 201.042,-0.000 L1932.958,-0.000 C2145.800,-0.000 2211.351,288.312 2019.432,380.339 L1153.475,795.576 Z"
          />
        </svg>
        <div className="container">
          <div className="relative top-[13rem] h-full min-h-[1041px]">
            <div className="relative">
              <h1
                className="text-secondary-greyDark text-center xs:text-[3.6rem] md:text-[4.6rem] font-normal"
                style={{
                  lineHeight: "1.5",
                }}
              >
                {pageDetails.hometitle || "N/A"}
                <br />
                <strong className="text-secondary-greyDark xs:text-[3.6rem] md:text-[4.6rem] text-center pb-5 font-bold">
                  {pageDetails.homesubtitle || "N/A"}
                </strong>
              </h1>
            </div>
            <p
              className="xs:px-[14px] text-center text-[1.8rem] relative top-3 text-secondary-greyDark font-normal mb-[2rem]"
              style={{
                lineHeight: "1.5",
                fontFamily: "GothamRoundedBook",
              }}
              dangerouslySetInnerHTML={{ __html: pageDetails.homedesc || "N/A" }}
            />
            <MobileScreenSection homeImage={pageDetails.homeimg} />
            <Link
              href={pageDetails.homebtnlink || "N/A"}
              target="_blank"
              className="btnHoverEffect  block m-auto w-96 text-white  text-center  overflow-hidden mt-4"
            >
              <button className="py-6 text-center text-3xl rounded text-white font-medium">
                {pageDetails.homebtntitle || "N/A"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
