import Head from 'next/head';
import { useEffect } from 'react';
import Header from './component/Header/Header';

export default function Platinum() {

    useEffect(() => {
        document.body.className = `platinum`
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
        </>
    )
}
