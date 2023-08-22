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

export default function HomeCareContactIcons() {
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
            <a href="tel:[9876543210]" className="per_link">
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faPhone}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">Call</span>{" "}
            </a>
          </div>
          <div className="col w-full max-w-full text-center">
            <a
              href="https://api.whatsapp.com/send?phone=9876543210&text=hi"
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faWhatsapp}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">WhatsApp</span>{" "}
            </a>
          </div>
          <div className="col w-full max-w-full text-center">
            <a
              href="mailto:example@gmail.com?subject=Enquiry&body=hi"
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faEnvelope}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">Mail Us</span>{" "}
            </a>
          </div>
          <div className="col w-full max-w-full text-center">
            <a href="https://msng.link/o/?Example=fm" className="per_link">
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faFacebookMessenger}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">Website</span>{" "}
            </a>
          </div>
          <div className="col w-full max-w-full text-center">
            <a
              href="https://www.google.com/maps?q=example"
              className="per_link"
            >
              {" "}
              <FontAwesomeIcon
                className="inline-flex xs:h-12 xl:h-10 p-4 rounded-50  bg-[#e5ebf1] xs:w-12 xl:w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMapMarkerAlt}
              />
              <span className="homecarefont text-[12px] block font-normal text-homeCareTheme-textColor pt-4">Location</span>{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
