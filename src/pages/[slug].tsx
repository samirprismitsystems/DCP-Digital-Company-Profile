import PageCircularLoading from "@/common/PageCircularLoading";
import Bronze from "@/components/ThemeVariants/Bronze";
import Diamond from "@/components/ThemeVariants/Diamond/Diamond";
import Gold from "@/components/ThemeVariants/Gold/Index";
import Platinum from "@/components/ThemeVariants/Platinum";
import ApiService from "@/services/ApiServices";
import { THEME_TYPE } from "@/services/Enums";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setRedThemeDataChanged } from "@/services/store/slices/commonSlice";
import { RootState } from "@/services/store/store";
import { IPortfolioInfo } from "@/types/themes/portfolio";
import Head from "next/head";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug]);

  useEffect(() => {
    if (isRedThemeDataChanged) {
      loadData();
      dispatch(setRedThemeDataChanged(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedThemeDataChanged]);

  useEffect(() => {
    loadData();
  }, []);

  const getTheme = () => {
    if (slug !== result.company?.company_slug) {
      return (
        <PageNotFound />
      );
    } else {
      if (themeID === THEME_TYPE.GOLD) {
        return <Gold />
      } else if (themeID === THEME_TYPE.PLATINUM) {
        return <Platinum />
      } else if (themeID === THEME_TYPE.BRONZE) {
        return <Bronze />
      } else if (themeID === THEME_TYPE.DIAMOND) {
        return <Diamond />
      } else {
        return (
          <PageNotFound
            desc={"Please select the theme from dashboard!"}
            title="Themes Not Available!"
            hideButton={true}
          />
        );
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
