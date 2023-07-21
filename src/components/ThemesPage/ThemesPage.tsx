import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";

import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { useState } from "react";
import ThemeCards from "./ThemeCards/ThemeCards";

export default function ThemesPage() {
  const [themeID, setThemeID] = useState<any>(null);
  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      const io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("theme_id", parseInt(themeID));
      const res = await ApiService.saveThemes(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Themes For Company Profile Page</div>
        <div className="h4 mt-1">Select Themes</div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <form onSubmit={onSave}>
          <div className="row -mr-3 -ml-3 grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  xlOne:grid-cols-5 gap-8 pb-16">
            <ThemeCards
              onThemeSelect={(id: string) => {
                setThemeID(id);
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
              <DashboardCommonButtons hideNextButton={true} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
