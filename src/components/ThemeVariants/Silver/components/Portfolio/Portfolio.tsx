import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Portfolio() {
    const lstPortfolio = useContext(ThemeContextApi).portfolio;
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
        loop: false,
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
            <div id="portfolio">
                <div className='container w-full min-w-7xl pt-48 px-4 lg:px-8'>
                    <div className="sm:flex justify-between items-center">
                        <h1 className='text-silver-midnightblue  font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>Portfolio</h1>
                    </div>
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstPortfolio.map((item, index: number) => {
                            return (
                                <div key={index} className='w-full'>
                                    <div className='bg-white m-3 shadow-md rounded-2xl'>
                                        <div className="relative h-[300px] rounded-3xl">
                                            <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/portfolio/${item.portfolio_image}`} alt="gaby" className="m-auto h-full w-full object-cover object-center" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </OwlCarousel>
                </div>
            </div>
        </>
    )
}
