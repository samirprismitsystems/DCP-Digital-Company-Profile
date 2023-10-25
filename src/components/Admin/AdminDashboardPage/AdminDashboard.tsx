import DashboardCards from "@/components/Dashboard/DashboardPage/DashboardCards/DashboardCards";
import { IAdminDashboardCounts } from "@/types/commonTypes";
import {
  faImages,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBox,
  faBoxOpen,
  faCogs,
  faQuoteRight,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function AdminDashboard({
  data,
}: {
  data: IAdminDashboardCounts;
}) {
  const [objData, setObjData] = useState<IAdminDashboardCounts>(data);
  const lstAdminDashboardCards = [
    {
      id: 0,
      name: "Total Users",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faUser}
        />
      ),
      digit: objData?.users || 0,
      afterBorderClass: "after:border-[#f27f21]",
      borderClass: "border-[#f27f21]",
      textColor: "text-[#f27f21]",
    },
    {
      id: 1,
      name: "Total Orders",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faBoxOpen}
        />
      ),
      digit: objData?.orders || 0,
      afterBorderClass: "after:border-[#4accdb]",
      borderClass: "border-[#4accdb]",
      textColor: "text-[#4accdb]",
    },
    {
      id: 2,
      name: "Total Products",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faBox}
        />
      ),
      digit: objData?.product || 0,
      afterBorderClass: "after:border-[#a8a8a8]",
      borderClass: "border-[#a8a8a8]",
      textColor: "text-[#a8a8a8]",
    },
    {
      id: 3,
      name: "Total Service",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faCogs}
        />
      ),
      digit: objData?.service || 0,
      afterBorderClass: "after:border-[#ff1c86]",
      borderClass: "border-[#ff1c86]",
      textColor: "text-[#ff1c86]",
    },
    {
      id: 4,
      name: "Total Clients",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faUserFriends}
        />
      ),
      digit: objData?.clients || 0,
      afterBorderClass: "after:border-[#9b82ae]",
      borderClass: "border-[#9b82ae]",
      textColor: "text-[#9b82ae]",
    },
    {
      id: 5,
      name: "Total Portfolio",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] transition-all duration-300 ease-linear"
          icon={faImages}
        />
      ),
      digit: objData?.portfolio || 0,
      afterBorderClass: "after:border-[#A52A2A]",
      borderClass: "border-[#A52A2A]",
      textColor: "text-[#A52A2A]",
    },
    {
      id: 6,
      name: "Total Testimonials",
      icon: (
        <FontAwesomeIcon
          className="text-[40px] transition-all duration-300 ease-linear"
          icon={faQuoteRight}
        />
      ),
      digit: objData?.testimonials || 0,
      afterBorderClass: "after:border-[#c2a9ff]",
      borderClass: "border-[#c2a9ff]",
      textColor: "text-[#c2a9ff]",
    },
    {
      id: 7,
      name: "Total Enquires",
      icon: (
        <FontAwesomeIcon
          className="text-[35px] text-[#132c33] transition-all duration-300 ease-linear"
          icon={faQuestionCircle}
        />
      ),
      digit: objData?.inquiry || 0,
      afterBorderClass: "after:border-[#132c33]",
      borderClass: "border-[#132c33]",
      textColor: "text-[#132c33]",
    },
  ];

  return (
    lstAdminDashboardCards &&
    lstAdminDashboardCards.map((item) => (
      <div key={item.id} className="dashboard_card max-w-full px-[12px]">
        <DashboardCards item={item} />
      </div>
    ))
  );
}
