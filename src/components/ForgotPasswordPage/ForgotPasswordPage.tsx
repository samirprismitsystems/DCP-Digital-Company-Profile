import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { forgotPasswordSchema } from "@/services/forms/formSchema";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginFooter from "../LoginPage/LoginFooter/LoginFooter";
import LoginNavbar from "../LoginPage/LoginNavbar/LoginNavbar";

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
      <LoginNavbar />
      <div
        className="container-fluid h-full"
        style={{
          padding: "0px",
        }}
      >
        <div className="h-full  flex flex-wrap xl:flex-nowrap xs:flex-col lg:flex-row -mt-4 -mb-4">
          <div className="relative z-0 h-screen xs:h-[21vh] xl:h-screen xs:w-full w-2/4">
            <picture className="block h-full xs:h-auto">
              <Image
                width={800}
                height={800}
                className="md:h-[42vh] h-full w-full xl:h-screen object-center object-cover sm:h-[40vh]"
                src="/assets/loginScreen/login_img.webp"
                alt=""
              />
            </picture>
            <span
              style={{
                textShadow: "0 0 15px rgba(0, 0, 0, 1)",
              }}
              className="text-[7rem] xs:text-[6rem] xs:text-center font-['Montserrat'] text-white absolute xl:top-40 sm:top-52 xs:top-52  xl:right-8 xs:w-full xs:right-0 font-bold  xl:text-right capitalize z-10"
            >
              hello world
            </span>
          </div>
          <div className="relative  z-0 xs:h-[73vh] xl:h-screen w-2/4 xs:w-full bg-white">
            <div className="w-full xs:flex lg:block h-full xs:p-8 sm:p-20  md:p-20 xl:flex">
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
                        className={`${
                          isLoading && "opacity-20"
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
  );
}
