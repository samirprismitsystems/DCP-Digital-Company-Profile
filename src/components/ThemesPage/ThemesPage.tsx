import BackButton from "@/common/BackButton";

import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { useState } from "react";
import ThemeCards from "./ThemeCards/ThemeCards";

export default function ThemesPage() {
  const [themeID, setThemeID] = useState<any>(Utils.getSelectedThemeID());

  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      const io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("theme_id", parseInt(themeID));
      const res = await ApiService.saveThemes(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        const result = await ApiService.getCompanyDetailsPageData();
        let objCompany = result?.company[0];
        if (objCompany) {
          Utils.setSelectedThemeID(objCompany.theme_id);
        }
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
        className="digital_profile_form  form_shadow bg-white min-h-[50%] rounded-2xl p-10 pb-0 block relative_box_for_loading"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <form onSubmit={onSave}>
          <ThemeCards
            onThemeSelect={(id: string) => {
              setThemeID(id);
            }}
          />
        </form>
      </div>
    </>
  );
}
