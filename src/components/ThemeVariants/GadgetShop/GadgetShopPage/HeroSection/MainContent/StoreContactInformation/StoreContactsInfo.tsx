import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetStoreContactInfo from "./GetStoreContactInfo";

export default function StoreContactsInfo() {
  return (
    <div className="container store-contact">
      <div className="row flex xs:justify-center md:justify-evenly flex-wrap -mx-3 gadgetfontfamily text-gadgetTheme-text">
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faPhone}
              className="text-[#f57d00] xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(245, 125, 0, 0.20)"
          title="Call"
        />
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-[#25D366] xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(37, 211, 102, 0.2)"
          title="WhatsApp"
        />
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#cd201f] xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(205, 32, 31, 0.2)"
          title="Location"
        />
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gadgetTheme-primary xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(59, 170, 150, 0.2)"
          title="Mail"
        />
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faShareSquare}
              className="text-[#007ee5] xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(0, 126, 229, 0.2)"
          title="Mail"
        />
        <GetStoreContactInfo
          icon={
            <FontAwesomeIcon
              icon={faSave}
              className="text-[#f94877] xs:text-[3.8rem] md:text-[3rem]"
            />
          }
          bgColor="rgba(249, 72, 119, 0.2)"
          title="Save"
        />
      </div>
    </div>
  );
}
