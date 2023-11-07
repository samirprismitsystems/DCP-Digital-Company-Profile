import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginFooter from "../LoginPage/LoginFooter/LoginFooter";
import LoginNavbar from "../LoginPage/LoginNavbar/LoginNavbar";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import Link from "next/link";
import ApiService from "@/services/ApiServices";
import { useEffect, useState } from "react";
import Utils from "@/services/Utils";

import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head"

export default function RegistrationPage() {
  const router = useRouter();
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

      const res = await ApiService.getPublicSiteSettingInfo();
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
    <Head>
      <link
        id="favicon"
        rel="shortcut icon"
        href="/logo.png"
        sizes="any"
    />
    </Head>
      <section className="bg-gray-50 dark:bg-gray-900 h-full w-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen pt-5 lg:py-0">
                <Link href={"/"} className="flex items-center mb-10 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-auto h-22" src="/logo.png" alt="logo" />    
                </Link>
                <div className="w-[460px] max-w-[90%] h-auto mb-5  bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 p-12">
                        <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-5xl mb-10 dark:text-white">
                          Create An Account
                        </h1>
                        <RegistrationForm />
                    </div>
                </div>

                <div className="flex flex-wrap space-x-10 ml-auto mr-auto justify-center mt-10">
                  <Link href={`${objSetting.facebook || "#"}`} target="_blank">
                    <li className="group border hover:border-primary-lightDark transition linear duration-300 hover:cursor-pointer group  justify-center items-center flex align-middle rounded-[50%] bg-white hover:bg-secondary-dark h-[4.5rem] w-[4.5rem]">
                      <FontAwesomeIcon
                        className="group-hover:text-white text-center text-secondary-main text-3xl"
                        icon={faFacebookF}
                      />
                    </li>
                  </Link>
                  <Link href={`${objSetting.instaGram || "#"}`} target="_blank">
                    <li className="hover:cursor-pointer hover:bg-secondary-dark transition linear duration-300 group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-[4.5rem] w-[4.5rem] ">
                      <FontAwesomeIcon
                        className="hover:text-white group-hover:text-white text-center bg-transparent text-secondary-main text-3xl"
                        icon={faInstagram}
                      />
                    </li>
                  </Link>
                  <Link href={`${objSetting.linkedIn || "#"}`} target="_blank">
                    <li className="hover:cursor-pointer hover:bg-secondary-dark transition linear duration-300 group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-[4.5rem] w-[4.5rem] ">
                      <FontAwesomeIcon
                        className="hover:text-white group-hover:text-white text-center text-secondary-main text-3xl"
                        icon={faLinkedinIn}
                      />
                    </li>
                  </Link>
                </div>

            </div>
          </section>


    </>
  );
}
