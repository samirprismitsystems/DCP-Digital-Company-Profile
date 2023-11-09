import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import global from "../../styles/platinum.module.scss";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Portfolio() {
    const lstPortfolio = useContext(ThemeContextApi).portfolio;
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
        <>
            <section id="portfolio" className="blog_area bg-platinum-gray pt-platinum18 platinumLg:pt-platinum120">
                <div className="container">
                    <div className="flex items-center justify-center">
                        <div className="w-full lg:w-1/2">
                            <div className={`${global.section_title} text-center pb-6`}>
                                <h5 className={global.sub_title}>Gallery</h5>
                                <h4 className={global.main_title}>Our Gallery</h4>
                            </div>
                        </div>
                    </div>
                    {lstPortfolio.length > 0 && (
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {lstPortfolio.map((item, index: number) => (
                                <div key={index} className="w-full hover:cursor-pointer">
                                    <div className="single_blog mt-platinum8 rounded-xl bg-white transition-all duration-300 overflow-hidden ">
                                        <div className="m-platinum4 blog_image relative w-full h-full hover:shadow-xl">
                                            <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/portfolio/${item.portfolio_image}`} alt="blog" className="w-full rounded-xl h-full object-cover object-center max-h-[300px] min-h-[300px]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </section>
        </>
    )
}
