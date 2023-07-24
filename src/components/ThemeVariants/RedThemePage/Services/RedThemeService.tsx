import { IServicePageData } from "@/types/commonTypes";
import Slider from "react-slick";
import RedThemeHeading from "../common/RedThemeHeading";
import ServiceCard from "./ServiceCard";

export default function RedThemeService({
  lstService,
}: {
  lstService: IServicePageData[];
}) {
  const configuration = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!lstService) return null;

  return (
    <div>
      <RedThemeHeading title={"Service"} />
      <Slider {...configuration}>
        {lstService.map((item, index) => (
          <div key={index}>
            <ServiceCard
              path={item.service_image}
              id={item.company_id}
              price={item.service_price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
