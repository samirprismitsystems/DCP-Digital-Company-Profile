import ApiService from "@/services/ApiServices";
import {
  ILandingPageData,
  ILandingPageDetails,
  IMeta,
} from "@/types/commonTypes";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import DigitalFeatures from "./DigitalFeatures/DigitalFeatures";
import FreeTrail from "./FreeTrail/FreeTrail";
import GetInTouch from "./GetInTouch/GetInTouch";
import HeroSection from "./HeroSection/HeroSection";
import HowItsWork from "./HowItsWork/HowItsWork";
import LandingFooter from "./LandingFooter/LandingFooter";
import LandingNavbar from "./LandingNavbar/LandingNavbar";
import Testimonial from "./Testimonials/Testimonial";
import WhyUseDigitalCard from "./WhyUseDigitalCard/WhyUseDigitalCard";

export const LandingPageContextApi = createContext<ILandingPageData>(
  {} as ILandingPageData
);
export default function LandingPage() {
  const [metaData, setMetaData] = useState<IMeta>({} as IMeta);
  const [pageDetails, setPageDetails] = useState<ILandingPageDetails>(
    {} as ILandingPageDetails
  );

  const loadData = async () => {
    try {
      const result = await ApiService.getLandingPageResource();
      if (result.error) {
        throw new Error("An error occurred! Contact admin now.");
      }

      setMetaData(result.page);
      setPageDetails(result.page_content);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (metaData && Object.keys(metaData).length <= 0) return null;
  return (
    <LandingPageContextApi.Provider value={{ metaData, pageDetails }}>
      <Head>
        <meta
          name="description"
          content={metaData.meta_description}
          key="desc"
        />
        <meta property="og:image" content={metaData.meta_image} />
        <meta property="og:image:width" content={metaData.page_id} />
        <title>{metaData.meta_title}</title>
      </Head>

      <LandingNavbar />
      <HeroSection />
      <HowItsWork />
      <DigitalFeatures />
      <WhyUseDigitalCard />
      <FreeTrail />
      <Testimonial />
      <GetInTouch />
      <LandingFooter />
    </LandingPageContextApi.Provider>
  );
}
