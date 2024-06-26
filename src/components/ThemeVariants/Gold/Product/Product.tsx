import { ThemeContextApi } from "@/pages/[slug]";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./Card/ProductCard";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Product() {
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
        nav: false,
        autoplayTimeout: 3000,
        smartSpeed: 1100,
    };

    if (!lstProduct) return null;
    return (
        <section id="product" className='py-24 bg-gold-white'>
            <div className="container">
                <h2 className="uppercase text-center text-gold-primary my-16">Products</h2>
                {lstProduct.length > 0 && (
                    <OwlCarousel className="owl-carousel owl-theme" {...options}>
                        {lstProduct.map((item, index) => (
                            <ProductCard
                                key={index}
                                title={item.product_name}
                                desc={item.product_desc}
                                price={item.product_price}
                                srcPath={item.product_image}
                                companyID={item.company_id} />
                        ))}
                    </OwlCarousel>
                )}
            </div>
        </section>
    )
}
