import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { forgotPasswordSchema } from "@/services/forms/formSchema";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/* eslint-disable react/no-unescaped-entities */
export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState(false)
  const [objSetting, setObjSetting] = useState({
    facebook: "#",
    instaGram: "#",
    linkedIn: "#",
    siteDesc: "",
    siteTitle: "",
    footerList: [],
  });
  const objForm = useForm({
    defaultValues: {
      userID: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
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

  const onSubmit: any = async (data: { userID: string }) => {
    try {
      setIsLoading(true);
      const io = new FormData();
      io.append("email", data.userID);

      const res = await ApiService.forgotPassword(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        objForm.reset({
          userID: ''
        });
        setIsSent(true);
        return null;
      }

      throw new Error("Some error occurred while sending email!");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-full w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen pt-5 lg:py-0">
          <Link href={"/"} className="flex items-center mb-10 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-auto h-22" src="/logo.png" alt="logo" />
          </Link>
          <div className="w-[460px] max-w-[90%] h-auto mb-5  bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 p-12">
                  <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-5xl mb-4 dark:text-white">
                    Forgot Password?
                  </h1>
                  {
                    !isSent ?
                    <>
                      <h5 className="tracking-tight text-gray-900 mb-6 mt-4">
                        Mention registered Email id
                      </h5>
                      <form onSubmit={objForm.handleSubmit(onSubmit)}>
                          <div>
                            <label htmlFor="email" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">User ID</label>
                            <input 
                              type="email"
                              id="email"
                              className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              placeholder="Enter Email Id or Mobile Number"
                              required 
                              {...objForm.register("userID")}
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full text-white bg-secondary-main mt-3 h-[40px] sm:text-2xl text-3xl mb-3 hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Reset Password
                              {isLoading && <CircularLoadingEffectForButton />}
                          </button>
                          <p className="font-light text-2xl md:text-3xl mt-5">
                            Go Back To Login? <Link href="/login" className="font-medium text-secondary-main hover:underline text-2xl md:text-3xl ">Login</Link>
                          </p>
                        </form>
                    </>
                    : 
                    <div>
                      <p>If we found an eligible account associated with that username, we've sent password reset instructions to the primary email address on the account.</p>
                      <p>Still having trouble logging in? <Link href='/#getInTouch' className="text-cyan-700 flex underline hover:text-secondary-dark"> Contact Support.</Link></p>
                    </div> 
                  }
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
