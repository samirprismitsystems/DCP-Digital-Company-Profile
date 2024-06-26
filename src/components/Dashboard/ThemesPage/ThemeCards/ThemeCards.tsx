import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import ErrorPlaceholder from "@/common/ErrorPlaceholder";
import Loading from "@/common/Loading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { ITheme } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ThemeCards({ onThemeSelect }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstThemes, setLstThemes] = useState([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(
    Utils.getSelectedThemeID()
  );
  const router = useRouter();

  const toggle = (themeId: string) => {
    setSelectedThemeId(themeId);
    onThemeSelect(themeId);
  };

  const loadData = async () => {
    try {
      if (!Utils.getCompanyID()) {
        Utils.showErrorMessage("Please First Setup Company Details!");
        return null;
      }

      setIsLoading(true);
      const res = await ApiService.getThemes();
      if (!res.error) {
        setLstThemes(res.theme);
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-[10rem]">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="row -mr-3 -ml-3 grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  xlOne:grid-cols-5 gap-8 pb-16">
        {!isLoading &&
          lstThemes &&
          lstThemes.length > 0 &&
          lstThemes.map((theme: ITheme, index: number) => (
            <div key={theme.theme_id} className="flex flex-wrap flex-col">
              <div className="flex items-center justify-between mb-2">
                <h5>Theme #{index + 1}</h5>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
                className="item_div p-6 rounded-xl"
              >
                <div className="item_image mb-4 w-full h-[20rem] border-0 bg-primary-main">
                  <img
                    src={`${UPLOAD_IMAGE_URI}/themes/${theme.theme_image}`}
                    alt="image"
                    className="w-full  h-full object-cover object-center align-middle border-none"
                  />
                </div>
                <div data-v-1dcf67d3="">
                  <label
                    data-v-1dcf67d3=""
                    className="flex cursor-pointer font-medium relative overflow-hidden not-italic text-[1.8rem] leading-[1.3] text-black select-none mb-4 shadow-[inset 0 0 0 0.4375em #126e83]"
                  >
                    <input
                      data-v-1dcf67d3=""
                      className="absolute hidden z-[-9999px] text-black"
                      type="radio"
                      value={theme.theme_id}
                      checked={selectedThemeId === theme.theme_id}
                      onChange={() => toggle(theme.theme_id)}
                    />
                    <span
                      onClick={() => toggle(theme.theme_id)}
                      data-v-1dcf67d3=""
                      className={`before:flex before:shadow-[inset 0 0 0 0.4375em #126e83] hover:bg-[#d6d6e5] ${
                        selectedThemeId === theme.theme_id && "bg-[#d6d6e5]"
                      } before:border-[1px] before:border-secondary-main before:mr-4  before:shrink-0 before:content-["] before:bg-white before:w-[1.5em] before:h-[1.5em] before:rounded-[50%] before:transition-all before:duration-[0.25s] before:ease-in before:shadow-${
                        selectedThemeId === theme.theme_id
                          ? "[inset 0 0 0 0.125em red]"
                          : "none"
                      }`}
                    >
                      {theme.theme_name}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!isLoading && lstThemes && lstThemes.length <= 0 && (
        <div className="pb-8">
          <ErrorPlaceholder error="Themes data not found!" />
        </div>
      )}

      {!isLoading && lstThemes && lstThemes.length > 0 && (
        <DashboardCommonButtons hideNextButton={true} />
      )}
    </>
  );
}
