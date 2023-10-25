import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function AppBar() {
    const objItem = useContext(ThemeContextApi).company;
    const [value, setValue] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.scrollY < 50) {
                setValue(true);
            } else {
                setValue(false);
            }
        };

        const handleWidth = () => {
            if (window.innerWidth > 950) {
                setIsActive(false);
            }
        };

        handleWidth()
        handleResize();

        window.addEventListener("scroll", handleResize);
        window.addEventListener("resize", handleWidth);

        return () => {
            window.removeEventListener("scroll", handleResize);
            window.removeEventListener("resize", handleWidth);
        };
    }, [])

    return (
        <>
            <div id="home" className={`navbar-area ${!value ? "shadow-md" : ""} bg-white fixed top-platinum0 left-platinum0 w-full z-20`}>
                <div className="container relative">
                    <div className="row items-center">
                        <div className="w-full">
                            <nav className={`flex items-center justify-between py-platinum4 navbar navbar-expand-lg`}>
                                <Link className="navbar-brand mr-platinum5" href="/">
                                    <img className="h-platinum10" src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/logo/${objItem.company_logo}`} alt="Logo" />
                                </Link>
                                <button onClick={toggle} className={`navbar-toggler focus:outline-none block platinumLg:hidden ${isActive ? 'active' : ''}`} type="button">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                {!isActive && (
                                    <div className={`absolute left-0 z-20 w-full hidden px-platinum5 py-platinum3 duration-300 bg-white platinumLg:w-auto navbar-collapse platinumLg:block top-full mt-full platinumLg:static platinumLg:bg-transparent shadow platinumLg:shadow-none ${isActive && 'w-full'}`} id="navbarOne">
                                        <ul id="nav" className="items-center content-start mr-auto platinumLg:justify-end navbar-nav platinumLg:flex">
                                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                                <span className="page-scroll py-platinum1 active" onClick={() => {
                                                    Utils.scrollToView('home')
                                                }}>Home</span>
                                            </li>
                                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                                <span onClick={() => {
                                                    Utils.scrollToView('about')
                                                }} className="page-scroll py-platinum1">About</span>
                                            </li>
                                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                                <span onClick={() => {
                                                    Utils.scrollToView('services')
                                                }} className="page-scroll py-platinum1">Service</span>
                                            </li>
                                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                                <span onClick={() => {
                                                    Utils.scrollToView('portfolio')
                                                }} className="page-scroll py-platinum1">Portfolio</span>
                                            </li>
                                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                                <span onClick={() => {
                                                    Utils.scrollToView('contact')
                                                }} className="page-scroll py-platinum1">Contact</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
                {isActive && (
                    <div className={`absolute left-0 z-20 w-full px-platinum5 py-platinum3 duration-300 bg-white platinumLg:w-auto navbar-collapse platinumLg:block top-full mt-full platinumLg:static platinumLg:bg-transparent shadow platinumLg:shadow-none ${isActive && 'w-full'}`} id="navbarOne">
                        <ul id="nav" className="items-center content-start mr-auto platinumLg:justify-end navbar-nav flex-col justify-center flex platinumSm:flex-row platinumSm:justify-center">
                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                <span className="page-scroll py-platinum1 active" onClick={() => {
                                    Utils.scrollToView('home')
                                }}>Home</span>
                            </li>
                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                <span onClick={() => {
                                    Utils.scrollToView('about')
                                }} className="page-scroll py-platinum1">About</span>
                            </li>
                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                <span onClick={() => {
                                    Utils.scrollToView('services')
                                }} className="page-scroll py-platinum1">Service</span>
                            </li>
                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                <span onClick={() => {
                                    Utils.scrollToView('portfolio')
                                }} className="page-scroll py-platinum1">Portfolio</span>
                            </li>
                            <li className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12">
                                <span onClick={() => {
                                    Utils.scrollToView('contact')
                                }} className="page-scroll py-platinum1">Contact</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}
