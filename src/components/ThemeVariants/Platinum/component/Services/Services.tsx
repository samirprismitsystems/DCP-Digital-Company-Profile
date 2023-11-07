import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import global from "../../styles/platinum.module.scss";
import styles from "./styles/services.module.scss";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Services() {
    const lstService = useContext(ThemeContextApi).service;
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

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

    return (
        <section id="services" className="bg-platinum-gray services_area pt-platinum120 pb-platinum120">
            <div className="container">
                <div className="flex items-center justify-center">
                    <div className="w-full">
                        <div className={`${global.section_title} text-center pb-platinum6`}>
                            <h5 className={global.sub_title}>What We Do</h5>
                            <h4 className={global.main_title}>Our Services</h4>
                        </div>
                    </div>
                </div>
                <div className="xs:hidden md:grid platinumSm:grid-cols-1 platinumMd:grid-cols-2 platinumXl:grid-cols-3 gap-8">
                    {lstService && lstService.map((item, index: number) => (
                        <div className="w-full" key={index}>
                            <div className={`${styles.single_services} text-center mt-platinum8 mx-platinum3`}>
                                <div className={`${styles.services_icon} flex items-center justify-center`}>
                                    <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} className={`${styles.services_shape} transition-all duration-300 ease-in`} alt=""/>
                                </div>
                                <div className="services_content mt-platinum5 platinumXl:mt-platinum10">
                                    <h3 className="services_title text-black font-semibold text-3xl platinumMd:text-2xl platinumLg:text-xl platinumXl:text-3xl">{Utils.getContent(item.service_name)}</h3>
                                    <p className="mt-platinum4 overflow-y-auto  h-[80px]">{Utils.getContent(item.service_desc)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="xs:block md:hidden w-full">
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstService && lstService.map((item, index: number) => (
                            <div className="w-full" key={index}>
                                <div className={`${styles.single_services} text-center mt-platinum8 mx-platinum3`}>
                                    <div className={`${styles.services_icon} flex items-center justify-center`}>
                                        <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} className={`${styles.services_shape} transition-all duration-300 ease-in`} alt=""/>
                                    </div>
                                    <div className="services_content mt-platinum5 platinumXl:mt-platinum10">
                                        <h3 className="services_title text-black font-semibold text-3xl platinumMd:text-2xl platinumLg:text-xl platinumXl:text-3xl">{Utils.getContent(item.service_name)}</h3>
                                        <p className="mt-platinum4 overflow-y-auto min-h-[150px] max-h-[150px]">{Utils.getContent(item.service_desc)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </section>
    )
}
