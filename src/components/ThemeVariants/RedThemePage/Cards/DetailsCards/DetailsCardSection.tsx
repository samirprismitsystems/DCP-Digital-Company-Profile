import Utils from "@/services/Utils";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faSave,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import RedThemeShareCardSection from "../ShareCards/RedThemeShareCardSection";
import RedThemeDetailsCard from "./RedThemeDetailsCard";

export default function RedThemeDetailsCardSection({ objCompany }: any) {
  if (!objCompany) return null;
  return (
    <>
      <div className="row justify-content-center justify-center flex flex-wrap m-auto">
        <RedThemeDetailsCard
          isMobile={true}
          name={objCompany.company_contact}
          icon={faPhone}
          link={`tel:${objCompany.company_contact}`}
        />
        <RedThemeDetailsCard
          name={objCompany.company_email}
          icon={faEnvelope}
          link={`mailto:${objCompany.company_email}`}
        />
        <RedThemeDetailsCard
          name={objCompany.address}
          link={`https://www.google.com/maps/search/?api=1&query=${objCompany.address}`}
          icon={faMapMarkerAlt}
        />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <RedThemeShareCardSection
          icon={faWhatsapp}
          title="WhatsApp"
          desc={objCompany.company_contact}
          link={`https://wa.me/${objCompany.company_contact}`}
          />
        <RedThemeShareCardSection
          icon={faShareSquare}
          title="Share With Friends"
          desc={"Node"}
        />
        <RedThemeShareCardSection
          icon={faSave}
          title="Save"
          desc={"Save Vcard Contacts"}
        />
        <RedThemeShareCardSection
          icon={faClock}
          title="Working Hours"
          desc={`${Utils.getAMPMTime(
            objCompany.working_hours_from,
            objCompany.working_hours_to
          )}`}
        />
      </div>
    </>
  );
}
