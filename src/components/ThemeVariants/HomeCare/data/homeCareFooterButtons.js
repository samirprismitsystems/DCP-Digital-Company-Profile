import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const { faFileAlt, faImages } = require("@fortawesome/free-regular-svg-icons");
const {
  faHome,
  faInfo,
  faBoxOpen,
  faCogs,
  faVideo,
  faCreditCard,
  faMapMarkerAlt,
  faQuestion,
  faQuestionCircle,
  faCircleQuestion,
} = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

export const lstHomeCareFooterButton = [
  {
    name: "Home",
    icon: <FontAwesomeIcon className="text-4xl" icon={faHome} />,
    link: "home",
  },
  {
    name: "About Us",
    icon: <FontAwesomeIcon className="text-4xl" icon={faInfo} />,
    link: "about",
  },
  {
    name: "Products",
    icon: <FontAwesomeIcon className="text-4xl" icon={faBoxOpen} />,
    link: "products",
  },
  {
    name: "Documents",
    icon: <FontAwesomeIcon className="text-4xl" icon={faFileAlt} />,
    link: "#",
  },
  {
    name: "Gallery",
    icon: <FontAwesomeIcon className="text-4xl" icon={faImages} />,
    link: "gallery",
  },
  {
    name: "Services",
    icon: <FontAwesomeIcon className="text-4xl" icon={faCogs} />,
    link: "services",
  },
  {
    name: "Video",
    icon: <FontAwesomeIcon className="text-4xl" icon={faYoutube} />,
    link: "video",
  },
  {
    name: "Payment",
    icon: <FontAwesomeIcon className="text-4xl" icon={faCreditCard} />,
    link: "payment",
  },
  {
    name: "Location",
    icon: <FontAwesomeIcon className="text-4xl" icon={faMapMarkerAlt} />,
    link: "location",
  },
  {
    name: "Enquiry",
    icon: <FontAwesomeIcon className="text-4xl" icon={faCircleQuestion} />,
    link: "enquiry",
  },
];
