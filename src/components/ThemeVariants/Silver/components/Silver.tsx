import { ThemeContextApi } from "@/pages/[slug]";
import { useContext, useEffect } from "react";
import Footer from "../../Bronze/components/Footer/Footer";
import ContactUs from "../../Gold/ContactUs/ContactUs";
import GetFeedBack from "../../Gold/GetFeedBack/GetFeedBack";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Portfolio from "./Portfolio/Portfolio";
import Products from "./Products/Product";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";

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
            <ContactUs removeCardsBorder={true} submitButtonStyle={'bg-silver-common text-white'} placeHolderColor={'placeholder:text-black focus-within:outline-none'} />
            <Footer bgColor={'bg-silver-common'} />
        </>
    )
}

export default Silver
