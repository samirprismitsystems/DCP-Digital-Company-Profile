import { useContext } from "react";
import Slider from "react-slick";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioProductCard from "./PortfolioProductCard";

export default function PortfolioProducts() {
  const lstProduct = useContext(PortfolioContextApi).product;

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
    <div className="product-block">
      <GetHeader title="Products" />
      <div className="pt-8 pb-16">
        <Slider {...configuration}>
          {lstProduct.map((item, index) => (
            <PortfolioProductCard
              key={index}
              index={item.id}
              path={item.product_image}
              id={item.company_id}
              description={item.product_desc}
              price={item.product_price}
              name={item.product_name}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
