import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import ProductDesc from '../Products/ProductDesc';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Services() {
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
            <div id="services">
                <div className='container w-full min-w-7xl pt-48 px-4 lg:px-8'>
                    <div className="sm:flex justify-between items-center">
                        <h1 className='text-silver-midnightblue  font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>Services</h1>
                    </div>
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstService.map((item, index: number) => {
                            return (
                                <div key={index} className='w-full'>
                                    <div className='bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-md rounded-2xl'>
                                        <div className="relative h-[300px] rounded-3xl">
                                            <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} alt="gaby" className="m-auto h-full w-full object-cover object-center  clipPath" />
                                        </div>
                                        <div className="px-3">
                                            <h4 className='text-3xl font-bold pt-6 text-black'>{item.service_name}</h4>
                                            <ProductDesc product_desc={item.service_desc} />
                                            <hr style={{ color: "#C4C4C4" }} />
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
