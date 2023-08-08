import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import PortfolioContactCards from "./PortfolioContactCards";

export default function PortfolioContactsInformation() {
  const objCompany = useContext(PortfolioContextApi).company;

  return (
    <div
      className="container profile-body rounded-[4rem 4rem 0 0] pt-24"
      id="top"
    >
      <div className="container-portfolio contacts-section mt-24">
        <div className=" mb-4 row justify-content-center flex flex-wrap justify-center -mx-3 text-portfolioTheme-textColor">
          {/* Plates */}
          <div className="col-12 col-md-4 w-full shrink-0">
            <a
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
            </a>
          </div>
          <div className="col-12 col-md-4 w-full shrink-0">
            <a
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
            </a>
          </div>
          <div className="col-12 col-md-4 w-full shrink-0">
            <a
              href={`http://maps.google.com/maps/search/${objCompany.address}`}
              className="contact-link mb-8  rounded-2xl flex items-center bg-whiteSmoke no-underline transition transition-[all .3s linear]"
            >
              <span className="link-icon call-icon w-48 h-24 rounded-3xl bg-portfolioTheme-primary flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  className="text-white text-6xl font-bold"
                  icon={faMapMarkerAlt}
                />
              </span>
              <span className="c-text text-black  text-3xl ml-2 px-0 p-6">
                {objCompany.address || "N/A"}
              </span>
            </a>
          </div>

          {/* Cards */}
        </div>
        <PortfolioContactCards />
      </div>
    </div>
  );
}
