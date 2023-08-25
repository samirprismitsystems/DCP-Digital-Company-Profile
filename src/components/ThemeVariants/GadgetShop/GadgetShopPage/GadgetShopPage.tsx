import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IHomeCareInfo } from "@/types/themes/portfolio";
import { createContext, useEffect, useState } from "react";
import GadgetHeroSection from "./HeroSection/GadgetHeroSection";
import GadgetMainContent from "./HeroSection/MainContent/GadgetMainContent";
import GadgetFooter from "./GadgetFooter";

export const GadgetShopContextApi = createContext<IHomeCareInfo>(
  {} as IHomeCareInfo
);

export default function GadgetShopPage() {
  return (
    <>
      <div className="p-0 gadgetfontfamily gadgetShop_theme" id="home">
        <GadgetHeroSection />
        <GadgetMainContent />
      </div>
    </>
  );
}
