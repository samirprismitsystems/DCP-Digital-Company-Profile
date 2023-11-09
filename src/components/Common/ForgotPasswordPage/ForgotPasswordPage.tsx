

import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { forgotPasswordSchema } from "@/services/forms/formSchema";
<<<<<<< HEAD
=======
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import Head from "next/head";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import LoginFooter from "../LoginPage/LoginFooter/LoginFooter";
import LoginNavbar from "../LoginPage/LoginNavbar/LoginNavbar";
>>>>>>> parent of a29d01f (add update new code 09/11/2023)

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const objForm = useForm({
    defaultValues: {
      userID: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit: any = async (data: { userID: string }) => {
    try {
      setIsLoading(true);
      const io = new FormData();
      io.append("email", data.userID);

      const res = await ApiService.forgotPassword(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
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
<<<<<<< HEAD
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
                  <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-5xl mb-4 dark:text-white">
                    Forgot Password?
                  </h1>
                  <h5 className="tracking-tight text-gray-900 mb-6 mt-4">
                    Mention registered Email id
                  </h5>
                  {
                    !isSent ?
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
                          className="w-full text-white bg-secondary-main mt-3 sm:text-2xl text-3xl mb-5 hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            {isLoading && <CircularLoadingEffectForButton />}
                            Reset Password
                        </button>
                        <p className="font-light text-2xl md:text-3xl mt-5">
                          Go Back To Login? <Link href="/login" className="font-medium text-secondary-main hover:underline text-2xl md:text-3xl ">Login</Link>
                        </p>
                      </form>
                    : 
                    <div>
                      <p>If we found an eligible account associated with that username, we've sent password reset instructions to the primary email address on the account.</p>
                      <p>Still having trouble logging in? <Link href='/'> Contact Support.</Link></p>
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
=======
      <LoginNavbar />
      <div
        className="container-fluid h-full"
        style={{
          padding: "0px",
        }}
      >
        <div className="h-full  flex flex-wrap xl:flex-nowrap xs:flex-col lg:flex-row -mt-4 -mb-4">
          <div className="relative z-0 xs:h-[25vh] min-h-full h-auto sm:h-[21vh] xl:h-auto xs:w-full w-2/4">
            <picture className="block h-full xs:h-auto">
              <Image
                width={800}
                height={800}
                className="md:h-[42vh] min-h-full h-auto w-full xl:h-auto xl:min-h-full object-center object-cover sm:h-[40vh]"
                src="/assets/loginScreen/login_img.webp"
                alt=""
              />
            </picture>
            <span
              style={{
                textShadow: "0 0 15px rgba(0, 0, 0, 1)",
                lineHeight: "1.1",
              }}
              className="xs:text-[5rem] px-[15px] md:text-[7rem] xs:text-center font-['Montserrat'] text-white absolute xl:top-40 sm:top-52 xs:top-52 xl:right-8 xs:w-full xs:right-0 font-bold  xl:text-right capitalize z-10"
            >
              Welcome to DCP
            </span>
          </div>
          <div className="relative z-0 xs:h-[75vh] xl:h-auto xl:min-h-full w-2/4 xs:w-full bg-white">
            <div className="w-full xs:h-[50vh] xl:min-h-full xl:h-auto bg-white xs:flex lg:block h-full xs:p-8 sm:p-20  md:p-20 xl:flex">
              <div className="w-full h-full xs:h-auto  md:p-20 flex justify-center items-center flex-row">
                <div className="w-3/4 xs:w-full m-auto">
                  <h1 className="xl:text-5xl font-normal text-center text-black xs:text-[2.5rem]">
                    Forgot Password?
                  </h1>
                  <h2 className="py-12 text-[1.8rem] text-black text-center">
                    Mention Email id, you will receive an email with password.
                  </h2>

                  <form
                    className="sm:px-16 md:w-3/4 xl:w-4/5 md:m-auto"
                    onSubmit={objForm.handleSubmit(onSubmit)}
                  >
                    <div className="py-4">
                      <label
                        className="block text-left mb-4 font-normal px-2 text-black text-3xl"
                        htmlFor="username"
                      >
                        User ID
                      </label>
                      <input
                        required
                        className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
                        type="email"
                        placeholder="Enter Email Id or Mobile Number"
                        {...objForm.register("userID")}
                      />
                    </div>
                    <div className="w-full text-center">
                      <button
                        type="submit"
                        className={`${isLoading && "opacity-20"
                          } border font-semibold py-4 px-14 text-3xl my-20 xs:my-14 btnHoverEffect  text-white text-center`}
                      >
                        {isLoading && <CircularLoadingEffectForButton />}
                        Send Password
                      </button>
                    </div>
                  </form>
                  <div className="xs:pt-0 md:pt-24 text-black text-3xl text-center font-medium space-x-12 flex xs:flex-col sm:flex-row justify-center items-center sm:space-y-0 xs:space-y-6 lg:py-6">
                    <button
                      className="hover:text-secondary-main"
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      <FontAwesomeIcon size="sm" icon={faAngleDoubleLeft} />
                      Go Back To Login
                    </button>
                    <Link
                      href={"/registration"}
                      className="hover:text-secondary-main"
                    >
                      New User? Create An Account
                      <FontAwesomeIcon size="sm" icon={faAngleDoubleRight} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
  );
}
