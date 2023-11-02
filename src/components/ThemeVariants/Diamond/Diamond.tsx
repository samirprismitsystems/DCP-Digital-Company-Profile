import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import ContactUs from "./components/ContactUs/ContactUs";
import Features from "./components/Features/Features";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Portfolio from "./components/Portfolio/Portfolio";
import Products from "./components/Products/Products";
import Services from "./components/Services/Services";
import Testimonials from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import ShareCards from "./components/ShareCards/ShareCards";

export default function Diamond() {
    useEffect(() => {
        document.body.className = 'dark:bg-black';
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'diamond'
    }, [])

    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <Header />
            <Hero />
            <Features />
            <Portfolio />
            <Services />
            <Products />
            <Testimonials />
            <ShareCards/>
            <ContactUs />
            <Footer />
        </ThemeProvider>
    )
}
