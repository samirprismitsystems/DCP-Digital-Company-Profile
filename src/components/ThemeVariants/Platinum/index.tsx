import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import Footer from '../Gold/Footer/Footer';
import BottomToTop from './component/BottomToTop/BottomToTop';
import Cards from './component/Cards/Cards';
import ContactInfo from './component/ContactUs/ContactInfo';
import Header from './component/Header/Header';
import Portfolio from './component/Portfolio/Portfolio';
import Products from './component/Products/Products';
import Services from './component/Services/Services';
import Testimonial from './component/Testimonial/Testimonial';
import styles from "./styles/platinum.module.scss";
import Map from '../Gold/Map/Map';

export default function Platinum() {
    const objCompany = useContext(ThemeContextApi).company;

    useEffect(() => {
        document.body.className = `${styles.platinum}`
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'platinumHtml'
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
            <Header />
            <Cards />
            <Services />
            <Products />
            <Portfolio />
            <Testimonial />
            <ContactInfo />
            <div className="min-h-[400px] relative -z-[1]">
                <Map height={'h-[400px] mx-[0px]'} />
            </div>
            <Footer />
        </>
    )
}
