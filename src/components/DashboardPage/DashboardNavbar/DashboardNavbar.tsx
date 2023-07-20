import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import { loginPageNavigationMenuList } from "@/data/NavigationMenu";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import DashboardNavigationMenu from "./DashboardNavigationMenu";

export default function DashboardNavbar(props: {
  toggleContent: (isChanged: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`shadow-md bg-white sticky w-full top-0 xl:h-[10rem] xs:h-[8.5rem] z-10 p-t-[2.3rem] p-b-[1.5rem]`}
    >
      <MobileNavbar
        lstNavigations={loginPageNavigationMenuList}
        toggle={toggle}
        isOpen={isOpen}
      />
      <span className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <button
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          onClick={() => {
            dispatch(
              setSelectedObj({
                selectedIndex: 0,
                selectedTitle: "dashboard",
              })
            );
            window.history.replaceState("", "", `/dashboard`);
            props.toggleContent(true);
          }}
        >
          <h1 className=" self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </h1>
        </button>
        <DashboardNavigationMenu />
      </span>
    </nav>
  );
}
