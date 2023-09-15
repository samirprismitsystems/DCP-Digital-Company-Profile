import { IHomeCareInfo } from "@/types/themes/portfolio";
import { createContext } from "react";
import GadgetHeroSection from "./HeroSection/GadgetHeroSection";
import GadgetMainContent from "./HeroSection/MainContent/GadgetMainContent";

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
