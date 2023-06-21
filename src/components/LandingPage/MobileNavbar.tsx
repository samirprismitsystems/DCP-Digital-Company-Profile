import Link from "next/link";
import React from "react";

export default function MobileNavbar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <>
      <div
        className={`h-screen w-${
          isOpen ? "full" : "0"
        } float-right transition-all duration-300 ease-linear bg-black relative right-0 top-0 z-[99999] text-white`}
      >
        {isOpen && (
          <div className="container py-16">
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
              <div
                className="w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                  <li className="py-16 text-[2.5rem]">
                    <a
                      href="#"
                      className="text-[2.5rem] block  text-white  hover:text-primary-light"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li className="py-16 text-[2.5rem]">
                    <Link
                      href="#"
                      className=" text-[2.5rem] block  text-white  hover:text-primary-light "
                    >
                      Features
                    </Link>
                  </li>
                  <li className="py-16 text-[2.5rem]">
                    <Link
                      href="#"
                      className="  text-[2.5rem] hover:text-primary-light block  text-white    "
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
