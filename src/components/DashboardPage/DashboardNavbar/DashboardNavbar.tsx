import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import { lstUserResponsiveNavbar } from "@/data/DashboardSideBar";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { useState } from "react";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`shadow-md bg-white sticky w-full top-0 xl:h-[10rem] xs:h-[8.5rem] z-10 p-t-[2.3rem] p-b-[1.5rem]`}
    >
      <MobileNavbar
        lstNavigations={lstUserResponsiveNavbar}
        toggle={toggle}
        isOpen={isOpen}
        redirectPath="dashboard"
      />
      <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <button
          type="button"
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          onClick={() => {
            if (typeof window !== "undefined") {
              dispatch(
                setSelectedObj({
                  selectedIndex: 0,
                  selectedTitle: "dashboard",
                })
              );
              window.history.replaceState("", "", `/dashboard`);
              dispatch(setRouteIsChanged(true));
            }
          }}
        >
          <span className="self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </span>
        </button>

        <div className="hidden md:block">
          {typeof window !== "undefined" && <DashboardNavigationMenu />}
        </div>
        <div className="block md:hidden">
          {typeof window !== "undefined" && (
            <ResponsiveNavbar toggle={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
}
