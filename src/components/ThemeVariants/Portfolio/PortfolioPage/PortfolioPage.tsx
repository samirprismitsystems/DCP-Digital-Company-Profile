import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
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

export const PortfolioContextApi = createContext<IPortfolioInfo>(
  {} as IPortfolioInfo
);

export default function PortfolioPage(props: any) {
  const [result, setResult] = useState<IPortfolioInfo>();
  
  const loadData = async () => {
    try {
      const res = await ApiService.getWebsiteDetails();
      if (!res.error) {
        setResult(res);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!result) return <PageCircularLoading />;
  return (
    <PortfolioContextApi.Provider value={result}>
      <Head>
        <link rel="icon" href={result.company.company_logo} sizes="any" />
      </Head>
      <div className="container-flued-portfolio c-text bg-white">
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
            className="list-none rounded-tl-[3rem] rounded-tr-[3rem] bg-white pt-8 pb-4 px-6 overflow-hidden flex items-center xs:hidden md:flex justify-between m-0 sticky z-0 bottom-0 space-x-6"
            style={{
              boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
            }}
          >
            <PortfolioFooter />
          </div>
        </div>
      </div>
      <div
        className="list-none rounded-tl-[3rem] rounded-tr-[3rem] bg-white pt-8 pb-4 px-6 overflow-hidden flex items-center xs:flex md:hidden justify-between m-0 sticky z-0 bottom-0 space-x-6"
        style={{
          boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
        }}
      >
        <PortfolioFooter />
      </div>
    </PortfolioContextApi.Provider>
  );
}
