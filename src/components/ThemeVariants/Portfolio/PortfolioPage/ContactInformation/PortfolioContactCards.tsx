import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function PortfolioContactCards() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <div className="xs:grid xs:grid-cols-2 md:grid-cols-4 gap-8">
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <a
          href={`https://wa.me/+91${objCompany.company_contact}`}
          target="_blank"
          rel="noopener"
          className=" shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] ">
            {" "}
            <FontAwesomeIcon
              className="text-6xl font-bold text-portfolioTheme-primary"
              icon={faWhatsapp}
            />
          </span>
          <div className="share_link_detail">
            <span className="c-text mb-3 block text-3xl text-black">
              WhatsApp
            </span>
            <span className="c-text gary-text text-3xl text-[#b2b2b2]">
              {objCompany.company_contact}
            </span>
          </div>
        </a>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <a
          href="https://wa.me/+919876543210"
          target="_blank"
          rel="noopener"
          className=" shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] ">
            {" "}
            <FontAwesomeIcon
              className="text-6xl font-bold text-portfolioTheme-primary"
              icon={faShareSquare}
            />
          </span>
          <div className="share_link_detail ">
            <span className="c-text mb-3 block text-3xl text-black">
              Share with friends
            </span>
            <div className="social-icons flex justify-start items-center flex-cols space-x-4">
              <span className="fb-icon">
                <FontAwesomeIcon
                  className="text-3xl font-bold text-[#b2b2b2]"
                  icon={faFacebookF}
                />
              </span>
              <span className="twt-icon">
                <FontAwesomeIcon
                  className="text-3xl font-bold text-[#b2b2b2]"
                  icon={faTwitter}
                />
              </span>
              <span className="insta-icon">
                <FontAwesomeIcon
                  className="text-3xl font-bold text-[#b2b2b2]"
                  icon={faInstagram}
                />
              </span>
              <span className="in-icon">
                <FontAwesomeIcon
                  className="text-3xl font-bold text-[#b2b2b2]"
                  icon={faLinkedinIn}
                />
              </span>
              <span className="tele-icon">
                <FontAwesomeIcon
                  className="text-3xl font-bold text-[#b2b2b2]"
                  icon={faTelegram}
                />
              </span>
            </div>
          </div>
        </a>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <a
          href="nitin.vcf"
          download={true}
          rel="noopener"
          className=" shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] ">
            {" "}
            <FontAwesomeIcon
              className="text-6xl font-bold text-portfolioTheme-primary"
              icon={faSave}
            />
          </span>
          <div className="share_link_detail">
            <span className="c-text mb-3 block text-3xl text-black">Save</span>
            <span className="c-text gary-text text-[1.7rem] text-[#b2b2b2]">
              Save VCard Contact
            </span>
          </div>
        </a>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <a
          href="nitin.vcf"
          download={true}
          rel="noopener"
          className=" shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] ">
            {" "}
            <FontAwesomeIcon
              className="text-6xl font-bold text-portfolioTheme-primary"
              icon={faClock}
            />
          </span>
          <div className="share_link_detail">
            <span className="c-text mb-3 block text-3xl text-black">
              Working Hours
            </span>
            <span className="c-text gary-text text-3xl text-[#b2b2b2]">
              {`${Utils.getWorkingHours(
                objCompany.working_hours_from
              )} - ${Utils.getWorkingHours(objCompany.working_hours_to)}`}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
