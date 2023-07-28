import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import { loginPageNavigationMenuList } from "@/data/NavigationMenu";
import Utils from "@/services/Utils";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminDashboardNavbar({ setRouteIsChanged }: any) {
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
      <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <button
          type="button"
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          onClick={() => {
            dispatch(
              setSelectedObj({
                selectedIndex: 0,
                selectedTitle: "admindashboard",
              })
            );
            setRouteIsChanged(true);
            window.history.replaceState("", "", `/admindashboard`);
          }}
        >
          <h1 className=" self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </h1>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <button
              className={`text-[2.0rem] block px-2 py-3  text-secondary-main font-[500]`}
              onClick={(event: any) => {
                console.log("clicked");
              }}
            >
              Hi, Admin
            </button>
            <li>
              <button
                className="border py-2 px-9 btnHoverEffect  text-white block  text-center"
                onClick={() => {
                  Utils.clearStorage();
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}