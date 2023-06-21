import { ILandingPageDetails } from "@/types/commonTypes";
import Link from "next/link";
import { useContext } from "react";
import { LandingPageContextApi } from "./LandingPage";
import MobileScreenSection from "./MobileScreenSection";

export default function HeroSection() {
  const data = useContext(LandingPageContextApi);
  const pageDetails: ILandingPageDetails = data.pageDetails;

  return (
    <>
      <div
        className="relative xs:h-[991px] sm:h-[917px] lg:h-[1160px] md:h-[1102px] min-h-[100vh] overflow-hidden mt-[1.5rem]"
        id="hero"
      >
        <svg
          id="tringle-shape"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 2134 900"
          className="xs:h-[1027px] sm:h-[1000px] absolute align-middle w-[2134px] lg:h-[1030px] md:h-[1002px] -top-[18rem] left-[50%] -translate-x-[50%] z-[-100]"
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
        <div className="absolute left-0 right-0 bottom-0  m-auto container">
          <div className="relative">
            <h1
              className="text-secondary-greyDark text-center xs:text-[3.6rem] md:text-[4.6rem] font-normal"
              style={{
                lineHeight: "1.5",
              }}
            >
              {pageDetails.hometitle}
              <br />
              <strong className="text-secondary-greyDark xs:text-[3.6rem] md:text-[4.6rem] text-center pb-5 font-bold">
                {pageDetails.homesubtitle}
              </strong>
            </h1>
          </div>
          <p
            className="xs:px-[14px] text-center text-[1.8rem] relative top-3 text-secondary-greyDark font-normal"
            style={{
              lineHeight: "1.5",
              fontFamily: "GothamRoundedBook",
            }}
            dangerouslySetInnerHTML={{ __html: pageDetails.homedesc }}
          />
          <MobileScreenSection />
          <Link
            href={pageDetails.homebtnlink}
            className="btnHoverEffect  block m-auto w-96 text-white  text-center  overflow-hidden mt-4"
          >
            <button className="py-6 text-center text-3xl rounded text-white font-semibold">
              {pageDetails.homebtntitle}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
