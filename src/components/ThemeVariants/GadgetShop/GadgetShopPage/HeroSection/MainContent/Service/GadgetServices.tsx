import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function GadgetServices() {
  const lstService = useContext(ThemeContextApi).service;

  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
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
      <div className="about-block" id="service">
        <GetGadgetHeader title="Services" />
        {lstService.length > 0 && (
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {lstService.map((item, index) => (
              <div
                className="xs:mx-14 md:mx-4  content-box rounded-[2rem] text-center  bg-white px-8 pb-8 my-16 overflow-hidden gadgetfontfamily min-h-[30rem]"
                style={{
                  boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                }}
                key={index}
              >
                <div className="services-img -mx-8 mb-8 h-[25rem]">
                  {" "}
                  <img
                    data-src="assets/img/services-01.jpg"
                    width="298"
                    height="199"
                    alt="services-img"
                    title="services-img"
                    className="lazyload h-[25rem] img-fluid w-full max-w-full min-h-full align-middle"
                    src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/service/${
                      item.service_image
                    }`}
                  />{" "}
                </div>
                <div className="services-info text-left">
                  <h4 className="services-title titleClr text-black text-[2.2rem] font-medium">
                    {item.service_name || "N/A"}
                  </h4>
                  <p className="services-description text-[1.6rem] text-black">
                    {item.service_desc || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </>
  );
}
