import MainScrollAnimation from "@/common/MainScrollAnimation";
import { ILandingPageDetails } from "@/types/landingPageType";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";
import FeatureCards from "./FeatureCards";

interface IFeature {
  featurelogo: string;
  featuretext: ReactNode;
}

export default function DigitalFeatures() {
  const data = useContext(LandingPageContextApi);
  const pageDetails: ILandingPageDetails = data.pageDetails;
  const lstFeatures: IFeature[] = JSON.parse(pageDetails.logoandtext);

  return (
    <section
      className="container mx-auto text-gray-600 body-font mt-20 xs:py-16 py-32"
      id="digitalFeatures"
    >
      <MainScrollAnimation>
        <div className=" flex md:px-0 px-5 py-8 md:flex-row flex-col items-start">
          <div className="xs:mb-6 mt-8 md:w-full  flex flex-col xs:items-start md:items-start md:text-left items-center text-center">
            <h2
              style={{ lineHeight: "1.3" }}
              className="xs:mb-2 font-semibold xs:text-left text-primary-lightDark text-[2.2rem]"
            >
              {pageDetails.featuretitle || "N/A"}
            </h2>
            <h1
              className="xs:text-left xs:mb-2 title-font font-600 font-medium text-[3.0rem] text-white"
              style={{ lineHeight: "1.3" }}
            >
              {pageDetails.featuresubtitle || "N/A"}
            </h1>
            <p
              className="xs:text-left sm:text-left md:xs:text-left text-white w-full py-8 mb-4 text-[1.8rem]"
              style={{ lineHeight: "1.5" }}
            >
              {pageDetails.featuredesc || "N/A"}
            </p>
            <Link
              href={`${pageDetails.featurebtnlink || "#"}`}
              className="xs:m-0 w-60 xs:block lg:inline-block first-letter text-xl btnHoverEffect text-white  text-center px-6 py-6"
            >
              <button
                className="text-center font-normal rounded text-white text-[2rem]"
                style={{
                  fontFamily: "GothamRoundedBook",
                }}
              >
                {pageDetails.featurebtntitle || "N/A"}
              </button>
            </Link>
          </div>
          {lstFeatures && lstFeatures.length > 0 && (
            <div className="w-52 xs:w-full sm:w-full mb-10 md:mb-0">
              <div className="text-white rounded-lg md:ml-auto mt-10 md:mt-0 grid grid-cols-3">
                {lstFeatures.map((item: IFeature, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-center overflow-hidden flex-col mb-5 z-10"
                    >
                      <div
                        style={{
                          backgroundColor: "rgba(80, 196, 211, 0.102)",
                        }}
                        className="hover:cursor-pointer hover:border hover:border-primary-lightDark border border-transparent h-full py-4 px-14  rounded-lg  text-center text-white relative text-[4rem]"
                      >
                        <FeatureCards logoText={item.featurelogo} />
                      </div>
                      <h1 className="text-[1.5rem] text-white pt-4 font-normal">
                        {item.featuretext || "N/A"}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </MainScrollAnimation>
    </section>
  );
}
