import { IImageGallery } from "@/types/commonTypes";
import Slider from "react-slick";
import RedThemeHeading from "../common/RedThemeHeading";
import GalleryCards from "./GalleryCards";
export default function RedThemeGallery({
  lstImageGallery,
}: {
  lstImageGallery: IImageGallery[];
}) {
  const configuration = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!lstImageGallery) return null;

  return (
    <div>
      <RedThemeHeading title={"Gallery"} />
      <Slider {...configuration}>
        {lstImageGallery.map((item, index) => (
          <div key={index}>
            <GalleryCards path={item.portfolio_image} id={item.company_id} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
