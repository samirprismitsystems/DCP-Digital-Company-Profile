import Head from 'next/head';
import { useEffect } from 'react';
import GetInTouch from './component/GetInTouch/GetInTouch';
import Header from './component/Header/Header';
import Products from './component/Products/Products';
import Services from './component/Services/Services';
import styles from "./styles/platinum.module.scss";

export default function Platinum() {

    useEffect(() => {
        document.body.className = `${styles.platinum}`
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.className = 'platinumHtml'
    }, [])

    return (
        <>
            <Head>
                <title>Plain - Multipurpose TailwindCSS Template</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="assets/images/favicon.png" type="image/png" />
            </Head>
            <Header />
            <Services />
            <Products />
            <GetInTouch />
        </>
    )
}
