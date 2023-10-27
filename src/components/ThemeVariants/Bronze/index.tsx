import { useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Products from "./components/Products/Products";
import ContactUs from "./components/ContactUs/ContactUs";

export default function Bronze() {
    useEffect(() => {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'bronze'
    }, [])

    return (
        <div id="main" className="relative">    
            <Hero />
            <Services/>
            <Gallery/>
            <Products/>
            <ContactUs/>
        </div>
    )
}
