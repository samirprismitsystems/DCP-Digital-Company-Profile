import MainScrollAnimation from "@/common/MainScrollAnimation";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";

export default function Content() {
  const result = useContext(LandingPageContextApi);
  const data = result.pageDetails;

  console.log(data)
  return (
    <section className="container xs:pt-24 pt-16 pb-16">
      <div className="row ">
        <MainScrollAnimation>
          <div className="text-center  font-bold font-600">
            <div className="text-[4.6rem]">
              <Link href="#!">DCP</Link>
            </div>
            <h4 className="text-[2.2rem] font-600 ">Digital Company Profile</h4>
          </div>
          <div className="w-2/5 md:w-1/4 m-auto xs:pt-12 pt-16">
            <ul className="flex lg:justify-center sm:justify-evenly xs:justify-between items-center md:space-x-8">
              <li className="group border hover:border-primary-lightDark hover:cursor-pointer group  justify-center items-center flex align-middle rounded-[50%] bg-white hover:bg-secondary-dark h-20 w-20 ">
                <FontAwesomeIcon
                  className="group-hover:text-white text-center text-secondary-main text-[3rem]"
                  icon={faFacebookF}
                />
              </li>
              <li className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-20 w-20 ">
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center bg-transparent text-secondary-main text-[3rem]"
                  icon={faInstagram}
                />
              </li>
              <li className="hover:cursor-pointer hover:bg-secondary-dark group border hover:border-primary-lightDark justify-center items-center flex align-middle rounded-[50%] bg-white h-20 w-20 ">
                <FontAwesomeIcon
                  className="hover:text-white group-hover:text-white text-center text-secondary-main text-[3rem]"
                  icon={faLinkedinIn}
                />
              </li>
            </ul>
          </div>
        </MainScrollAnimation>
        <MainScrollAnimation>
          <div className="xs:w-full md:w-3/5 m-auto xs:pt-12 md:pt-16 ">
            <ul className="flex justify-between sm:justify-center sm:space-x-16 items-center">
              <li className="text-[1.8rem] font-400">
                <Link
                  href="#!"
                  className="hover:text-primary-light font-medium "
                >
                  PRIVACY
                </Link>
              </li>
              <li className="text-[1.8rem] font-400">
                <Link
                  href="#!"
                  className="hover:text-primary-light font-medium "
                >
                  COOKIE POLICY
                </Link>
              </li>
              <li className="text-[1.8rem] font-400">
                <Link
                  href="#!"
                  className="hover:text-primary-light font-medium "
                >
                  TERMS OF SERVICE{" "}
                </Link>
              </li>
            </ul>
          </div>
        </MainScrollAnimation>
      </div>
    </section>
  );
}
