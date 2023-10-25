import { useEffect } from 'react';
import GetInTouch from './component/GetInTouch/GetInTouch';
import Header from './component/Header/Header';
import Portfolio from './component/Portfolio/Portfolio';
import Products from './component/Products/Products';
import Services from './component/Services/Services';
import Testimonial from './component/Testimonial/Testimonial';
import styles from "./styles/platinum.module.scss";
import ContactInfo from './component/ContactUs/ContactInfo';
import Footer from '../Gold/Footer/Footer';
import Cards from './component/Cards/Cards';

export default function Platinum() {
    useEffect(() => {
        document.body.className = `${styles.platinum}`
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'platinumHtml'
    }, [])

    return (
        <>
            <Header />
            <Cards/>
            <Services />
            <Products />
            <Portfolio />
            <Testimonial />
            <ContactInfo/>
            <Footer/>
        </>
    )
}
