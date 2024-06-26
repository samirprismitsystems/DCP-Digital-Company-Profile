import Utils from "@/services/Utils";
import { useEffect, useState } from "react";
import NavigationMenu from "../../../common/NavigationMenu";
import { landingPageNavigationMenuList } from "../../../data/NavigationMenu";
import MobileNavbar from "./MobileNavbar";
import MobileSideBar from "./MobileSideBar";

export default function LandingNavbar({ activeSection }: any) {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 70) {
        setScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`${scrollY >= 50 ? "shadow-md" : "shadow-none"
          } bg-primary-main  border-gray-200 fixed w-full top-0 h-[10rem] z-[12000] p-t-[2.3rem] p-b-[1.5rem]`}
      >
        <MobileNavbar
          lstNavigations={landingPageNavigationMenuList}
          toggle={toggle}
          isOpen={isOpen}
        />
        <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex-wrap justify-between pb-6 pt-6 mx-0 flex items-center h-full">
          <div
            onClick={() => {
              Utils.scrollToView('heroSection')
            }}
            className="hover:cursor-pointer flex items-center p-t-[.3125rem] text-[1.25rem]"
          >
            {/* <h1 className=" self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap text-secondary-greyDark font-bold">
              DCP
            </h1> */}
            <img src="/logo.png" alt="logo.png" className="h-24" />
          </div>
          <MobileSideBar toggle={toggle} />
          <NavigationMenu activeSection={activeSection} lstNavigationMenu={landingPageNavigationMenuList} />
        </div>
      </nav>
    </>
  );
}
