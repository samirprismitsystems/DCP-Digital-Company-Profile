import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistance } from 'date-fns';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Testimonial() {
    const lstTestimonial = useContext(ThemeContextApi).testimonial;
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
            <div id="testimonial">
                <div className='container w-full min-w-7xl pt-48 px-4 lg:px-8'>
                    <div className="sm:flex justify-between items-center">
                        <h1 className='text-silver-midnightblue  font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>Testimonial</h1>
                    </div>
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstTestimonial.map((item, index: number) => {
                            return (
                                <div key={index} className='w-full'>
                                    <div className={`bg-silver-white m-4 p-5 my-20 relative ${index % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                                        <div className='h-[150px]'>
                                            <h4 className='text-2xl leading-normal font-normal text-silver-darkgray my-4'>{Utils.getContent(item.comment)}</h4>
                                        </div>
                                        <hr style={{ color: "#D7D5D5" }} />
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className='text-2xl font-medium text-silver-darkbrown pt-4 pb-2'>{Utils.getContent(item.client_name)}</h3>
                                                <h3 className='text-2xl font-normal text-silver-lightgray pb-2'>{Utils.getContent(item.email_address)}</h3>
                                            </div>
                                            <div className="flex flex-wrap justify-end items-start">
                                                {item.ratting && parseInt(item.ratting) > 1 && (
                                                    Array.from({ length: parseInt(item.ratting) }).map((_, item: any) => {
                                                        return (
                                                            <div
                                                                key={item}
                                                                className="stars flex flex-wrap justify-start items-start"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className="text-yellow-500 w-8 h-8 mt-2"
                                                                />
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
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
