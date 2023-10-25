import BackButton from "@/common/BackButton";

import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { useState } from "react";
import ThemeCards from "./ThemeCards/ThemeCards";
import { useRouter } from "next/router";

export default function ThemesPage() {
  const [themeID, setThemeID] = useState<any>(Utils.getSelectedThemeID());
  const router = useRouter();

  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      const io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("theme_id", parseInt(themeID));
      let token = AuthService.getToken();
      io.append("token", token);
      const res = await ApiService.saveThemes(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        // const result = await ApiService.getCompanyDetailsPageData();
        // let objCompany = result?.company[0];
        // if (objCompany) {
        //   Utils.setSelectedThemeID(objCompany.theme_id);
        // }
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2 sm:text-[3rem]">
          Themes For Company Profile Page
        </div>
        <div className="h4 mt-1">Select themes</div>
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
