import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import { lstNavigation } from "./data/data";

export default function AppBar() {
    const objItem = useContext(ThemeContextApi).company;
    const [value, setValue] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeSection, setActiveSection] = useState('home');

    const toggle = () => {
        setIsActive(!isActive)
    }


    useEffect(() => {
        const handleResize = () => {
            const scrollTop = window.scrollY;

            if (scrollTop < 50) {
                setValue(true);
            } else {
                setValue(false);
            }

            const options: any = {
                home: 0,
                services: isMobileView ? 1800 : 1340,
                products: 2577,
                portfolio: 3550,
                contact: 4750,
            }

            for (let item in options) {
                let currentView = options[item];
                if (scrollTop > currentView) {
                    setActiveSection(item as any)
                }
            }
        };

        const handleWidth = () => {
            if (window.innerWidth < 530) {
                setIsMobileView(true)
            }

            if (window.innerWidth > 530) {
                setIsMobileView(false)
            }

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
                                <div className="navbar-brand hover:cursor-pointer mr-platinum5" onClick={() => {
                                    Utils.scrollToView('home')
                                }}>
                                    <img className="h-platinum10" src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/logo/${objItem.company_logo}`} alt="Logo" />
                                </div>
                                <button onClick={toggle} className={`navbar-toggler focus:outline-none block platinumLg:hidden ${isActive ? 'active' : ''}`} type="button">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                {!isActive && (
                                    <div className={`absolute left-0 z-20 w-full hidden px-platinum5 py-platinum3 duration-300 bg-white platinumLg:w-auto navbar-collapse platinumLg:block top-full mt-full platinumLg:static platinumLg:bg-transparent shadow platinumLg:shadow-none ${isActive && 'w-full'}`} id="navbarOne">
                                        <ul id="nav" className="items-center content-start mr-auto platinumLg:justify-end navbar-nav platinumLg:flex">
                                            {lstNavigation.map((item, index: number) => (
                                                <li key={index} className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12 hover:text-platinum-theme-color">
                                                    <span className={`page-scroll py-platinum1 ${activeSection === item.link ? 'platinumNavActiveItem' : ""}`} onClick={() => {
                                                        setSelectedIndex(index)
                                                        Utils.scrollToView(item.link, 80)
                                                    }}>{item.name}</span>
                                                </li>
                                            ))}
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
                            {lstNavigation.map((item, index: number) => (
                                <li key={index} className="nav-item hover:cursor-pointer py-platinum2 ml-platinum5 platinumLg:ml-platinum12 ">
                                    <span className={`page-scroll py-platinum1 ${activeSection === item.link ? 'platinumNavActiveItem' : ""}`} onClick={() => {
                                        setSelectedIndex(index)
                                        Utils.scrollToView(item.link, 80)
                                        toggle();
                                    }}>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}
