import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { navList } from "./data/data";

export default function AppBar() {
    const objCompany = useContext(ThemeContextApi).company;
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('home');

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleResize = () => {
            const scrollTop = window.scrollY;

            if (scrollTop < 50) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }

            console.log(scrollTop)
            const options: any = {
                home: 0,
                about: 655,
                products: 1420,
                services: 2344,
                contact: 3460,
            }

            for (let item in options) {
                const currentItem = options[item]
                if (scrollTop > currentItem) {
                    setActiveSection(item)
                }
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
            <div id="home" className={`appBar ${!isActive ? "bg-bronze-primary shadow-lg" : "bg-transparent shadow-none"} fixed w-full py-6 sm:py-5 z-50 shadow-none top-0`}>
                <div className="container">
                    <div className="appBarContent flex items-center justify-between">
                        <div className="hover:cursor-pointer" onClick={() => {
                            Utils.scrollToView('home')
                        }}>
                            <img src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/logo/${objCompany.company_logo}`} className="xs:h-platinum10 md:h-28" alt="logo image" />
                        </div>
                        <div className="hidden lg:block">
                            <ul className="flex items-center">
                                {navList.map((item) => (
                                    <li key={item.id} className="group pl-12" onClick={() => {
                                        if (item.link === 'products') {
                                            Utils.scrollToView(item.link, 50)
                                        } else {
                                            Utils.scrollToView(item.link, 150)
                                        }
                                    }}>
                                        <span
                                            className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                        >{item.name}</span>

                                        <span
                                            className={`block h-0.5 w-full bg-transparent group-hover:bg-yellow-200 ${activeSection === item.link ? "bg-yellow-200" : ""}`}
                                        ></span>
                                    </li>
                                ))}
                            </ul >
                        </div >
                        <div className="block lg:hidden ">
                            <button onClick={toggle}>
                                <FontAwesomeIcon icon={faBars} className="text-[3rem] text-white" />
                            </button>
                        </div >
                    </div>
                </div>
                <div className={`top-0 right-0 transition-all duration-500 ease-in fixed z-10 ${isOpen ? 'p-4 w-[300px]' : 'w-0'} bg-bronze-primary h-screen z-[9999]`}>
                    <div className="text-right">
                        <button onClick={toggle}>
                            <FontAwesomeIcon icon={faClose} className="text-[4rem] m-4 text-white" />
                        </button>
                    </div>
                    <div className="container">
                        <ul className="flex items-start justify-center flex-col">

                            {navList.map((item) => (
                                <li key={item.id} className="group pl-6 mb-12 " onClick={() => {
                                    if (item.link === 'products') {
                                        Utils.scrollToView(item.link)
                                    } else {
                                        Utils.scrollToView(item.link, 150)
                                    }
                                }}>
                                    <span
                                        className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                    >{item.name}</span>

                                    <span
                                        className={`block h-0.5 w-full bg-transparent ${activeSection === item.link ? "bg-yellow-200" : ""}`}
                                    ></span>
                                </li>
                            ))}
                        </ul >
                    </div>
                </div>
            </div >
        </>
    )
}
