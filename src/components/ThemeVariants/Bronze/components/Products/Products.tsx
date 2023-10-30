import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});


export default function Products() {
    const lstProduct = useContext(ThemeContextApi).product;
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
            <div className="bg-gray-200 " id="blog">
                <div className="container py-[64px] px-[16px] md:py-[80px]">
                    <h2
                        className="font-header text-[2.5rem] text-center font-header font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                    >
                        Products
                    </h2>
                    <h3
                        id="product"
                        className="pt-6 text-center font-header text-[1.8rem] font-medium text-black sm:text-[2rem] lg:text-[2.3rem]"
                    >
                        Check out our latest products!
                    </h3>
                    {lstProduct && lstProduct.length <= 9 && (
                        <div
                            className="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
                        >
                            {lstProduct.map((item, index: number) => (
                                <div className="shadow hover:shadow-md">
                                    <div
                                        key={index}
                                        style={{
                                            backgroundImage: `url(${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/product/${item.product_image})`
                                        }}
                                        className="group relative h-[30rem] bg-cover bg-center bg-no-repeat"
                                    >
                                        <span
                                            className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                                        ></span>
                                        {/* <button
                                        className="bg-white absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-bronze-primary px-6 py-2 text-center font-body text-[1.6rem] font-bold uppercase text-black hover:cursor-pointer hover:bg-bronze-primary hover:text-white transition-all duration-500 ease"
                                    >Buy Now</button> */}
                                    </div>
                                    <div className="bg-white py-6 px-5 xl:py-8">
                                        <h3
                                            className="pt-8 text-[2.2rem] lg:text-[2rem] py-4 font-semibold uppercase text-bronze-primary group-hover:text-yellow-200"
                                        >
                                            {Utils.getContent(item.product_name)}
                                        </h3>
                                        <p className="text-grey text-[2rem] lg:text-[1.8rem] group-hover:text-white">
                                            {Utils.getContent(item.product_desc)}
                                        </p>
                                        <p className="py-4 text-black font-semibold text-[2rem] lg:text-[1.8rem] group-hover:text-white">
                                            Rs. {Utils.getContent(item.product_price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {lstProduct && lstProduct.length >= 10 && (
                        <div className="py-16">
                            <OwlCarousel className="owl-carousel owl-theme" {...options}>
                                {lstProduct.map((item, index) => (
                                    <div className="shadow hover:shadow-md">
                                        <div
                                            key={index}
                                            style={{
                                                backgroundImage: `url(${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/product/${item.product_image})`
                                            }}
                                            className="group relative h-[30rem] bg-cover bg-center bg-no-repeat"
                                        >
                                            <span
                                                className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                                            ></span>
                                            {/* <button
                                        className="bg-white absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-bronze-primary px-6 py-2 text-center font-body text-[1.6rem] font-bold uppercase text-black hover:cursor-pointer hover:bg-bronze-primary hover:text-white transition-all duration-500 ease"
                                    >Buy Now</button> */}
                                        </div>
                                        <div className="bg-white py-6 px-5 xl:py-8">
                                            <h3
                                                className="pt-8 text-[2.2rem] lg:text-[2rem] py-4 font-semibold uppercase text-bronze-primary group-hover:text-yellow-200"
                                            >
                                                {Utils.getContent(item.product_name)}
                                            </h3>
                                            <p className="text-grey text-[2rem] lg:text-[1.8rem] group-hover:text-white">
                                                {Utils.getContent(item.product_desc)}
                                            </p>
                                            <p className="py-4 text-black font-semibold text-[2rem] lg:text-[1.8rem] group-hover:text-white">
                                                Rs. {Utils.getContent(item.product_price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
