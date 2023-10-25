import { useEffect } from 'react';
import GetInTouch from './component/GetInTouch/GetInTouch';
import Header from './component/Header/Header';
import Portfolio from './component/Portfolio/Portfolio';
import Products from './component/Products/Products';
import Services from './component/Services/Services';
import Testimonial from './component/Testimonial/Testimonial';
import styles from "./styles/platinum.module.scss";

export default function Platinum() {
    useEffect(() => {
        document.body.className = `${styles.platinum}`
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'platinumHtml'
    }, [])

    return (
        <>
            <Header />
            <Services />
            <Products />
            <Portfolio />
            <Testimonial />
            <GetInTouch />
        </>
    )
}
