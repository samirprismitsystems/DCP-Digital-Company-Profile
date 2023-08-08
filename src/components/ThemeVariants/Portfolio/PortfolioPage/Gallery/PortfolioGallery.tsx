import { useContext } from "react";
import Slider from "react-slick";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioCards from "./PortfolioCards";

export default function PortfolioGallery() {
  const lstImageGallery = useContext(PortfolioContextApi).portfolio;

  const configuration = {
    dots: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="gallery-block " id="gallery">
      <GetHeader title="Gallery" />
      <div className="pt-8 pb-16">
        <Slider {...configuration}>
          {lstImageGallery.map((item, index) => (
            <div key={index}>
              <PortfolioCards
                path={item.portfolio_image}
                id={item.company_id}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
