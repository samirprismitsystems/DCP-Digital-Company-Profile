import {
  faImages,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBoxOpen,
  faCogs,
  faQuoteRight,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const lstDashbordCards = [
  {
    id: 0,
    name: "Total Products",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faBoxOpen}
      />
    ),
    digit: 2,
    afterBorderClass: "after:border-[#f27f21]",
    borderClass: "border-[#f27f21]",
    textColor: "text-[#f27f21]",
  },
  {
    id: 1,
    name: "Total Services",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faCogs}
      />
    ),
    digit: 2,
    afterBorderClass: "after:border-[#4accdb]",
    borderClass: "border-[#4accdb]",
    textColor: "text-[#4accdb]",
  },
  {
    id: 2,
    name: "Total Clients",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faUserFriends}
      />
    ),
    digit: 3,
    afterBorderClass: "after:border-[#a8a8a8]",
    borderClass: "border-[#a8a8a8]",
    textColor: "text-[#a8a8a8]",
  },
  {
    id: 3,
    name: "Total Portfolios",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faImages}
      />
    ),
    digit: 2,
    afterBorderClass: "after:border-[#ff1c86]",
    borderClass: "border-[#ff1c86]",
    textColor: "text-[#ff1c86]",
  },
  {
    id: 4,
    name: "Total Testimonials",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faQuoteRight}
      />
    ),
    digit: 4,
    afterBorderClass: "after:border-[#c2a9ff]",
    borderClass: "border-[#c2a9ff]",
    textColor: "text-[#c2a9ff]",
  },
  {
    id: 5,
    name: "Total Inquiry",
    icon: (
      <FontAwesomeIcon
        className="text-[35px] transition-all duration-300 ease-linear"
        icon={faQuestionCircle}
      />
    ),
    digit: 4,
    afterBorderClass: "after:border-[#132c33]",
    borderClass: "border-[#132c33]",
    textColor: "text-[#132c33]",
  },
];
