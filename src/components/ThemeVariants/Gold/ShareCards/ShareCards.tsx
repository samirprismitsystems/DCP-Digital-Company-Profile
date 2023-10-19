import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faFacebookF, faInstagram, faLinkedinIn, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCamera, faClock, faSave, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Cards from "./Cards/Cards";

export default function ShareCards() {
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
      const vCardImage = `PHOTO;VALUE=uri:${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/${objCompany.company_logo
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

  if (!objCompany) return null;
  return (
    <section id='shareCards' className='py-24 bg-gold-white'>
      <div className="container">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
          <Cards link={`https://wa.me/+91${objCompany.company_contact}`} iconName={faWhatsapp} title="WhatsApp" value={`+91 ${objCompany.company_contact}`} />
          <Cards iconName={faShareSquare} title="Share With Friends" clickHandler={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: objCompany.company_name || "N/A",
                  text: "Take a look at this Site!",
                  url: window.location.href,
                })
                .then(() => { })
                .catch((error: any) =>
                  console.log("Error while sharing", error.message)
                );
            } else {
              Utils.showErrorMessage(
                "Share not supported on this browser, do it with old way."
              );
            }
          }} content={
            (<div className="social-icons flex justify-center items-center flex-cols space-x-4">
              <span className="fb-icon">
                <FontAwesomeIcon
                  className="text-[1.8rem] font-bold text-[#b2b2b2]"
                  icon={faFacebookF}
                />
              </span>
              <span className="twt-icon">
                <FontAwesomeIcon
                  className="text-[1.8rem] font-bold text-[#b2b2b2]"
                  icon={faTwitter}
                />
              </span>
              <span className="insta-icon">
                <FontAwesomeIcon
                  className="text-[1.8rem] font-bold text-[#b2b2b2]"
                  icon={faInstagram}
                />
              </span>
              <span className="in-icon">
                <FontAwesomeIcon
                  className="text-[1.8rem] font-bold text-[#b2b2b2]"
                  icon={faLinkedinIn}
                />
              </span>
              <span className="tele-icon">
                <FontAwesomeIcon
                  className="text-[1.8rem] font-bold text-[#b2b2b2]"
                  icon={faTelegram}
                />
              </span>
            </div>)
          } />
          <Cards iconName={faSave} clickHandler={onSaveCardClick} title="Save" value="Save VCard Contact" />
          <Cards iconName={faClock} title=" Working Hours" value={`${Utils.getWorkingHours(
            objCompany.working_hours_from
          )} - ${Utils.getWorkingHours(objCompany.working_hours_to)}`} />
        </div>
      </div>
    </section>
  )
}
