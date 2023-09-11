import PageCircularLoading from "@/common/PageCircularLoading";
import GadgetShopPage from "@/components/ThemeVariants/GadgetShop/GadgetShopPage/GadgetShopPage";
import HomeCarePage from "@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage";
import PortfolioPage from "@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage";
import ApiService from "@/services/ApiServices";
import { THEME_TYPE } from "@/services/Enums";
import Utils from "@/services/Utils";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import PageNotFound from "./404";

export const ThemeContextApi = createContext<IPortfolioInfo>(
  {} as IPortfolioInfo
);

export default function UserViewSection() {
  const [result, setResult] = useState<IPortfolioInfo>();
  const [themeID, setThemeID] = useState<number | undefined>(undefined);
  const router = useRouter();
  const slug = router.query.slug;

  const loadData = async () => {
    try {
      if (slug) {
        const res: IPortfolioInfo = await ApiService.getWebsiteDetails(slug);
        if (!res.error) {
          setResult(res);
          setThemeID(parseInt(res.company.theme_id));
          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [router.query.slug]);

  useEffect(() => {
    loadData();
  }, []);

  const getTheme = () => {
    if (themeID === THEME_TYPE.GADGET) {
      return <GadgetShopPage />;
    } else if (themeID === THEME_TYPE.HOMECARE) {
      return <HomeCarePage />;
    } else if (themeID === THEME_TYPE.PORTFOLIO) {
      return <PortfolioPage result={result} />;
    } else {
      return <PageNotFound title="Themes Not Available!" />;
    }
  };

  if (!result) return <PageCircularLoading />;
  return (
    <ThemeContextApi.Provider value={result}>
      {getTheme()}
    </ThemeContextApi.Provider>
  );
}
