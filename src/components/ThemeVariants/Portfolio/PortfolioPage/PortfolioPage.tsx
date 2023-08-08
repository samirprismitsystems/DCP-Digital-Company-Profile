import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import { createContext, useEffect, useState } from "react";
import PortfolioAboutUs from "./AboutUs/PortfolioAboutUs";
import PortfolioContactsInformation from "./ContactInformation/PortfolioContactsInformation";
import PortfolioContactUs from "./ContactUs/PortfolioContactUs";
import PortfolioFeedback from "./Feedback/PortfolioFeedback";
import FollowUs from "./FollowUs/PortfolioFollowUs";
import PortfolioGallery from "./Gallery/PortfolioGallery";
import PortfolioPaymentInfo from "./PaymentInfo/PortfolioPaymentInfo";
import PortfolioProducts from "./Products/PortfolioProducts";
import PortfolioProfile from "./Profile/PortfolioProfile";
import PortfolioServices from "./Services/PortfolioServices";
import PortfolioFooter from "./PortfolioFooter/PortfolioFooter";

export const PortfolioContextApi = createContext<IPortfolioInfo>(
  {} as IPortfolioInfo
);

export default function PortfolioPage() {
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
        </div>
      </div>
      <PortfolioFooter />
    </PortfolioContextApi.Provider>
  );
}
