import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import styles from "./styles/appBar.module.scss";

export default function AppBar() {
    const objItem = useContext(ThemeContextApi).company;
    const [value, setValue] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            if (window.scrollY < 50) {
                setValue(true);
            } else {
                setValue(false);
            }
        };

        handleResize();
        window.addEventListener("scroll", handleResize);

        return () => {
            window.removeEventListener("scroll", handleResize);
        };
    }, [])

    return (
        <>
            <div className={`navbar-area ${!value ? "shadow-md" : ""} bg-white fixed top-platinum0 left-platinum0 w-full z-20 ${styles.appBarEffect}`}>
                <div className="container relative">
                    <div className="row items-center">
                        <div className="w-full">
                            <nav className="flex items-center justify-between py-platinum4 navbar navbar-expand-lg">
                                <a className="navbar-brand mr-platinum5" href="/">
                                    <img className="h-platinum10" src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/logo/${objItem.company_logo}`} alt="Logo" />
                                </a>
                                <button className="text-[2rem] block platinumLg:hidden text-red-500" type="button">
                                    done
                                </button>
                                <div className="absolute left-0 z-20 hidden w-full px-platinum5 py-platinum3 duration-300 bg-white platinumLg:w-auto navbar-collapse platinumLg:block top-full mt-full platinumLg:static platinumLg:bg-transparent shadow platinumLg:shadow-none" id="navbarOne">
                                    <ul id="nav" className="items-center content-start mr-auto platinumLg:justify-end navbar-nav platinumLg:flex">
                                        <li className="nav-item py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1 active" href="#home">Home</a>
                                        </li>
                                        <li className="nav-item py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#about">About</a>
                                        </li>
                                        <li className="nav-item py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#services">Service</a>
                                        </li>
                                        <li className="nav-item py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#work">Portfolio</a>
                                        </li>
                                        <li className="nav-item py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#contact">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
