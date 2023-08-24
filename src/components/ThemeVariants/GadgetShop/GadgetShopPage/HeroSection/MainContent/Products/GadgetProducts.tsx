import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";

export default function GadgetProducts() {
  const lstProduct = useContext(GadgetShopContextApi).product;

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
    dots: false,
    speed: 500,
    centerMode: true,
    centerPadding: "20px",
    arrows: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="about-block" id="product">
        <GetGadgetHeader title="Products" />
        {lstProduct.length > 0 && (
          <Slider {...configuration}>
            {lstProduct.map((item, index) => (
              <div
                className="content-box rounded-[2rem] text-center min-h-[31.32rem] bg-white p-8 overflow-hidden gadgetfontfamily"
                style={{
                  boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                }}
                key={index}
              >
                <div
                  className="content-box product-box rounded-[2rem] p-8 overflow-hidden "
                  style={{
                    boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                >
                  <div className="product-img flex justify-center items-center  text-center h-[19rem] mb-4">
                    {" "}
                    <img
                      width="156"
                      height="190"
                      alt="product-img"
                      title="product-img"
                      className="lazyload w-auto h-full align-middle "
                      src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/product/${
                        item.product_image
                      }`}
                    />{" "}
                  </div>
                  <div className="product-info text-center">
                    <h4 className="product-title gadgetfontfamily text-gadgetTheme-primary font-normal text-[2.2rem]">
                      {item.product_name}
                    </h4>
                    <p className="product-description text-[1.6rem] gadgetfontfamily">
                      {item.product_desc}
                    </p>
                    <div className="product-action inline-flex justify-between items-center max-w-[37.5rem]  w-full  mt-4">
                      {" "}
                      <span className="text-[2rem] text-gadgetTheme-primary inline-block  product-price gadgetfontfamily">
                        Rs. {item.product_price}
                      </span>{" "}
                      <a
                        href="#"
                        className="site_btn gadgetfontfamily text-[1.8rem] py-4 px-8 bg-gadgetTheme-primary text-center text-white rounded-2xl inline-block"
                      >
                        Buy Now
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
