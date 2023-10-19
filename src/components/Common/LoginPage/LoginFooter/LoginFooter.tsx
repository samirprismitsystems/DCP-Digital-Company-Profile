// import { loginScreenPrivacyPolicyList } from "@/data/NavigationMenu";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginFooter() {
  const [objSetting, setObjSetting] = useState({
    facebook: "#",
    instaGram: "#",
    linkedIn: "#",
    siteDesc: "",
    siteTitle: "",
    footerList: [],
  });

  const loadData = async () => {
    try {
      const objRes = await ApiService.getLandingPageResource();

      const res = await ApiService.getAdminSiteSettingInfo();
      const setting = res.setting;
      objRes.page_content && objRes.page_content?.footerpages;
      const footerPages = setting[9]?.setting_value;
      const io: any = new FormData();
      io.append("pages[]", JSON.parse(footerPages));

      const pageData = await ApiService.getSomePageData(io);

      if (!res.error && setting) {
        setObjSetting({
          facebook: setting[3]?.setting_value,
          instaGram: setting[4]?.setting_value,
          linkedIn: setting[5]?.setting_value,
          siteTitle: setting[1]?.setting_value,
          siteDesc: setting[2]?.setting_value,
          footerList: pageData?.pages || [],
        });
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <footer
        className={`h-[100px] shadow-md bg-secondary-main bottom-0 z-10 p-t-[2.3rem] p-b-[1.5rem] flex justify-center items-center fixed right-0 px-8 pt-3 ${
          true ? "w-full" : "footer_width"
        }`}
      >
        <div className="footer_main_dashboard_footer container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between xs:flex-col sm:flex-row  xs:space-y-5 sm:space-y-0 md:space-y-0 p-8 sm:justify-between sm:items-center">
          <div className="flex flex-wrap space-x-10">
            <Link href={`${objSetting.facebook || "#"}`} target="_blank">
              <li className="group border hover:border-primary-lightDark hover:cursor-pointer group  justify-center items-center flex align-middle rounded-[50%] bg-white hover:bg-secondary-dark h-[4.5rem] w-[4.5rem]">
                <FontAwesomeIcon
                  className="group-hover:text-white text-center text-secondary-main text-3xl"
                  icon={faFacebookF}
                />
              </li>
            </Link>
            <Link href={`${objSetting.instaGram || "#"}`} target="_blank">
              <li className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-[4.5rem] w-[4.5rem] ">
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center bg-transparent text-secondary-main text-3xl"
                  icon={faInstagram}
                />
              </li>
            </Link>
            <Link href={`${objSetting.linkedIn || "#"}`} target="_blank">
              <li className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-[4.5rem] w-[4.5rem] ">
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center text-secondary-main text-3xl"
                  icon={faLinkedinIn}
                />
              </li>
            </Link>
          </div>
          <div>
            <ul className="xs:space-x-6 flex justify-between sm:justify-center sm:space-x-16 items-center">
              {/* loginScreenPrivacyPolicyList */}
              {objSetting.footerList &&
                objSetting.footerList.length > 0 &&
                objSetting.footerList.map((item: any, index) => (
                  <li className="text-white" key={index}>
                    <Link
                      href={`${item.page_slug}`}
                      target="_blank"
                      className=" text-white hover:text-black transition-all duration-200 ease-linear font-normal"
                    >
                      {item.page_name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
