import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import GetStoreContactInfo from "./GetStoreContactInfo";

export default function StoreContactsInfo() {
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
      const vCardImage = `PHOTO;VALUE=uri:${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/${
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
    <div className="container store-contact">
      <div className="flex  flex-wrap xs:justify-center sm:justify-between xl:justify-center -mx-3 gadgetfontfamily text-gadgetTheme-text">
        <GetStoreContactInfo
          isButton={true}
          icon={
            <FontAwesomeIcon
              icon={faPhone}
              className="text-[#f57d00] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(245, 125, 0, 0.20)"
          title="Call"
        />
        <GetStoreContactInfo
          href={`https://wa.me/+91${objCompany.company_contact}`}
          icon={
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-[#25D366] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(37, 211, 102, 0.2)"
          title="WhatsApp"
        />
        <GetStoreContactInfo
          href={`http://maps.google.com/maps/search/?api=1&query=${objCompany.address}`}
          icon={
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#cd201f] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(205, 32, 31, 0.2)"
          title="Location"
        />
        <GetStoreContactInfo
          href={`mailto:${objCompany.company_email}`}
          icon={
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gadgetTheme-primary xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(59, 170, 150, 0.2)"
          title="Mail"
        />
        <GetStoreContactInfo
          isButton={true}
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
          icon={
            <FontAwesomeIcon
              icon={faShareSquare}
              className="text-[#007ee5] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(0, 126, 229, 0.2)"
          title="Share"
        />
        <GetStoreContactInfo
          isButton={true}
          onClick={onSaveCardClick}
          icon={
            <FontAwesomeIcon
              icon={faSave}
              className="text-[#f94877] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(249, 72, 119, 0.2)"
          title="Save"
        />
      </div>
    </div>
  );
}
