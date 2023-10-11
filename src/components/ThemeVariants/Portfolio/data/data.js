import {
  faAddressBook,
  faImages,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowCircleUp,
  faCogs,
  faCommentDots,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

export const lstPortfolioFooter = [
  {
    name: "Back To Top",
    link: "#profile",
    color: "text-black",
    icon: faArrowCircleUp,
  },
  {
    name: "About Us",
    link: "#aboutus",
    color: "text-portfolioTheme-primary",
    icon: faUserCircle,
  },
  {
    name: "Gallery",
    link: "#gallery",
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

export const lstGadgetFooter = [
  {
    name: "Back To Top",
    link: "#home",
    color: "text-black",
    icon: faArrowCircleUp,
  },
  {
    name: "About Us",
    link: "#about",
    color: "text-gadgetTheme-primary",
    icon: faUserCircle,
  },
  {
    name: "Product",
    link: "#product",
    color: "text-gadgetTheme-primary",
    icon: faShoppingBasket,
  },
  {
    name: "Gallery",
    link: "#gallery",
    color: "text-gadgetTheme-primary",
    icon: faImages,
  },
  {
    name: "Feedback",
    link: "#feedback",
    color: "text-gadgetTheme-primary",
    icon: faCommentDots,
  },
];
