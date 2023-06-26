import Utils from "@/services/Utils";
import { INavigationMenu } from "@/types/commonTypes";
import { useState } from "react";
import { landingPageNavigationMenuList } from "../../../data/NavigationMenu";

export default function MobileNavbar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div
        className={`h-screen w-${isOpen && "full"} ${
          !isOpen && "sideBarEffectNoWidth"
        }  float-right sideBarEffect bg-black  text-white`}
      >
        {isOpen && (
          <div className={`container py-16 w-${isOpen ? "full" : "0"} `}>
            <button className="float-right relative px-16" onClick={toggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                className="w-16 h-16 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="h-[800px] container py-16 text-white my-32 flex justify-center items-center">
              <div className="w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                  {landingPageNavigationMenuList &&
                    landingPageNavigationMenuList.map(
                      (item: INavigationMenu, index: number) => (
                        <a
                          onClick={(event: any) => {
                            event.preventDefault();
                            setSelectedIndex(item.id);
                            Utils.scrollToView(item.link);
                            toggle();
                          }}
                          href="#"
                          className={`py-16 text-[2.5rem] block hover:text-primary-lightDark ${
                            item.id === selectedIndex
                              ? "text-primary-lightDark"
                              : "text-white"
                          }`}
                          aria-current="page"
                        >
                          {item.name}
                        </a>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
