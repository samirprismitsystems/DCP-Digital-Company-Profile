import Link from "next/link";
import React, { useState } from "react";
import { navigationMenuList } from "../../data/NavigationMenu";
import { INavigationMenu } from "@/types/commonTypes";

export default function NavigationMenu() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
          {navigationMenuList &&
            navigationMenuList.map((item: INavigationMenu, index: number) => (
              <li
                key={index + 1}
                className="px-2 py-3 text-[1.8rem]"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <a
                  href={item.link}
                  className={`text-[2.0rem] block ${
                    item.id === index ? "text-primary-light" : "txtdark"
                  } hover:text-primary-light`}
                  aria-current="page"
                >
                  {item.name}
                </a>
              </li>
            ))}
          <li>
            <Link
              href="#"
              className="border btnHoverEffect text-[1.8rem]  text-white block  text-center py-4 px-10"
            >
              <button className="text-center text-[1.8rem] rounded text-white">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
