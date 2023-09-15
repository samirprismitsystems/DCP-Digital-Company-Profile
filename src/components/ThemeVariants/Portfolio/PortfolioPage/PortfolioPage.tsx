import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Head from "next/head";
import PortfolioAboutUs from "./AboutUs/PortfolioAboutUs";
import PortfolioContactsInformation from "./ContactInformation/PortfolioContactsInformation";
import PortfolioContactUs from "./ContactUs/PortfolioContactUs";
import PortfolioFeedback from "./Feedback/PortfolioFeedback";
import FollowUs from "./FollowUs/PortfolioFollowUs";
import PortfolioGallery from "./Gallery/PortfolioGallery";
import PortfolioPaymentInfo from "./PaymentInfo/PortfolioPaymentInfo";
import PortfolioFooter from "./PortfolioFooter/PortfolioFooter";
import PortfolioProducts from "./Products/PortfolioProducts";
import PortfolioProfile from "./Profile/PortfolioProfile";
import PortfolioServices from "./Services/PortfolioServices";

export default function PortfolioPage(props: any) {
  return (
    <>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          href={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/logo/${
            props.result.company.company_logo
          }`}
          sizes="any"
        />
      </Head>
      <div className="container-flued-portfolio portfolio_theme c-text bg-white">
        <PortfolioProfile />
        <PortfolioContactsInformation />
        <div className="container-portfolio">
          <FollowUs />
          <PortfolioAboutUs />
          <PortfolioGallery />
          <PortfolioProducts />
          <PortfolioServices />
          <PortfolioPaymentInfo />
          <PortfolioFeedback />
          <PortfolioContactUs />
          <div
            className="list-none rounded-tl-[3rem] rounded-tr-[3rem] bg-white pt-8 pb-4 px-6 overflow-hidden items-center hidden md:flex justify-between m-0 sticky z-10 bottom-0 space-x-6 "
            style={{
              boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
            }}
          >
            <PortfolioFooter />
          </div>
        </div>
      </div>
      <div
        className="list-none rounded-tl-[3rem] rounded-tr-[3rem] bg-white pt-8 pb-4 px-6 overflow-hidden flex items-center xs:flex md:hidden justify-between m-0 sticky z-10 bottom-0 space-x-6"
        style={{
          boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
        }}
      >
        <PortfolioFooter />
      </div>
    </>
  );
}
