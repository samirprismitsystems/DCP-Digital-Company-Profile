import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faDribbble, faFacebookSquare, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import AppBar from "./AppBar/AppBar";

export default function Hero() {
    const objItem = useContext(ThemeContextApi).company;

    return (
        <>
            <div className="hero">
                <AppBar />
                <div
                    className="container relative z-30 heroContent py-[200px]"
                >
                    <div className="flex flex-col items-center justify-center lg:flex-row">
                        <div className="border-8 border-bronze-primary shadow-xl mr-12 relative">
                            <img
                                src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/logo/${objItem.company_logo}`}
                                className="p-6 h-full w-full object-cover object-center align-middle"
                                alt="author"
                            />
                        </div>
                        <div className="pt-8 xs:pt-12 sm:pt-10 lg:pl-8 lg:pt-0">
                            <h1
                                className="text-center font-header text-[4.25rem] text-white sm:text-center sm:text-[6rem] md:text-[5.75rem] lg:text-left leading-normal"
                            >
                                {Utils.getContent(objItem.company_name)}
                            </h1>
                            <div
                                className="flex flex-col justify-center xs:pt-4 md:pt-3 sm:flex-row sm:pt-5 lg:justify-start"
                            >
                                <div
                                    className="flex items-center justify-center pl-0 sm:justify-start md:pl-1"
                                >
                                    <p className="font-body text-[2.2rem] md:text-[1.8rem] uppercase text-white">Let's connect</p>
                                    <div className="hidden sm:block">
                                        <FontAwesomeIcon icon={faChevronRight} className="text-3xl text-yellow-200 px-4" />
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0"
                                >
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faFacebookSquare} className="px-2 text-[2.4rem] text-white hover:text-yellow-200" />
                                    </Link>
                                    <Link href="/" className="pl-4">
                                        <FontAwesomeIcon icon={faTwitter} className="px-2 text-[2.4rem] text-white hover:text-yellow-200" />
                                    </Link>
                                    <Link href="/" className="pl-4">
                                        <FontAwesomeIcon icon={faDribbble} className="px-2 text-[2.4rem] text-white hover:text-yellow-200" />
                                    </Link>
                                    <Link href="/" className="pl-4">
                                        <FontAwesomeIcon icon={faLinkedinIn} className="px-2 text-[2.4rem] text-white hover:text-yellow-200" />
                                    </Link>
                                    <Link href="/" className="pl-4">
                                        <FontAwesomeIcon icon={faInstagram} className="px-2 text-[2.4rem] text-white hover:text-yellow-200" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
