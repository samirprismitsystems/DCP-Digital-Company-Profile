import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { IHomeCareInfo } from "@/types/themes/portfolio";
import Head from "next/head";
import { createContext } from "react";
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

export const HomeCareContextApi = createContext<IHomeCareInfo>(
  {} as IHomeCareInfo
);

export default function HomeCarePage(props: any) {
  return (
    <>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          href={`${UPLOAD_IMAGE_URI}/${
            Utils.getCompanyID() || props.result.company.company_id
          }/logo/${props.result.company.company_logo}`}
          sizes="any"
        />
        <title>Home Care</title>
      </Head>
      <div className="homeCareBody pl-0 pr-0 pb-0 w-full bg-homeCareTheme-primary">
        <div className="main-container xs:pt-[10vh] md:pt-[30vh] xlOne:pt-[10vh] max-w-full xs:w-[500px] md:w-[62%] rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-none m-auto relative py-0 px-7">
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
          {/* <HomeCareVideos /> */}
          <div className="xs:grid-cols-1 xl:grid xl:grid-cols-2 xl:gap-16">
            <HomeCarePaymentDetails />
            <HomeCareGoogleMap />
          </div>
          <HomeCareEnquiryForm />
          <HomeCareMadeWithLove />
          <div className="max-w-full mx-auto  rounded-bl-none rounded-br-none sticky  bottom-0 z-0 w-full bg-[#fff] rounded-[20px] text-center">
            <HomeCareFooter />
          </div>
        </div>
      </div>
    </>
  );
}
