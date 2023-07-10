import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import {
  loginPageNavigationMenuList,
  lstDashboardNavigationMenu,
} from "@/data/NavigationMenu";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import Link from "next/link";
import { useState } from "react";
import DashboardNavigationMenu from "./DashboardNavigationMenu";

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
        lstNavigations={loginPageNavigationMenuList}
        toggle={toggle}
        isOpen={isOpen}
      />
      <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <Link
          href={"/dashboard"}
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          onClick={() => {
            dispatch(
              setSelectedObj({
                selectedIndex: 0,
                selectedTitle: "dashboard",
              })
            );
          }}
        >
          <h1 className=" self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </h1>
        </Link>
        {/* <div className="flex md:hidden">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={toggle}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-12 h-12 bg-transparent text-black"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <Link
            href="/login"
            target="_blank"
            className="btnHoverEffect  w-40 text-white  text-center"
          >
            <button className="lg:hidden py-4 font-semibold text-center text-3xl rounded text-white">
              Logout
            </button>
          </Link>
        </div> */}
        <DashboardNavigationMenu
          lstNavigationMenu={lstDashboardNavigationMenu}
        />
      </div>
    </nav>
  );
}
