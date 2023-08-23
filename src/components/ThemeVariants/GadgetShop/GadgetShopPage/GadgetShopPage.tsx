import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IHomeCareInfo } from "@/types/themes/portfolio";
import { createContext, useEffect, useState } from "react";
import GadgetHeroSection from "./HeroSection/GadgetHeroSection";
import GadgetMainContent from "./HeroSection/MainContent/GadgetMainContent";

export const GadgetShopContextApi = createContext<IHomeCareInfo>(
  {} as IHomeCareInfo
);

export default function GadgetShopPage() {
  const [result, setResult] = useState<IHomeCareInfo>();

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
    <GadgetShopContextApi.Provider value={result}>
      <div className="p-0 gadgetfontfamily gadgetShop_theme" id="">
        <GadgetHeroSection />
        <GadgetMainContent />
      </div>
    </GadgetShopContextApi.Provider>
  );
}
