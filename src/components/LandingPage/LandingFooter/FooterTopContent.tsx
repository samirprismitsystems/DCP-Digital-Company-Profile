import MainScrollAnimation from "@/common/MainScrollAnimation";
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

export default function FooterTopContent() {
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
      const res = await ApiService.getAdminSiteSettingInfo();
      const setting = res.setting;
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
    <section className="container xs:pt-24 pt-16 pb-16">
      <div className="row ">
        <MainScrollAnimation>
          <div className="text-center  font-bold font-600">
            <div className="text-[4.6rem]">
              <Link href="/" className="text-white">
                {objSetting.siteTitle || "N/A"}
              </Link>
            </div>
            <h4 className="text-[2.2rem] font-600   text-white">
              {objSetting.siteDesc || "N/A"}
            </h4>
          </div>
          <div className="w-2/5 md:w-1/4 m-auto xs:pt-12 pt-16">
            <ul className="flex lg:justify-center sm:justify-evenly xs:justify-between items-center md:space-x-8">
              <Link
                href={`${objSetting.facebook || "#"}`}
                target="_blank"
                className="group border hover:border-primary-lightDark hover:cursor-pointer group  justify-center items-center flex align-middle rounded-[50%] bg-white hover:bg-secondary-dark h-20 w-20 "
              >
                <FontAwesomeIcon
                  className="group-hover:text-white text-center text-secondary-main text-[3rem]"
                  icon={faFacebookF}
                />
              </Link>
              <Link
                href={`${objSetting.instaGram || "#"}`}
                target="_blank"
                className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-20 w-20 "
              >
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center bg-transparent text-secondary-main text-[3rem]"
                  icon={faInstagram}
                />
              </Link>
              <Link
                href={`${objSetting.linkedIn || "#"}`}
                target="_blank"
                className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-20 w-20 "
              >
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center text-secondary-main text-[3rem]"
                  icon={faLinkedinIn}
                />
              </Link>
            </ul>
          </div>
        </MainScrollAnimation>

        {objSetting.footerList && objSetting.footerList.length > 0 && (
          <MainScrollAnimation>
            <div className="xs:w-full md:w-3/5 m-auto xs:pt-12 md:pt-16 ">
              <ul className="flex justify-between sm:justify-center sm:space-x-16 items-center">
                {objSetting.footerList.map((item: any, index) => (
                  <Link
                    key={index}
                    href={item.page_slug}
                    target="_blank"
                    className="hover:text-primary-light text-white font-medium text-[1.8rem]"
                  >
                    {item.page_name || "N/A"}
                  </Link>
                ))}
              </ul>
            </div>
          </MainScrollAnimation>
        )}
      </div>
    </section>
  );
}
