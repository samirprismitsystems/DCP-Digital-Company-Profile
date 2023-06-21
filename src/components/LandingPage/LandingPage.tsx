import ApiService from "@/services/ApiServices";
import {
  ILandingPageData,
  ILandingPageDetails,
  IMeta,
} from "@/types/commonTypes";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import Cards from "./Cards";
import Content from "./Content";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import FreeTrail from "./FreeTrail";
import GetInTouch from "./GetInTouch";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Testimonial from "./Testimonial";

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
      console.table(ex);
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

      <Navbar />
      <HeroSection />
      <Cards />
      <Features />
      <FAQ />
      <FreeTrail />
      <Testimonial />
      <GetInTouch />
      <Content />
      <Footer />
    </LandingPageContextApi.Provider>
  );
}
