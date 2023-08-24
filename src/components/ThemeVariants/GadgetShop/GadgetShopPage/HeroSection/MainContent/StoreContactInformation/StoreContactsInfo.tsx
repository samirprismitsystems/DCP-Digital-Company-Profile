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
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetStoreContactInfo from "./GetStoreContactInfo";

export default function StoreContactsInfo() {
  const objCompany = useContext(GadgetShopContextApi).company;
  return (
    <div className="container store-contact">
      <div className="flex  flex-wrap xs:justify-center sm:justify-between xl:justify-center -mx-3 gadgetfontfamily text-gadgetTheme-text">
        <GetStoreContactInfo
          href={`tel:${objCompany.company_contact}`}
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
          href="#"
          icon={
            <FontAwesomeIcon
              icon={faShareSquare}
              className="text-[#007ee5] xs:text-[3.8rem] xl:text-[5rem] xlTwo:text-[3rem]"
            />
          }
          bgColor="rgba(0, 126, 229, 0.2)"
          title="Mail"
        />
        <GetStoreContactInfo
          href={`/nitin_patel.vcf`}
          isDownload={true}
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
