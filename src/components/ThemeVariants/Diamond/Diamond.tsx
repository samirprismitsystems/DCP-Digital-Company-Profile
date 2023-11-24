import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Map from "../Gold/Map/Map";
import ContactUs from "./components/ContactUs/ContactUs";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Portfolio from "./components/Portfolio/Portfolio";
import Products from "./components/Products/Products";
import Services from "./components/Services/Services";
import ShareCards from "./components/ShareCards/ShareCards";
import Testimonials from "./components/Testimonial/Testimonial";

export default function Diamond() {
    const objCompany = useContext(ThemeContextApi).company;

    useEffect(() => {
        document.body.className = 'dark:bg-black';
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'diamond'
    }, [])

    return (
        <>
            <Head>
                <title>{objCompany.company_slug}</title>
                <link rel="icon" type="image/x-icon" href={`${UPLOAD_IMAGE_URI}/${objCompany?.company_id || Utils.getCompanyID()}/logo/${objCompany?.company_logo}`} />
            </Head>
            <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
                <Header />
                <Hero />
                <Features />
                <Portfolio />
                <Services />
                <Products />
                <Testimonials />
                <ShareCards />
                <ContactUs />
                <div className="min-h-[400px] relative">
                    <Map height={'h-[400px] mx-[0px]'} />
                </div>
                <Footer />
            </ThemeProvider>
        </>
    )
}
