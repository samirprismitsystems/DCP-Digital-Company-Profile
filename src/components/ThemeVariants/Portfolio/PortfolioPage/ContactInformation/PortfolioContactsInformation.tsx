import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import PortfolioContactCards from "./PortfolioContactCards";
import { ThemeContextApi } from "@/pages/[slug]";

export default function PortfolioContactsInformation() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <div
      className="container-portfolio profile-body rounded-[4rem 4rem 0 0] pt-24"
      id="top"
    >
      <div className="px-4 contacts-section mt-24">
        <div className="md:grid md:grid-cols-3 mb-4 justify-content-center flex flex-wrap justify-center -mx-3 text-portfolioTheme-textColor gap-8">
          {/* Plates */}
          <div className=" w-full shrink-0">
            <Link
              target="_blank"
              href={`tel:+91${objCompany.company_contact}`}
              className="contact-link mb-8  rounded-2xl flex items-center bg-whiteSmoke no-underline transition transition-[all .3s linear]"
            >
              <span className="link-icon call-icon w-24 h-24 rounded-3xl bg-portfolioTheme-primary flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  className="text-white text-6xl font-bold"
                  icon={faPhone}
                />
              </span>
              <span className="c-text text-black  text-3xl ml-4">
                {objCompany.company_contact || "N/A"}
              </span>
            </Link>
          </div>
          <div className=" w-full shrink-0">
            <Link
              target="_blank"
              href={`mailto:${objCompany.company_email}`}
              className="contact-link mb-8  rounded-2xl flex items-center bg-whiteSmoke no-underline transition transition-[all .3s linear]"
            >
              <span className="link-icon call-icon w-24 h-24 rounded-3xl bg-portfolioTheme-primary flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  className="text-white text-6xl font-bold"
                  icon={faEnvelope}
                />
              </span>
              <span className="c-text text-black  text-3xl ml-4">
                {objCompany.company_email || "N/A"}
              </span>
            </Link>
          </div>
          <div className=" w-full shrink-0">
            <Link
              target="_blank"
              href={`http://maps.google.com/maps/search/?api=1&query=${objCompany.address}`}
              className="contact-link mb-8  rounded-2xl flex items-center bg-whiteSmoke no-underline transition transition-[all .3s linear]"
            >
              <div className="link-icon call-icon min-w-[6rem] h-24 rounded-3xl bg-portfolioTheme-primary flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  className="text-white text-6xl font-bold"
                  icon={faMapMarkerAlt}
                />
              </div>
              <span className="c-text text-black  text-3xl ml-2 px-0 p-6 whitespace-nowrap overflow-auto">
                {objCompany.address || "N/A"}
              </span>
            </Link>
          </div>
        </div>
        {/* Cards */}
      </div>
      <PortfolioContactCards />
    </div>
  );
}
