import { useEffect } from "react";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Services from "./components/Services/Services";

export default function Bronze() {
    useEffect(() => {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'bronze'
    }, [])

    return (
        <div id="main" className="relative">
            <Hero />
            <AboutUs />
            <Services />
            <Gallery />
            <Products />
            <ContactUs />
            <Footer />
        </div>
    )
}
