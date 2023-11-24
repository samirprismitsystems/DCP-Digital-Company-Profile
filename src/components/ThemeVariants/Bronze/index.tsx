import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Map from "../Gold/Map/Map";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Services from "./components/Services/Services";

export default function Bronze() {
    const objCompany = useContext(ThemeContextApi).company;

    useEffect(() => {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'bronze'
    }, [])

    return (
        <>
            <Head>
                <title>{objCompany.company_slug}</title>
                <link rel="icon" type="image/x-icon" href={`${UPLOAD_IMAGE_URI}/${objCompany?.company_id || Utils.getCompanyID()}/logo/${objCompany?.company_logo}`} />
            </Head>

            <div id="main" className="relative">
                <Hero />
                <AboutUs />
                <Products />
                <Services />
                <Gallery />
                <ContactUs />
                <div className="min-h-[400px] relative">
                    <Map height={'h-[400px] mx-[0px]'} />
                </div>
                <Footer />
            </div>
        </>
    )
}
