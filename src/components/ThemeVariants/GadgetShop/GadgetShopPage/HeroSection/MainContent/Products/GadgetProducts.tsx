import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function GadgetProducts() {
  const lstProduct = useContext(ThemeContextApi).product;

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

  const options = {
    items: slidesToShow,
    margin: 25,
    autoplay: true,
    dots: false,
    center: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 1100,
  };
  
  return (
    <>
      <div className="about-block" id="product">
        <GetGadgetHeader title="Products" />
        {lstProduct.length > 0 && (
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {lstProduct.map((item, index) => (
              <div
                className="content-box rounded-[2rem] text-center min-h-[31.32rem] bg-white xs:mx-14 md:mx-4 pb-8 my-16 overflow-hidden gadgetfontfamily"
                style={{
                  boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                }}
                key={index}
              >
                <div className="product-img flex justify-center items-center  text-center h-[26rem] mb-4">
                  {" "}
                  <img
                    width="156"
                    height="190"
                    alt="product-img"
                    title="product-img"
                    className="lazyload w-auto align-middle h-[26rem]"
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
                  <div className="px-6 product-action inline-flex justify-between items-center max-w-[37.5rem]  w-full  mt-4">
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
            ))}
          </OwlCarousel>
        )}
      </div>
    </>
  );
}
