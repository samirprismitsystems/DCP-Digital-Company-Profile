import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import SectionTitle from "../Features/SectionTitle";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});


const Testimonials = () => {
    const lstTestimonial = useContext(ThemeContextApi).testimonial;
    const starIcon = (
        <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
        </svg>
    );

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

    const getStars = (ratting: any) => {
        let ratingIcons = [];
        for (let starItem = 0; starItem < Number(ratting); starItem++) {
            ratingIcons.push(
                <span key={starItem} className="text-yellow-400">
                    {starIcon}
                </span>
            );
        }

        return ratingIcons
    }

    return (
        <>

            <section className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28">
                <div className="container">
                    <SectionTitle
                        title="What Our Users Says"
                        center
                    />

                    {lstTestimonial && lstTestimonial.length <= 3 && (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                            {lstTestimonial.map((item, index: number) => {
                                let ratingIcons = [];
                                for (let starItem = 0; starItem < Number(item.ratting); starItem++) {
                                    ratingIcons.push(
                                        <span key={starItem} className="text-yellow-400">
                                            {starIcon}
                                        </span>
                                    );
                                }

                                return (
                                    <div className="w-full h-full min-h-[300px]" key={index}>
                                        <div
                                            className="wow fadeInUp rounded-md bg-gray-50 p-8 shadow-one dark:bg-[#1D2144] diamondLg:px-5 diamondXl:px-8 h-full"
                                            data-wow-delay=".1s"
                                        >
                                            <div className="mb-5 flex items-center space-x-1">
                                                {ratingIcons}
                                            </div>
                                            <p className="mb-8 border-b border-diamond-body-color border-opacity-10 pb-8 text-base leading-relaxed text-diamond-body-color dark:border-diamond-white dark:border-opacity-10 dark:text-diamond-white min-h-[200px]">
                                                {item.comment && `“${Utils.getContent(item.comment)}`}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="w-full">
                                                    <h5 className="mb-1 text-lg font-semibold text-dark dark:text-diamond-white diamondLg:text-base diamondXl:text-lg">
                                                        {Utils.getContent(item.client_name)}
                                                    </h5>
                                                    <p className="text-sm text-diamond-body-color">{Utils.getContent(item.email_address)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {lstTestimonial && lstTestimonial.length >= 4 && (
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {lstTestimonial.map((item, index: number) => {
                                return (
                                    <div className="w-full h-full min-h-[300px] p-4" key={index}>
                                        <div
                                            className="wow fadeInUp rounded-md bg-gray-50 p-8 shadow-one dark:bg-[#1D2144] diamondLg:px-5 diamondXl:px-8 h-full min-h-[400px]"
                                            data-wow-delay=".1s"
                                        >
                                            <div className="mb-5 flex items-center space-x-1">
                                                {getStars(item.ratting)}
                                            </div>
                                            <p className="mb-8 border-b border-diamond-body-color border-opacity-10 pb-8 text-base leading-relaxed text-diamond-body-color dark:border-diamond-white dark:border-opacity-10 dark:text-diamond-white min-h-[200px]">
                                                {item.comment && `“${Utils.getContent(item.comment)}`}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="w-full">
                                                    <h5 className="mb-1 text-lg font-semibold text-dark dark:text-diamond-white diamondLg:text-base diamondXl:text-lg">
                                                        {Utils.getContent(item.client_name)}
                                                    </h5>
                                                    <p className="text-sm text-diamond-body-color">{Utils.getContent(item.email_address)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </OwlCarousel>
                    )}
                </div>
                <div className="absolute top-5 right-0 z-[-1]">
                    <svg
                        width="238"
                        height="531"
                        viewBox="0 0 238 531"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            opacity="0.3"
                            x="422.819"
                            y="-70.8145"
                            width="196"
                            height="541.607"
                            rx="2"
                            transform="rotate(51.2997 422.819 -70.8145)"
                            fill="url(#paint0_linear_83:2)"
                        />
                        <rect
                            opacity="0.3"
                            x="426.568"
                            y="144.886"
                            width="59.7544"
                            height="541.607"
                            rx="2"
                            transform="rotate(51.2997 426.568 144.886)"
                            fill="url(#paint1_linear_83:2)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_83:2"
                                x1="517.152"
                                y1="-251.373"
                                x2="517.152"
                                y2="459.865"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_83:2"
                                x1="455.327"
                                y1="-35.673"
                                x2="455.327"
                                y2="675.565"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className="absolute left-0 bottom-5 z-[-1]">
                    <svg
                        width="279"
                        height="106"
                        viewBox="0 0 279 106"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.5">
                            <path
                                d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
                                stroke="url(#paint0_linear_72:302)"
                            />
                            <path
                                d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
                                stroke="url(#paint1_linear_72:302)"
                            />
                            <path
                                d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
                                stroke="url(#paint2_linear_72:302)"
                            />
                            <path
                                d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
                                stroke="url(#paint3_linear_72:302)"
                            />
                        </g>
                        <defs>
                            <linearGradient
                                id="paint0_linear_72:302"
                                x1="256.267"
                                y1="53.6717"
                                x2="-40.8688"
                                y2="8.15715"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_72:302"
                                x1="256.267"
                                y1="42.6717"
                                x2="-40.8688"
                                y2="-2.84285"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_72:302"
                                x1="256.267"
                                y1="64.6717"
                                x2="-40.8688"
                                y2="19.1572"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_72:302"
                                x1="256.267"
                                y1="76.6717"
                                x2="-40.8688"
                                y2="31.1572"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
