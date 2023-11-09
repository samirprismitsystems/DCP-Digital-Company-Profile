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
<<<<<<< HEAD
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
                <div className="min-h-[400px] relative -z-[1]">
                    <Map height={'h-[400px] mx-[0px]'} />
                </div>
                <Footer />
            </div>
        </>
=======
        <div id="main" className="relative">
            <Hero />
            <AboutUs />
            <Services />
            <Gallery />
            <Products />
            <ContactUs />
            <Footer />
        </div>
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
    )
}
