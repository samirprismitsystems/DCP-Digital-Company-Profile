import { ThemeContextApi } from "@/pages/[slug]";
import { useContext, useEffect } from "react";
import ContactUs from "../../Gold/ContactUs/ContactUs";
import GetFeedBack from "../../Gold/GetFeedBack/GetFeedBack";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Portfolio from "./Portfolio/Portfolio";
import Products from "./Products/Product";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";
import Footer from "../../Bronze/components/Footer/Footer";

const Silver = () => {
    const objCompany = useContext(ThemeContextApi).company;

    useEffect(() => {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'silver'
    }, [])

    return (
        <>
            <Header />
            <Hero />
            <Products />
            <Services />
            <Portfolio />
            <Testimonial />
            <GetFeedBack />
            <ContactUs submitButtonStyle={'bg-silver-Blueviolet text-white'} placeHolderColor={'placeholder:text-black focus-within:outline-none'} />
            <Footer bgColor={'bg-silver-Blueviolet'}/>
        </>
    )
}

export default Silver
