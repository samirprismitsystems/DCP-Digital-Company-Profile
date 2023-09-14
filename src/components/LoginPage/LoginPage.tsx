import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginFooter from "./LoginFooter/LoginFooter";
import LoginForm from "./LoginForm/LoginForm";
import LoginNavbar from "./LoginNavbar/LoginNavbar";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
                className="sm:h-[33vh] md:h-[42vh] h-full w-full xl:h-screen object-center object-cover"
                src="/assets/loginScreen/login_img.webp"
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
            <div className="w-full h-full p-4 sm:p-8 md:p-20">
              <div className="xl:pt-[33rem] xlOne:pt-[25rem] xlTwo:pt-[24rem] xlThree:pt-[10rem] xs:pt-0 w-3/4 xs:w-full m-auto md:w-3/4">
                <h1 className="xs:text-5xl text-black text-center xl:text-7xl font-bold">
                  Welcome to
                </h1>
                <h2 className="xs:text-5xl pt-8 pb-8 text-center text-secondary-main xl:font-bold xl:text-7xl font-bold">
                  Digital Company Profile
                </h2>
                <div className="w-full  border-b-2 border-b-gray-200"></div>
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
