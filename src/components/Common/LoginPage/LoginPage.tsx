import Image from "next/image";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect } from "react";
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
import LoginFooter from "./LoginFooter/LoginFooter";
import LoginForm from "./LoginForm/LoginForm";
import LoginNavbar from "./LoginNavbar/LoginNavbar";
import Head from "next/head";
<<<<<<< HEAD
import Link from "next/link";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";

import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginPage() {
  const router = useRouter();
  const [objSetting, setObjSetting] = useState({
    facebook: "#",
    instaGram: "#",
    linkedIn: "#",
    siteDesc: "",
    siteTitle: "",
    footerList: [],
  });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     router.replace("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

=======

export default function LoginPage() {
  const router = useRouter();
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
<<<<<<< HEAD
  <>
=======
    <>
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
<<<<<<< HEAD
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
                      Sign in to your account
                  </h1>
                  <LoginForm />
                  <div className="flex items-center justify-between">
                      <Link href="/forgetpassword" className="text-2xl md:text-3xl mt-5 mb-5 font-medium text-secondary-main hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <p className="font-light text-2xl md:text-3xl mt-5">
                    Don’t have an account yet? <Link href="/registration" className="font-medium text-secondary-main hover:underline text-2xl md:text-3xl ">Sign up</Link>
                </p>
=======
          href="/revenue.png"
          sizes="any"
        />
      </Head>
      <LoginNavbar />
      <div
        className="container-fluid h-full"
        style={{
          padding: "0px",
        }}
      >
        <div className="h-full flex flex-wrap xl:flex-nowrap xs:flex-col lg:flex-row -mt-4 -mb-4">
          <div className="relative z-0 h-screen xs:h-[24vh] xl:h-screen xs:w-full w-2/4 sm:h-[28vh]">
            <picture className="block h-full xs:h-auto">
              <Image
                width={800}
                height={800}
                className="sm:h-[33vh] md:h-[42vh] h-full w-full xl:min-h-screen xl:h-auto object-center object-cover"
                src="/assets/landingpage/loginScreen/login_img.webp"
                alt=""
              />
            </picture>
            <span
              style={{
                textShadow: "0 0 15px rgba(0, 0, 0, 1)",
                lineHeight: "1.1",
              }}
              className="xs:text-[5rem] px-[15px] text-[7rem] xs:text-center font-['Montserrat'] text-white absolute xl:top-40 sm:top-64 xs:top-52  xl:right-8 xs:w-full xs:right-0 font-bold  xl:text-right capitalize z-10"
            >
              Welcome to DCP
            </span>
          </div>
          <div className="relative z-0 h-screen xs:h-[70vh] xl:h-screen w-2/4 xs:w-full bg-white">
            <div className="w-full p-4 sm:p-8 md:p-20 bg-white h-auto">
              <div className="xl:pt-[33rem] xlOne:pt-[25rem] xlTwo:pt-[24rem] xlThree:pt-[10rem] xs:pt-0 w-3/4 xs:w-full m-auto md:w-3/4">
                <h1 className="xs:text-5xl text-black text-center xl:text-7xl font-bold">
                  Welcome to
                </h1>
                <h2 className="xs:text-5xl pt-8 pb-8 text-center text-secondary-main xl:font-bold xl:text-7xl font-bold">
                  Digital Company Profile
                </h2>
                <div className="w-full  border-b-2 border-b-gray-200"></div>
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
              </div>
              <div className="w-3/4 xs:w-full m-auto xl:py-20 xs:py-6 sm:py-14 text-center xl:text-5xl font-normal text-black xs:text-[2.5rem]">
                Please Login to Continue
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
  );
}
