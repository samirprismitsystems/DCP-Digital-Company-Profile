import { IProduct } from "@/types/products";
import Slider from "react-slick";
import RedThemeHeading from "../common/RedThemeHeading";
import ProductsCard from "./ProductsCard";

export default function RedThemeProducts({
  lstProduct,
}: {
  lstProduct: IProduct[];
}) {
  const configuration = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2.3,
    slidesToScroll: 1,
  };

  if (!lstProduct) return null;

  return (
    <div>
      <RedThemeHeading title={"Products"} />
      <Slider {...configuration}>
        {lstProduct.map((item, index) => (
          <div key={index}>
            <ProductsCard price={item.product_price} path={item.product_image} id={item.company_id} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
