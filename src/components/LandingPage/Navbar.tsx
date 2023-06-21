import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavigationMenu from "./NavigationMenu";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          scrollY >= 50 ? "shadow-md" : "shadow-none"
        } bg-primary-main  border-gray-200 fixed w-full top-0 h-[10rem] z-10 p-t-[2.3rem] p-b-[1.5rem]`}
      >
        <MobileNavbar toggle={toggle} isOpen={isOpen} />
        <div className="container-navbar custom-container w-full flex flex-wrap items-center justify-between pb-6 pt-8 mx-0">
          <a
            href="https://flowbite.com/"
            className="flex items-center p-t-[.3125rem] text-[1.25rem]"
          >
            <h1 className="self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
              DCP
            </h1>
          </a>

          <div className="flex md:hidden">
            <Link
              href="#"
              className="btnHoverEffect  w-40 text-white  text-center"
            >
              <button className="lg:hidden py-4 font-semibold text-center text-3xl rounded text-white">
                Login
              </button>
            </Link>
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
          </div>
          <NavigationMenu />
        </div>
      </nav>
    </>
  );
}
