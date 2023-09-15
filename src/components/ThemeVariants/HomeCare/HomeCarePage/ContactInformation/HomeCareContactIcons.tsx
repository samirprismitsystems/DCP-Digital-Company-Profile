import {
  faFacebookMessenger,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { HomeCareContextApi } from "../HomeCarePage";
import { ThemeContextApi } from "@/pages/[slug]";
import Link from "next/link";

export default function HomeCareContactIcons() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <>
      <div
        className="border border-solid border-homeCareTheme-opacityBorder contact-information mb-10 bg-white rounded-3xl pt-12 pb-8 text-center "
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <div className="row wrap flex flex-nowrap text-center px-4">
          <div className="col w-full max-w-full text-center">
            <button type="button" className="per_link">
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faPhone}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">
                Call
              </span>{" "}
            </button>
          </div>
          <div className="col w-full max-w-full text-center">
            <Link
              href={`https://api.whatsapp.com/send?phone=+91${objCompany.company_contact}&text=hi`}
              className="per_link"
              target="_blank"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faWhatsapp}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">
                WhatsApp
              </span>{" "}
            </Link>
          </div>
          <div className="col w-full max-w-full text-center">
            <Link
              href={`mailto:${objCompany.company_email}?subject=Enquiry&body=hi`}
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faEnvelope}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">
                Mail Us
              </span>{" "}
            </Link>
          </div>
          <div className="col w-full max-w-full text-center">
            <Link
              href="https://msng.link/o/?Example=fm"
              target="_blank"
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faFacebookMessenger}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">
                Website
              </span>{" "}
            </Link>
          </div>
          <div className="col w-full max-w-full text-center">
            <a
              target="_blank"
              href={`http://maps.google.com/maps/search/?api=1&query=${objCompany.address}`}
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMapMarkerAlt}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">
                Location
              </span>{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
