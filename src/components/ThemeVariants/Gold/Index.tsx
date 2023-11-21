import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AboutUs from './AboutUs/AboutUs';
import AppBar from './Appbar/AppBar';
import BottomToTop from './BottomToTop/BottomToTop';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import Gallery from './Gallery/Gallery';
import Hero from './HeroSection/Hero';
import Product from './Product/Product';
import Review from './Review/Review';
import Service from './Service/Service';
import ShareCards from './ShareCards/ShareCards';

export default function Gold() {
    const objCompany = useContext(ThemeContextApi).company;

    useEffect(() => {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'goldHtml'
    }, [])

    return (
        <>
            <Head>
                <title>{objCompany.company_slug}</title>
                <link rel="icon" type="image/x-icon" href={`${UPLOAD_IMAGE_URI}/${objCompany?.company_id || Utils.getCompanyID()}/logo/${objCompany?.company_logo}`} />
            </Head>
            <div className="absolute z-[12000]">
                <BottomToTop />
            </div>
            <AppBar />
            <Hero />
            <AboutUs />
            <ShareCards />
            <Product />
            <Service />
            <Gallery />
            <Review />
            <ContactUs />
            <Footer />
        </>
    );
}
