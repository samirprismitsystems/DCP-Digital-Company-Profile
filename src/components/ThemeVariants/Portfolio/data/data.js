import {
  faAddressBook,
  faImages,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowCircleUp, faCogs } from "@fortawesome/free-solid-svg-icons";

export const lstPortfolioFooter = [
  {
    name: "Back To Top",
    link: "#back",
    color: "text-black",
    icon: faArrowCircleUp,
  },
  {
    name: "About Us",
    link: "#about",
    color: "text-portfolioTheme-primary",
    icon: faUserCircle,
  },
  {
    name: "Gallery",
    link: "#portfolio",
    color: "text-portfolioTheme-primary",
    icon: faImages,
  },
  {
    name: "Services",
    link: "#services",
    color: "text-portfolioTheme-primary",
    icon: faCogs,
  },
  {
    name: "Contact Us",
    link: "#contactus",
    color: "text-portfolioTheme-primary",
    icon: faAddressBook,
  },
];
