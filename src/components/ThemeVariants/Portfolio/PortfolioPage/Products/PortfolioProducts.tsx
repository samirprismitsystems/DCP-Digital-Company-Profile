import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioProductCard from "./PortfolioProductCard";
import { ThemeContextApi } from "@/pages/[slug]";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function PortfolioProducts() {
  const lstProduct = useContext(ThemeContextApi).product;

  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(3);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 1200) {
        setSlidesToShow(3);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(4);
        setSlidesToScroll(1);
      } else {
        setSlidesToShow(1);
        setSlidesToScroll(1);
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
    margin: 0,
    // autoplay: true,
    dots: true,
    nav: false,
    // autoplayTimeout: 3000,
    smartSpeed: 1100,
  };

  return (
    <div className="product-block">
      <GetHeader title="Products" />
      <div className="pt-8 pb-16">
        {lstProduct.length > 0 && (
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {lstProduct.map((item, index) => (
              <PortfolioProductCard
                key={index}
                path={item.product_image}
                id={item.company_id}
                description={item.product_desc}
                price={item.product_price}
                name={item.product_name}
              />
            ))}
          </OwlCarousel>
        )}
        {lstProduct.length === 0 && (
          <>
            <h3 className="text-center text-portfolioTheme-textColor pt-8 pb-0">
              Data Not Available
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
