import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import LoginFooter from "../LoginPage/LoginFooter/LoginFooter";
import LoginNavbar from "../LoginPage/LoginNavbar/LoginNavbar";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

export default function RegistrationPage() {
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
          <div className="relative z-0 h-screen xs:h-[25vh] sm:h-[22vh] xl:h-screen xs:w-full w-2/4">
            <picture className="block h-full xs:h-auto">
              <img
                className="md:h-[42vh] sm:h-[29vh] h-full w-full xl:h-screen object-center object-cover"
                src="assets/loginScreen/login_img.webp"
                alt=""
              />
            </picture>
            <span
              style={{
                textShadow: "0 0 15px rgba(0, 0, 0, 1)",
              }}
              className="text-[7rem] xs:text-[6rem] xs:text-center font-['Montserrat'] text-white absolute xl:top-40 sm:top-[11rem] xs:top-64  xl:right-8 xs:w-full xs:right-0 font-bold  xl:text-right capitalize z-10"
            >
              hello world
            </span>
          </div>
          <div className="relative z-0 min-h-full h-screen xs:h-[74vh] sm:h-[74vh] xl:h-screen w-2/4 xs:w-full bg-white">
            <div className="w-full h-full p-20 xs:p-8 md:p-8 xs:h-full">
              <div className="xs:pt-0 w-3/4 xs:w-full m-auto md:w-3/4 xl:pt-[33rem] xlOne:pt-[25rem] xlTwo:pt-[24rem] xlThree:pt-[10rem]">
                <h1 className="xs:text-4xl text-black text-center xl:text-6xl font-bold">
                  Create An Account
                </h1>
                <h2 className="xs:text-3xl pt-8 pb-4 text-center text-black xl:font-normal xl:text-3xl">
                  Create an account with your email id and password
                </h2>
                <h1 className="xs:text-2xl pb-8 text-center text-black xl:font-normal xl:text-2xl">
                  to create your Digital Business Card
                </h1>
                {/* <div className="w-full  border-b-2 border-b-gray-200"></div> */}
              </div>
              <RegistrationForm />
              <div className="text-black text-3xl text-center font-semibold">
                <button
                  className="hover:text-secondary-main"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <FontAwesomeIcon size="sm" icon={faAngleDoubleLeft} />
                  Go Back To Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
  );
}
