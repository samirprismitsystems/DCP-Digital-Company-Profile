import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

/* eslint-disable react/no-unescaped-entities */
export default function Gallery() {
    const lstGallery = useContext(ThemeContextApi).portfolio;

    const [slidesToShow, setSlidesToShow] = useState<number>(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 620) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 950) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 2000) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const options = {
        loop: true,
        items: slidesToShow,
        autoplay: false,
        dots: true,
        margin: 15,
        nav: false,
        autoplayTimeout: 3000,
        smartSpeed: 1100,
    };

    return (
        <>
            <div className="container py-[64px] px-[16px] md:py-[80px]" id="portfolio">
                <h2
                    className="font-header text-[2.5rem] text-center font-header font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                >
                    Check out our Portfolio
                </h2>
                <h3
                    id="portfolio"
                    className="pt-6 text-center font-header text-[1.8rem] font-medium text-black sm:text-[2rem] lg:text-[2.3rem]"
                >
                    Here's what We have done with the past
                </h3>

                <OwlCarousel className="owl-carousel owl-theme" {...options}>
                    {lstGallery && lstGallery.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="mx-auto w-full relative h-[300px] transform transition-all hover:scale-105 md:mx-0"
                        >
                            <img
                                src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/portfolio/${item.portfolio_image}`}
                                className="w-full shadow object-cover object-center align-middle h-full"
                                alt="portfolio image"
                            />
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </>
    )
}
