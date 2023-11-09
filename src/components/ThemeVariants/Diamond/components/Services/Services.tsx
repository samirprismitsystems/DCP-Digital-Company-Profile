import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import SectionTitle from '../Features/SectionTitle';
import SingleService from './SingleService';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Services() {
    const lstServices = useContext(ThemeContextApi).service;
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
            <section className="bg-primary/5 py-16 md:py-20 lg:py-28">
                <div className="container" id="services" >
                    <SectionTitle
                        title="Our Services"
                        center
                    />
                    {lstServices && lstServices.length <= 6 && (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
                            {lstServices.map((item, index: number) => (
                                <SingleService key={index} desc={item.service_desc} image={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} title={item.service_name} />
                            ))}
                        </div>
                    )}
                    {lstServices && lstServices.length >= 7 && (
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {lstServices.map((item, index: number) => {
                                return (
                                    <SingleService key={index} desc={item.service_desc} image={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} title={item.service_name} />
                                )
                            })
                            }
                        </OwlCarousel>
                    )}
                </div>
            </section>
        </>
    )
}
