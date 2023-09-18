import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import { lstUserResponsiveNavbar } from "@/data/DashboardSideBar";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default function DashboardNavbar(props: {
  lstNav?: any;
  isLogin?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const getRedirectToProfile = () => {
    if (AuthService.isUserAdmin()) {
      if (!router.pathname.startsWith("/admindashboard")) {
        router.push("/admindashboard/profile");
      } else {
        dispatch(
          setSelectedObj({
            selectedIndex: 0,
            selectedTitle: "profile",
          })
        );
        dispatch(setRouteIsChanged(true));
        if (typeof window !== "undefined") {
          window.history.replaceState("proile", "", `/admindashboard/profile`);
        }
      }
    } else {
      if (!router.pathname.startsWith("/dashboard")) {
        router.push("/dashboard/profile");
      } else {
        dispatch(
          setSelectedObj({
            selectedIndex: 0,
            selectedTitle: "profile",
          })
        );
        dispatch(setRouteIsChanged(true));
        if (typeof window !== "undefined") {
          window.history.replaceState("proile", "", `/dashboard/profile`);
        }
      }
    }
  };

  useEffect(() => {
    if (!isChange) {
      setIsChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`shadow-md bg-white sticky z-[999] w-full top-0 xl:h-[10rem] xs:h-[8.5rem] p-t-[2.3rem] p-b-[1.5rem]`}
    >
      <MobileNavbar
        isDashboard={props.isLogin ? false : true}
        lstNavigations={props.lstNav || lstUserResponsiveNavbar}
        toggle={toggle}
        isOpen={isOpen}
        redirectPath="dashboard"
        isLogin={props.isLogin}
      />
      <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <button
          type="button"
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          onClick={() => {
            if (props.isLogin) {
              router.push("/");
            } else {
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
            }
          }}
        >
          <span className="self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </span>
        </button>
        {!(props.isLogin && props.lstNav) && (
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
              {!AuthService.isUserAdmin() && (
                <Link href={`/${Utils.getPageSlug()}`} target="_blank">
                  <button
                    type="button"
                    className={`text-[2.0rem] block px-2 py-3  text-secondary-main font-[500]`}
                  >
                    Visit Site
                  </button>
                </Link>
              )}
              <button
                type="button"
                className={`text-[2.0rem] block px-2 py-3  text-secondary-main font-[500]`}
                onClick={getRedirectToProfile}
              >
                Hi, {AuthService.getUserName()}
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
        )}
        {props.lstNav && props.isLogin && (
          <div className="hidden md:block">
            {typeof window !== "undefined" && (
              <DashboardNavigationMenu
                lstNav={props.lstNav}
                isLogin={props.isLogin}
              />
            )}
          </div>
        )}
        <div className="block md:hidden">
          {typeof window !== "undefined" && (
            <ResponsiveNavbar isLogin={props.isLogin} toggle={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
}
