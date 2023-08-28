import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IHomeCareInfo } from "@/types/themes/portfolio";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import HomeCareAboutUs from "./AboutUs/HomeCareAboutUs";
import HomeCareContactIcons from "./ContactInformation/HomeCareContactIcons";
import HomeCareContactInformation from "./ContactInformation/HomeCareContactInformation";
import HomeCareShareCard from "./ContactInformation/HomeCareShareCard";
import HomeCareEnquiryForm from "./EnquiryFom/HomeCareEnquiryForm";
import HomeCareFooter from "./Footer/HomeCareFooter";
import HomeCareGallery from "./Gallery/HomeCareGallery";
import HomeCareGoogleMap from "./GoogleMap/HomeCareGoogleMap";
import HomeCareHeroSection from "./HeroSection/HomeCareHeroSection";
import HomeCareSaveContact from "./HomeCareSaveContact/HomeCareSaveContact";
import HomeCareMadeWithLove from "./MadeWithLove/HomeCareMadeWithLove";
import HomeCarePaymentDetails from "./Payments/HomeCarePaymentDetails";
import HomeCareProducts from "./Products/HomeCareProducts";
import HomeCareServices from "./Services/HomeCareServices";
import HomeCareVideos from "./Videos/HomeCareVideos";

export const HomeCareContextApi = createContext<IHomeCareInfo>(
  {} as IHomeCareInfo
);

export default function HomeCarePage() {
  return (
    <>
      <Head>
        <title>Home Care Products</title>
      </Head>
        <div className="homeCareBody pl-0 pr-0 pb-0 w-full bg-homeCareTheme-primary">
          <div className="main-container xs:pt-[30vh] xlOne:pt-[10vh] max-w-full xs:w-[500px] md:w-[62%] rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-none m-auto relative py-0 px-7">
            <div id="home">
              <HomeCareHeroSection />
              <HomeCareContactIcons />
              <div className="xs:grid-cols-1 xl:grid xl:grid-cols-2 xl:gap-16">
                <HomeCareContactInformation />
                <HomeCareShareCard />
              </div>
            </div>
            <HomeCareSaveContact />
            <HomeCareAboutUs />
            <HomeCareProducts />
            <HomeCareGallery />
            <HomeCareServices />
            <HomeCareVideos />
            <div className="xs:grid-cols-1 xl:grid xl:grid-cols-2 xl:gap-16">
              <HomeCarePaymentDetails />
              <HomeCareGoogleMap />
            </div>
            <HomeCareEnquiryForm />
            <HomeCareMadeWithLove />
            <div className="xs:hidden sm:visible max-w-full mx-auto  rounded-bl-none rounded-br-none sticky  bottom-0 z-0 w-full bg-[#fff] rounded-[20px] text-center">
              <HomeCareFooter />
            </div>
          </div>
          <div className="xs:visible sm:hidden max-w-full mx-auto  rounded-bl-none rounded-br-none sticky  bottom-0 z-0 w-full bg-[#fff] rounded-[20px] text-center">
            <HomeCareFooter />
          </div>
        </div>
    </>
  );
}
