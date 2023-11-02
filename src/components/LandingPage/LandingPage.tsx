import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import {
  ILandingPageData,
  ILandingPageDetails,
  IMeta,
} from "@/types/landingPageType";
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
  const [activeSection, setActiveSection] = useState<any>(null);
  const [metaData, setMetaData] = useState<IMeta>({} as IMeta);
  const [pageDetails, setPageDetails] = useState<ILandingPageDetails>(
    {} as ILandingPageDetails
  );

  const loadData = async () => {
    try {
      const result = await ApiService.getLandingPageResource();
      if (result.error) {
        throw new Error(result.message);
      }

      setMetaData(result.page);
      setPageDetails(result.page_content);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);



  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const sectionOffsets: any = {
      heroSection: 0,
      digitalFeatures: 2000,
      getInTouch: 4000,
    };

    // Find the active section based on scroll position
    let active = null;
    for (const section in sectionOffsets) {
      if (scrollTop >= sectionOffsets[section]) {
        active = section;
      }
    }

    setActiveSection(active);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (metaData && Object.keys(metaData).length <= 0)
    return <PageCircularLoading />;

  return (
    <LandingPageContextApi.Provider value={{ metaData, pageDetails }}>
      <Head>
        <meta
          name="description"
          content={metaData?.meta_description || ""}
          key="desc"
        />
        <meta property="og:image" content={metaData?.meta_image || ""} />
        <meta property="og:image:width" content={metaData?.page_id || ""} />
        <title>{metaData?.meta_title || "Digital Company Profile"}</title>
      </Head>
      <LandingNavbar activeSection={activeSection} />
      <HeroSection />
      <HowItsWork />
      <DigitalFeatures />
      <WhyUseDigitalCard cardImage={pageDetails?.ftimg} />
      <FreeTrail />
      <Testimonial />
      <GetInTouch />
      <LandingFooter />
    </LandingPageContextApi.Provider>
  );
}
