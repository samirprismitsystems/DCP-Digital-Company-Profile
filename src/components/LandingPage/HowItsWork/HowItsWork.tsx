import MainScrollAnimation from "@/common/MainScrollAnimation";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import {
  ILandingPageCardSteps,
  ILandingPageDetails,
} from "@/types/landingPageType";
import { useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";
import Steps from "./Steps";

export default function HowItsWork() {
  const data = useContext(LandingPageContextApi);
  const pageDetails: ILandingPageDetails = data.pageDetails;
  const steps: ILandingPageCardSteps[] = JSON.parse(pageDetails.steps);

  return (
    <div className="container">
      {steps && steps.length > 0 && (
        <section className="mb-16">
          <div className="container md:px-0 px-5 xs:pt-16 sm:py-44 mx-auto">
            <div className="flex flex-wrap sm:flex-nowrap -m-4 -z-10">
              {steps.map((item: ILandingPageCardSteps, index: number) => (
                <Steps
                  key={index}
                  index={index + 1}
                  title={item.stepstitle}
                  desc={item.stepsdesc}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="text-gray-600 body-font">
        <MainScrollAnimation>
          <div className="container mx-auto flex md:px-0 px-5 xs:py-0 py-16 md:flex-row flex-col md:items-start items-center">
            <div className="xs:w-full md:w-1/2 mb-10 md:mb-0">
              <MainScrollAnimation>
                <img
                  className="w-full h-auto max-w-full rounded-2xl border border-white"
                  alt="hero.png"
                  src={`${UPLOAD_IMAGE_URI}/landingpageoriginal/${pageDetails.cardimg1}`}
                />
              </MainScrollAnimation>
            </div>
            <div className="sm:items-start md:item-center md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center xs:items-start">
              <MainScrollAnimation>
                <h1 className="text-white font-600 md:leading-5 lg:leading-[3.5rem] xs:text-left title-font text-[3.0rem] mb-4 font-semibold">
                  {pageDetails.cardtitle1 || "N/A"}
                </h1>
                <p
                  className="text-white xs:text-left md:text-left  text-[1.8rem] pb-4"
                  dangerouslySetInnerHTML={{
                    __html: pageDetails.carddesc1 || "N/A",
                  }}
                ></p>
              </MainScrollAnimation>
            </div>
          </div>
        </MainScrollAnimation>

        <div className="container mt-20 mx-auto flex md:px-0 px-5  md:flex-row flex-col md:items-start items-center">
          <div className="md:hidden sm:w-full md:w-1/2 mb-10 md:mb-0">
            <MainScrollAnimation>
              <img
                className="w-full h-auto max-w-full rounded-2xl border border-white"
                alt="hero"
                src={`${UPLOAD_IMAGE_URI}/landingpageoriginal/${pageDetails.cardimg2}`}
              />
            </MainScrollAnimation>
          </div>
          <div className="xs:items-start md:w-1/2 flex flex-col sm:items-start md:item-center text-left ">
            <MainScrollAnimation>
              <h1 className="text-white title-font text-[3.0rem] mb-4 font-semibold">
                {pageDetails.cardtitle2 || "N/A"}
              </h1>
              <p
                className="text-white xs:text-left lg:pr-24 md:pr-16 text-[1.8rem] pb-4"
                dangerouslySetInnerHTML={{ __html: pageDetails.carddesc2 }}
              ></p>
            </MainScrollAnimation>
          </div>
          <div className="xs:hidden md:block sm:w-full md:w-1/2 mb-10 md:mb-0">
            <MainScrollAnimation>
              <img
                className="w-full h-auto max-w-full rounded-2xl border border-white"
                alt="hero.png"
                src={`${UPLOAD_IMAGE_URI}/landingpageoriginal/${pageDetails.cardimg2}`}
              />
            </MainScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
