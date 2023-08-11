import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioServiceCard from "./PortfolioServiceCard";

export default function PortfolioServices() {
  const lstService = useContext(PortfolioContextApi).service;

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

  const configuration = {
    dots: true,
    speed: 500,
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    centerMode: true,
    centerPadding: "30px",
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="service-block" id="services">
      <GetHeader title="Services" />
      <div className="pt-8 pb-16">
        {lstService.length > 0 && (
          <Slider {...configuration}>
            {lstService.map((item, index) => (
              <PortfolioServiceCard
                key={index}
                index={parseInt(item.service_id)}
                path={item.service_image}
                id={item.company_id}
                name={item.service_name}
                description={item.service_desc}
              />
            ))}
          </Slider>
        )}
        {lstService.length === 0 && (
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
