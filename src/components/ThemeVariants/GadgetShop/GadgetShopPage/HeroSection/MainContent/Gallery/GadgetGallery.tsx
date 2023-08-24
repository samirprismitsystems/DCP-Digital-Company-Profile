import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";

export default function GadgetGallery() {
  const lstPortfolio = useContext(GadgetShopContextApi).portfolio;

  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(2);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(3);
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

  const configuration: any = {
    dots: true,
    speed: 500,
    // centerMode: true,
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div id="gallery">
        <GetGadgetHeader title="Gallery" />
        {lstPortfolio.length > 0 && (
          <Slider {...configuration}>
            {lstPortfolio.map((item, index) => (
              <div
                key={index}
                className="content-box gallery-box p-0 overflow-hidden mx-4 my-6 rounded-[2rem]"
                
              >
                <div style={{
                  boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                }} className="content-box gallery-box p-0 overflow-hidden mx-4 my-6 rounded-[2rem]">
                  {" "}
                  <img
                    src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/portfolio/${
                      item.portfolio_image
                    }`}
                    alt="gallery-img"
                    title="gallery-img"
                    className="lazyload img-fluid w-full max-w-full h-auto align-middle"
                  />{" "}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
