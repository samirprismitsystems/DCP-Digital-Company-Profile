import PageCircularLoading from "@/common/PageCircularLoading";
import GadgetShopPage from "@/components/ThemeVariants/GadgetShop/GadgetShopPage/GadgetShopPage";
import HomeCarePage from "@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage";
import PortfolioPage from "@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage";
import ApiService from "@/services/ApiServices";
import { THEME_TYPE } from "@/services/Enums";
import Utils from "@/services/Utils";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import { createContext, useEffect, useState } from "react";

export const ThemeContextApi = createContext<IPortfolioInfo>(
  {} as IPortfolioInfo
);

export default function UserViewSection() {
  const [result, setResult] = useState<IPortfolioInfo>();
  const [themeID, setThemeID] = useState<number | undefined>(undefined);

  const loadData = async () => {
    try {
      const res: IPortfolioInfo = await ApiService.getWebsiteDetails();
      if (!res.error) {
        setResult(res);
        setThemeID(parseInt(res.company.theme_id));
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
    <ThemeContextApi.Provider value={result}>
      {themeID === THEME_TYPE.GADGET && <GadgetShopPage />}
      {themeID === THEME_TYPE.HOMECARE && <HomeCarePage />}
      {themeID === THEME_TYPE.PORTFOLIO && <PortfolioPage result={result} />}
    </ThemeContextApi.Provider>
  );
}
