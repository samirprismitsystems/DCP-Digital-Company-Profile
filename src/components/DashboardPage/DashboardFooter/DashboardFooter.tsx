import { loginScreenPrivacyPolicyList } from "@/data/NavigationMenu";
import { ILoginScreenPrivacyPolicy } from "@/types/commonTypes";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DashboardFooter() {
  return (
    <>
      <nav
        className={`right-0 px-16 xs:h-[11rem] flex flex-wrap items-center bg-secondary-main fixed bottom-0 z-[600]`}
      >
        <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full pb-0 mx-0 xs:flex-col md:flex-row  xs:space-y-5 md:space-y-0 relative left-8">
          <div className="flex flex-wrap space-x-10 justify-center">
            <Link href={"https://www.facebook.com/"} target="_blank">
              <li className="group border hover:border-primary-lightDark hover:cursor-pointer group  justify-center items-center flex align-middle rounded-[50%] bg-white hover:bg-secondary-dark h-[4.5rem] w-[4.5rem]">
                <FontAwesomeIcon
                  className="group-hover:text-white text-center text-secondary-main text-3xl"
                  icon={faFacebookF}
                />
              </li>
            </Link>
            <Link href={"https://www.instagram.com/"} target="_blank">
              <li className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-[4.5rem] w-[4.5rem] ">
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center bg-transparent text-secondary-main text-3xl"
                  icon={faInstagram}
                />
              </li>
            </Link>
            <Link
              href={
                "https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F&trk=login_reg_redirect"
              }
              target="_blank"
            >
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
              {loginScreenPrivacyPolicyList.map(
                (item: ILoginScreenPrivacyPolicy) => (
                  <li className="text-white" key={item.id}>
                    <Link
                      href="#!"
                      className=" text-white hover:text-black transition-all duration-200 ease-linear font-normal"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
