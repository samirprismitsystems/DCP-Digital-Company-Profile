import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext } from "react";

export default function AppBar() {
    const objCompany = useContext(ThemeContextApi).company;

    return (
        <>
            <div className="appBar w-full py-3 sm:py-5">
                <div className="container flex items-center justify-between">
                    <div>
                        <a href="/">
                            <img src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/logo/${objCompany.company_logo}`} className="h-28" alt="logo image" />
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
                    <div className="block lg:hidden">
                        <button>
                            <i className="bx bx-menu text-4xl text-white"></i>
                        </button>
                    </div >
                </div >
            </div >
        </>
    )
}
