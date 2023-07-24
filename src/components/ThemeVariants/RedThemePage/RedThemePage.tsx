import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useEffect, useState } from "react";
import RedThemeDetailsCardSection from "./Cards/DetailsCards/DetailsCardSection";
import RedThemeClients from "./Clients/RedThemeClients";
import RedThemeFeedBack from "./FeedBack/RedThemeFeedBack";
import RedThemeGallery from "./Gallery/RedThemeGallery";
import RedThemePaymentInfo from "./PaymentInfo/RedThemePaymentInfo";
import RedThemeProducts from "./Products/RedThemeProducts";
import RedThemeAboutUs from "./RedThemeAboutUs";
import RedThemeFollowUs from "./RedThemeFollowUs";
import RedThemeHeader from "./RedThemeHeader";
import RedThemeService from "./Services/RedThemeService";

export default function RedTheme() {
  const [lstData, setLstData] = useState<any>([]);

  const loadData = async () => {
    try {
      const res = await ApiService.getWebsiteDetails();
      if (!res.error) {
        setLstData(res);
        return null;
      }

      throw new Error(res.message);
    } catch (Ex: any) {
      Utils.showErrorMessage(Ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!lstData) return <PageCircularLoading />;
  const objCompany = lstData.company;
  const lstSocialData = lstData.social;
  const lstPortfolio = lstData.portfolio;
  const lstProduct = lstData.product;
  const lstService = lstData.service;
  const lstClient = lstData.client;
  const objPaymentInfo = lstData.paymentinfo;
  const lstTestimonial = lstData.testimonial;

  return (
    <div className="bg-white container_fluid min-h-screen h-auto w-[575px] m-auto max-w-full share_links">
      <RedThemeHeader objCompany={objCompany} />
      <div
        className="profile_body pt-16"
        style={{
          border: "4rem 4rem 0 0",
        }}
      >
        <div className="container contact-section mt-20">
          <RedThemeDetailsCardSection objCompany={objCompany} />
          <div className="mt-16">
            <RedThemeFollowUs lstSocialData={lstSocialData} />
            <RedThemeAboutUs objCompany={objCompany} />
            <RedThemeGallery lstImageGallery={lstPortfolio} />
            <RedThemeProducts lstProduct={lstProduct} />
            <RedThemeService lstService={lstService} />
            <RedThemeClients lstClient={lstClient} />
            <RedThemePaymentInfo objPaymentInfo={objPaymentInfo} />
            <RedThemeFeedBack lstTestimonial={lstTestimonial} />
          </div>
        </div>
      </div>
    </div>
  );
}
