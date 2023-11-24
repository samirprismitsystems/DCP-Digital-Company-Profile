import PageCircularLoading from "@/common/PageCircularLoading";
import Bronze from "@/components/ThemeVariants/Bronze";
import Diamond from "@/components/ThemeVariants/Diamond/Diamond";
import Gold from "@/components/ThemeVariants/Gold/Index";
import Platinum from "@/components/ThemeVariants/Platinum";
import Silver from "@/components/ThemeVariants/Silver/components/Silver";
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<IPortfolioInfo>({} as IPortfolioInfo);
  const [themeName, setThemeName] = useState<string | undefined>(undefined);
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
          setThemeName(res.theme?.theme_name);
          setIsLoaded(true);
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

  console.log(themeName)
  const getTheme = () => {
    if(isLoaded){
      if (slug !== result.company?.company_slug) {
        return (
          <PageNotFound />
        );
      } else {
        switch(themeName?.toUpperCase()){
          case THEME_TYPE.GOLD:
            return <Gold />
          case THEME_TYPE.PLATINUM:
            return <Platinum />
          case THEME_TYPE.BRONZE:
            return <Bronze />
          case THEME_TYPE.DIAMOND:
            return <Diamond />
          case THEME_TYPE.SILVER:
            return <Silver />
          default:
            return (
              <PageNotFound
                title="Theme Not Available!"
                desc={"Please select the theme from dashboard!"}
                hideButton={true}
              />
            ); 
        }
      }
    }
  };

  if (isLoading) return <PageCircularLoading />;

  return (
    <>
      <ThemeContextApi.Provider value={result}>
        {getTheme()}
      </ThemeContextApi.Provider>
    </>
  );
}
