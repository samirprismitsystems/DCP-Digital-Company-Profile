import ResetPasswordForm from "./ResetPasswordForm";
import Head from "next/head";
import Link from "next/link";

export default function ChangePassword({token }: any) {
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
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-5xl mb-4 dark:text-white">
                  Reset Password
                </h1>
                <ResetPasswordForm token={token} />
              </div>
          </div>

        {/* <div className="flex flex-wrap space-x-10 ml-auto mr-auto justify-center mt-10">
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
          </div> */}

        </div>
      </section>
    </>
  );
}
