import { useContext } from "react";
import Slider from "react-slick";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioServiceCard from "./PortfolioServiceCard";

export default function PortfolioServices() {
  const lstProduct = useContext(PortfolioContextApi).service;

  const configuration = {
    dots: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "30px",
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="service-block" id="services">
      <GetHeader title="Services" />
      <div className="pt-8 pb-16">
        <Slider {...configuration}>
          {lstProduct.map((item, index) => (
            <PortfolioServiceCard
              index={parseInt(item.service_id)}
              path={item.service_image}
              id={item.company_id}
              name={item.service_name}
              description={item.service_desc}
              
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
