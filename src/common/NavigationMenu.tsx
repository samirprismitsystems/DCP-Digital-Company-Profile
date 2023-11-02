import { INavigationMenu } from "@/types/commonTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavigationMenu({
  lstNavigationMenu,
  isNavigate,
  activeSection,
}: {
  lstNavigationMenu: INavigationMenu[];
  isNavigate?: boolean;
  activeSection?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  return (
    <>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
          {lstNavigationMenu &&
            lstNavigationMenu.map((item: INavigationMenu, index: number) => (
              <a
                key={index}
                href={`${isNavigate ? item.link : "#"}`}
                className={`${activeSection === item.link && 'landingPageActive'} text-[2.0rem] block px-2 py-3 ${item.id === selectedIndex ? "text-secondary-main" : "text-secondary-greyDark"
                  } hover:text-primary-light font-[500]`}
                aria-current="page"
                onClick={(event: any) => {
                  if (isNavigate) {
                    router.push("/");
                    return null;
                  }
                  event.preventDefault();
                  setSelectedIndex(item.id);
                  const element: any = document.getElementById(item.link);
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop ? element.offsetTop - 80 : 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          <li>
            <Link
              href="/login"
              target="_blank"
              className="border py-[1rem] px-[2.4rem] btnHoverEffect  text-white block  text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
