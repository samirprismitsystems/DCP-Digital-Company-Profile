import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { INavigationMenu } from "@/types/commonTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function MobileNavbar({
  isOpen,
  toggle,
  lstNavigations,
  redirectPath,
  isLogin,
  isAdmin,
  isDashboard,
  isRouter,
}: {
  isOpen: boolean;
  redirectPath?: string;
  lstNavigations: INavigationMenu[]; // Replace 'any' with the actual type
  toggle: () => void;
  isLogin?: boolean;
  isAdmin?: boolean;
  isDashboard?: boolean;
  isRouter?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isChange, setIsChange] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigationOperation = (event: any, item: INavigationMenu) => {
    event.preventDefault();

    if (item.isNavigate) {
      router.push(`${item.link}`);
    }

    if (item.isNewTab) {
      if (typeof window !== "undefined") {
        window.open(item.link);
      }
    }

    if (item.isUseIndex) {
      dispatch(
        setSelectedObj({
          selectedIndex: 0,
          selectedTitle: "profile",
        })
      );
      if (typeof window !== "undefined") {
        window.history.replaceState(
          `/${redirectPath}/profile`,
          "",
          `/${redirectPath}/profile`
        );
      }
      dispatch(setRouteIsChanged(true));
    }

    if (item.isLogout) {
      Utils.clearStorage();
      router.push("/login");
      return null;
    }

    if (isLogin) {
      router.push("/");
      return null;
    }

    setSelectedIndex(item.id);
    // Utils.scrollToView(item.link);
    if (item.link == 'getInTouch'){
      const element: any = document.getElementById(item.link);
      if (element) {
        window.scrollTo({
          top: element.offsetTop ? element.offsetTop - 120 : 0,
          behavior: "smooth",
        });
      }
    }else{
      const element: any = document.getElementById(item.link);
      if (element) {
        window.scrollTo({
          top: element.offsetTop ? element.offsetTop - 80 : 0,
          behavior: "smooth",
        });
      }
    }
    toggle();
  };

  const getContent = () => {
    if (isAdmin) {
      return (
        <div className="md:h-[800px] container py-16 text-white my-32 flex justify-center items-center">
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <button
                type="button"
                onClick={() => {
                  if (isRouter) {
                    if (AuthService.isUserAdmin()) {
                      window.location.href = "/admindashboard/profile";
                    } else {
                      window.location.href = "/dashboard/profile";
                    }
                  } else {
                    dispatch(
                      setSelectedObj({
                        selectedIndex: 0,
                        selectedTitle: "profile",
                      })
                    );
                    if (typeof window !== "undefined") {
                      window.history.replaceState(
                        `/${redirectPath}/profile`,
                        "",
                        `/${redirectPath}/profile`
                      );
                    }
                    dispatch(setRouteIsChanged(true));
                    toggle();
                  }
                }}
                className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${0 === selectedIndex ? "text-primary-lightDark" : "text-white"
                  }`}
                aria-current="page"
              >
                {`Hi, ${AuthService.getUserName()}`}
              </button>
              <button
                type="button"
                onClick={() => {
                  Utils.clearStorage();
                  router.push("/login");
                  return null;
                }}
                className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${1 === selectedIndex ? "text-primary-lightDark" : "text-white"
                  }`}
                aria-current="page"
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
      );
    }

    if (isDashboard) {
      return (
        <div className="md:h-[800px] container py-16 text-white my-32 flex justify-center items-center">
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(`/${Utils.getPageSlug()}`);
                  }
                  toggle();
                }}
                className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${1 === selectedIndex ? "text-primary-lightDark" : "text-white"
                  }`}
                aria-current="page"
              >
                {`Visit Site`}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isRouter) {
                    if (AuthService.isUserAdmin()) {
                      window.location.href = "/admindashboard/profile";
                    } else {
                      window.location.href = "/dashboard/profile";
                    }
                  } else {
                    dispatch(
                      setSelectedObj({
                        selectedIndex: 0,
                        selectedTitle: "profile",
                      })
                    );
                    if (typeof window !== "undefined") {
                      window.history.replaceState(
                        `/${redirectPath}/profile`,
                        "",
                        `/${redirectPath}/profile`
                      );
                    }
                    dispatch(setRouteIsChanged(true));
                    toggle();
                  }
                }}
                className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${2 === selectedIndex ? "text-primary-lightDark" : "text-white"
                  }`}
                aria-current="page"
              >
                {`Hi, ${AuthService.getUserName()}`}
              </button>
              <button
                type="button"
                onClick={() => {
                  Utils.clearStorage();
                  router.push("/login");
                  return null;
                }}
                className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${3 === selectedIndex ? "text-primary-lightDark" : "text-white"
                  }`}
                aria-current="page"
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
      );
    }

    if (lstNavigations) {
      {
        return (
          <div className="md:h-[800px] container py-16 text-white my-32 flex justify-center items-center">
            <div className="w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                {lstNavigations &&
                  lstNavigations.map((item: INavigationMenu, index: number) => (
                    <Link
                      key={index}
                      onClick={(event: any) => {
                        handleNavigationOperation(event, item);
                      }}
                      href="#"
                      className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${item.id === selectedIndex
                          ? "text-primary-lightDark"
                          : "text-white"
                        }`}
                      aria-current="page"
                    >
                      {item.name}
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (!isChange) {
      setIsChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          toggle();
        }
      };
      if (typeof window !== "undefined") {
        document.addEventListener("keydown", handleEscapeKey);
      }
      return () => {
        if (typeof window !== "undefined") {
          document.removeEventListener("keydown", handleEscapeKey);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, toggle]);

  return (
    <div
      className={`h-screen w-${isOpen ? "full" : "0"} float-right bg-black text-white transition-all duration-200 ease-in`}
    >
      {isOpen && (
        <div className={`py-16 w-${isOpen ? "full" : "0"} `}>
          <button
            type="button"
            className="float-right relative px-16"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-16 h-16 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {getContent()}
        </div>
      )}
    </div>
  );
}
