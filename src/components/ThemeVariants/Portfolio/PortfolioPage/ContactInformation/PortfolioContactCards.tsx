import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
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
import Link from "next/link";
import { useContext } from "react";

export default function PortfolioContactCards() {
  const objCompany = useContext(ThemeContextApi).company;

  function downloadToFile(content: any, filename: string, contentType: string) {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });

      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();

      URL.revokeObjectURL(a.href);
    }
  }

  const onSaveCardClick = () => {
    const makeVCard = () => {
      const vCardVersion = "VERSION:4.0";
      const vCardName = `FN:${objCompany.company_name}`;
      const vCardTitle = `TITLE:${objCompany.business_segment}`;
      const vCardTel = `TEL;TYPE=WORK,VOICE:${objCompany.company_contact}`;
      const vCardTelCell = `TEL;TYPE=CELL,VOICE:${objCompany.company_alternate_contact}`;
      const vCardEmail = `EMAIL;TYPE=WORK:${objCompany.company_email}`;
      const vCardAddress = `ADR;TYPE=WORK:;;${objCompany.address};;;`;
      const vCardUrl = `URL:${window.location.href}`;
      const vCardImage = `PHOTO;VALUE=uri:${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/${
        objCompany.company_logo
      }`;
      const vCardTimeStamp = `REV:${new Date().toISOString()}`;

      const vcard = `BEGIN:VCARD
${vCardVersion}
${vCardName}
${vCardTitle}
${vCardTel}
${vCardTelCell}
${vCardEmail}
${vCardAddress}
${vCardUrl}
${vCardImage}
${vCardTimeStamp}
END:VCARD`;

      downloadToFile(vcard, "vcard.vcf", "text/vcard");
    };

    makeVCard();
  };

  return (
    <div className="xs:grid xs:grid-cols-2 md:grid-cols-4 gap-8">
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <Link
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
              {objCompany.company_contact
                ? `+91${objCompany.company_contact}`
                : "N/A"}
            </span>
          </div>
        </Link>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <button
          type="button"
          id="share"
          rel="noopener"
          className="w-full shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: objCompany.company_name || "N/A",
                    text: "Take a look at this Site!",
                    url: window.location.href,
                  })
                  .then(() => {})
                  .catch((error: any) =>
                    console.log("Error while sharing", error.message)
                  );
              } else {
                Utils.showErrorMessage(
                  "Share not supported on this browser, do it with old way."
                );
              }
            }}
            className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] "
          >
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
        </button>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <button
          onClick={onSaveCardClick}
          type="button"
          rel="noopener"
          className="w-full shadow-md rounded-2xl bg-white mb-8 flex flex-col p-6 transition transition-[all .3s linear] no-underline"
        >
          <span className="link-icon mb-8 mr-0  w-24 h-24 rounded-2xl  flex justify-center items-center bg-[#f5f5f5] ">
            {" "}
            <FontAwesomeIcon
              className="text-6xl font-bold text-portfolioTheme-primary"
              icon={faSave}
            />
          </span>
          <div className="share_link_detail">
            <span className="c-text mb-3 block text-3xl text-black text-left">
              Save
            </span>
            <span className="c-text gary-text text-[1.7rem] text-[#b2b2b2]">
              Save VCard Contact
            </span>
          </div>
        </button>
      </div>
      <div className="col-6 col-md-3 share_link max-w-full shrink-0 ">
        <Link
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
        </Link>
      </div>
    </div>
  );
}
