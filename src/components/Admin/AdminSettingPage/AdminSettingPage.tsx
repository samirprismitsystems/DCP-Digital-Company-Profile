import AdminBackButton from "@/common/AdminBackButton";
import { useState } from "react";
import GoogleAnalytics from "./GoogleAnalytics/GoogleAnalytics";
import SiteSetting from "./SiteSetting/SiteSetting";

export default function AdminSettingPage() {
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <>
      <AdminBackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Website Setting</div>
        <div className="h4 mt-1">Change Website Settings</div>
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
        {isSwitch ? <GoogleAnalytics /> : <SiteSetting />}
      </div>
    </>
  );
}
