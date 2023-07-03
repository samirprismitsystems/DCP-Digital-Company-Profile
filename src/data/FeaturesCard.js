import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faEdit, faEnvelope, faImages, faMapMarkedAlt, faPhoneVolume, faQrcode, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const lstFeatures = [
  {
    id: 1,
    title: "Click To Call",
    iconPack: "faPhoneVolume",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faPhoneVolume}
      />
    ),
  },
  {
    id: 2,
    title: "Click To WhatsApp",
    iconPack: "faWhatsapp",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faWhatsapp}
      />
    ),
  },
  {
    id: 3,
    title: "Click To Email",
    iconPack: "faEnvelope",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faEnvelope}
      />
    ),
  },
  {
    id: 4,
    title: "Click To Navigate",
    iconPack: "faMapMarkedAlt",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faMapMarkedAlt}
      />
    ),
  },
  {
    id: 9,
    title: "Add To Contacts",
    iconPack: "faAddressBook",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faAddressBook}
      />
    ),
  },
  {
    id: 5,
    title: "Share From Unlimited",
    iconPack: "faShareSquare",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faShareSquare}
      />
    ),
  },
  {
    id: 6,
    title: "Easy To Update",
    iconPack: "faEdit",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faEdit}
      />
    ),
  },
  {
    id: 7,
    title: "Create Photo Gallery",
    iconPack: "faImages",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faImages}
      />
    ),
  },
  {
    id: 8,
    title: "Payment Links",
    iconPack: "faQrcode",
    icon: (
      <FontAwesomeIcon
        className="bg-transparent text-primary-lightDark"
        icon={faQrcode}
      />
    ),
  },
];
