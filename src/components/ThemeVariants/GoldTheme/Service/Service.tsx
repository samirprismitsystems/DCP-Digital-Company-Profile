import { ThemeContextApi } from "@/pages/[slug]";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import ServiceCard from "./Cards/ServiceCard";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Service() {
    const lstService = useContext(ThemeContextApi).service;
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
        nav: false,
        autoplayTimeout: 3000,
        smartSpeed: 1100,
    };

    if (!lstService) return null;
    return (
        <section className='py-24 bg-white'>
            <div className="container">
                <h2 className="uppercase text-center text-gold-primary my-16">Services</h2>
                {lstService.length > 0 && (
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstService.map((item, index) => (
                            <ServiceCard
                                key={index}
                                title={item.service_name}
                                desc={item.service_desc}
                                price={item.service_price}
                                srcPath={item.service_image}
                                companyID={item.company_id} />
                        ))}
                    </OwlCarousel>
                )}
            </div>
        </section>
    )
}
