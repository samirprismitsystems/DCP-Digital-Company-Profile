import { ThemeContextApi } from "@/pages/[slug]";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import GetHeader from "../common/GetHeader";
import PortfolioCards from "./PortfolioCards";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function PortfolioGallery() {
  const lstImageGallery = useContext(ThemeContextApi).portfolio;
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(1);
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
    autoplay: true,
    dots: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 1100,
  };

  return (
    <div className="gallery-block" id="gallery">
      <GetHeader title="Gallery" />
      {lstImageGallery && (
        <div className="pt-8 pb-16">
          {lstImageGallery.length > 0 && (
            <OwlCarousel className="owl-carousel owl-theme" {...options}>
              {lstImageGallery.map((item, index) => (
                <PortfolioCards
                  key={index}
                  path={item.portfolio_image}
                  id={item.company_id}
                />
              ))}
            </OwlCarousel>
          )}
          {lstImageGallery.length === 0 && (
            <>
              <h3 className="text-center text-portfolioTheme-textColor pt-8 pb-0">
                Data Not Available
              </h3>
            </>
          )}
        </div>
      )}
    </div>
  );
}
