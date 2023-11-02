"use client";
import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ThemeToggler from "../../common/ThemeToggler";
import { menuData } from "../../data/data";

const Header = () => {
    const objCompany = useContext(ThemeContextApi).company;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    return (
        <>
            <header
                className={`header top-0 left-0 z-40 flex w-full items-center bg-diamond-transparent ${sticky
                    ? "!fixed !z-[9999] !bg-diamond-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-diamond-primary dark:!bg-opacity-20"
                    : "absolute"
                    }`}
            >
                <div className="container">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-60 max-w-full px-4 diamondXl:mr-12">
                            <Link
                                href="/"
                                className={`header-logo block w-full ${sticky ? "py-5 diamondLg:py-2" : "py-8"
                                    } `}
                            >
                                <Image
                                    src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/logo/${objCompany.company_logo}`}
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    className="h-16"
                                />
                            </Link>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick={navbarToggleHandler}
                                    id="navbarToggler"
                                    aria-label="Mobile Menu"
                                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 diamondLg:hidden"
                                >
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px] rotate-45" : " "
                                            }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                                            }`}
                                    />
                                    <span
                                        className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                                            }`}
                                    />
                                </button>
                                <nav
                                    id="navbarCollapse"
                                    className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-diamond-dark diamondLg:visible diamondLg:static diamondLg:w-auto diamondLg:border-none diamondLg:!bg-transparent diamondLg:p-0 diamondLg:opacity-100 ${navbarOpen
                                        ? "visibility top-full opacity-100"
                                        : "invisible top-[120%] opacity-0"
                                        }`}
                                >
                                    <ul className="block diamondLg:flex diamondLg:space-x-12">
                                        {menuData.map((menuItem, index) => (
                                            <li key={menuItem.id} className="group relative">
                                                {menuItem.path && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            Utils.scrollToView(menuItem.path)
                                                        }}
                                                        className={`flex py-2 text-base text-diamond-dark group-hover:opacity-70 diamondLg:dark:text-white dark:text-white diamondLg:mr-0 diamondLg:inline-flex diamondLg:py-6 diamondLg:px-0`}
                                                    >
                                                        {menuItem.title}
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            <div className="flex items-center justify-end pr-16 diamondLg:pr-0">
                                <div>
                                    <ThemeToggler />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
