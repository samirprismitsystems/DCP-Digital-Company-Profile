import AdminBackButton from "@/common/AdminBackButton";
import { useEffect, useState } from "react";
import GoogleAnalytics from "./GoogleAnalytics/GoogleAnalytics";
import SiteSetting from "./SiteSetting/SiteSetting";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useRouter } from "next/router";

export default function AdminSettingPage() {
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const router = useRouter();

  const [objGoogleAnalyticsSetting, setObjGoogleAnalytics] = useState({
    beforeTag: "",
    afterTag: "",
  });

  const [objSiteSetting, setObjSiteSetting] = useState({
    facebook: "",
    instagram: "",
    linkedIn: "",
    siteDescription: "",
    siteEmail: "",
    siteTitle: "",
    footer_pages: [],
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getAdminSiteSettingInfo();
      if (!res.error) {
        const result: any = res.setting;
        const objItemGoogleAnalytics = {
          beforeTag: result[6].setting_value || "",
          afterTag: result[7].setting_value || "",
        };
        const objItemSiteSetting = {
          siteLogo: result[0].setting_value || "",
          siteTitle: result[1].setting_value || "",
          siteDescription: result[2].setting_value || "",
          facebook: result[3].setting_value || "",
          instagram: result[4].setting_value || "",
          linkedIn: result[5].setting_value || "",
          siteEmail: result[8].setting_value || "",
          footer_pages: result[9].setting_value || "",
        };
        setObjGoogleAnalytics(objItemGoogleAnalytics);
        setObjSiteSetting(objItemSiteSetting);
        setIsLoaded(true)
        return null;
      }

      throw new Error("Error occurred while getting social media links!");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  useEffect(() => {
    loadData();
  }, [])

  const onComplete = () => {
    loadData();
  };

  return (
    <>
      <AdminBackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Website Setting</div>
        <div className="h4 mt-1">Change website settings</div>
      </div>

      <ul className="tabs text-base pt-16 list-none  m-0 flex border-b border-solid border-secondary-main ">
        <li
          className="nav_item text-base list-none p-0 m-0"
          onClick={() => {
            if (selectedIndex !== 1) {
              setSelectedIndex(1);
              setIsSwitch(false);
            }
          }}
        >
          <button
            className={`ml-0 py-6 px-8 text-2xl font-medium font-['Montserrat'] block   rounded-tl-[1rem] ${
              isSwitch
                ? "bg-primary-main text-secondary-greyDark"
                : "text-primary-main bg-secondary-main"
            }`}
          >
            Site Setting
          </button>
        </li>
        <li
          className="nav_item text-base list-none p-0 m-0"
          onClick={() => {
            if (selectedIndex !== 2) {
              setSelectedIndex(2);
              setIsSwitch(true);
            }
          }}
        >
          <button
            className={`ml-0 py-6 px-8 text-2xl font-medium font-['Montserrat'] block  rounded-tr-[1rem] ${
              isSwitch
                ? "text-primary-main bg-secondary-main"
                : "bg-primary-main text-secondary-greyDark"
            }`}
          >
            Google Analytics Code
          </button>
        </li>
      </ul>
      <h2 className="mt-6">
        {isSwitch ? "Google Analytics Code" : "Site Setting"}
      </h2>
      <div
        className="mt-16 digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        {isSwitch && isLoaded ? <GoogleAnalytics onComplete={onComplete}  objGoogleAnalyticsSetting={objGoogleAnalyticsSetting} /> : <SiteSetting onComplete={onComplete} objSiteSetting={objSiteSetting} />}
      </div>
    </>
  );
}
