import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

export default function AppBar() {
    const objCompany = useContext(ThemeContextApi).company;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    console.log(isOpen)

    return (
        <>
            <div id="home" className="appBar w-full py-6 sm:py-5">
                <div className="appBarContent container flex items-center justify-between">
                    <div>
                        <a href="/">
                            <img src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/logo/${objCompany.company_logo}`} className="xs:h-platinum10 md:h-28" alt="logo image" />
                        </a>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex items-center">

                            <li className="group pl-6" onClick={() => {
                                Utils.scrollToView('home')
                            }}>
                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Home</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>
                            <li className="group pl-6" onClick={() => {
                                Utils.scrollToView('about')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >About</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6" onClick={() => {
                                Utils.scrollToView('services')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Services</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6" onClick={() => {
                                Utils.scrollToView('portfolio')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Portfolio</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6" onClick={() => {
                                Utils.scrollToView('contact')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Contact</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li >

                        </ul >
                    </div >
                    <div className="block lg:hidden ">
                        <button onClick={toggle}>
                            <FontAwesomeIcon icon={faBars} className="text-[3rem] text-white" />
                        </button>
                    </div >
                </div >
                <div className={`top-0 right-0 transition-all duration-500 ease-in fixed z-10 ${isOpen ? 'p-4 w-[300px]' : 'w-0'} bg-bronze-primary h-screen z-[9999]`}>
                    <div className="text-right">
                        <button onClick={toggle}>
                            <FontAwesomeIcon icon={faClose} className="text-[4rem] m-4 text-white" />
                        </button>
                    </div>
                    <div className="container">
                        <ul className="flex items-start justify-center flex-col">
                            <li className="group pl-6 mb-8 " onClick={() => {
                                Utils.scrollToView('home')
                            }}>
                                <span
                                    className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                >Home</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>
                            <li className="group pl-6 mb-8 " onClick={() => {
                                Utils.scrollToView('about')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                >About</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6 mb-8 " onClick={() => {
                                Utils.scrollToView('services')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                >Services</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6 mb-8 " onClick={() => {
                                Utils.scrollToView('portfolio')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                >Portfolio</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li>

                            <li className="group pl-6 mb-8 " onClick={() => {
                                Utils.scrollToView('contact')
                            }}>

                                <span
                                    className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-white"
                                >Contact</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow-200"
                                ></span>
                            </li >

                        </ul >  
                    </div>
                </div>
            </div >
        </>
    )
}
