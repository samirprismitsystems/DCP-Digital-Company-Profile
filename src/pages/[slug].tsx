import PageCircularLoading from "@/common/PageCircularLoading";
import GadgetShopPage from "@/components/ThemeVariants/GadgetShop/GadgetShopPage/GadgetShopPage";
import HomeCarePage from "@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage";
import PortfolioPage from "@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage";
import ApiService from "@/services/ApiServices";
import { THEME_TYPE } from "@/services/Enums";
import Utils from "@/services/Utils";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setRedThemeDataChanged } from "@/services/store/slices/commonSlice";
import { RootState } from "@/services/store/store";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageNotFound from "./404";

export const ThemeContextApi = createContext<IPortfolioInfo>(
  {} as IPortfolioInfo
);

export default function UserViewSection() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<IPortfolioInfo>({} as IPortfolioInfo);
  const [themeID, setThemeID] = useState<number | undefined>(undefined);
  const isRedThemeDataChanged = useAppSelector(
    (store: RootState) => store.common.isRedThemeDataChanged
  );
  const router = useRouter();
  const slug = router.query.slug;

  const loadData = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [router.query.slug]);

  useEffect(() => {
    if (isRedThemeDataChanged) {
      loadData();
      dispatch(setRedThemeDataChanged(false));
    }
  }, [isRedThemeDataChanged]);

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
      return (
        <PageNotFound
          desc={"Please select the theme from dashboard!"}
          title="Themes Not Available!"
          hideButton={true}
        />
      );
    }
  };

  if (isLoading) return <PageCircularLoading />;
  return (
    <ThemeContextApi.Provider value={result}>
      {getTheme()}
    </ThemeContextApi.Provider>
  );
}
