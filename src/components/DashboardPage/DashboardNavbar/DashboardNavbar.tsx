import MobileNavbar from "@/components/LandingPage/LandingNavbar/MobileNavbar";
import { lstUserResponsiveNavbar } from "@/data/DashboardSideBar";
import { lstDashboardNavigationMenu } from "@/data/NavigationMenu";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { useEffect, useState } from "react";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { useRouter } from "next/router";

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
              router.push('/')
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

        <div className="hidden md:block">
          {typeof window !== "undefined" && (
            <DashboardNavigationMenu
              lstNav={props.lstNav || lstDashboardNavigationMenu}
              isLogin={props.isLogin}
            />
          )}
        </div>
        <div className="block md:hidden">
          {typeof window !== "undefined" && (
            <ResponsiveNavbar isLogin={props.isLogin} toggle={toggle} />
          )}
        </div>
      </div>
    </nav>
  );
}
