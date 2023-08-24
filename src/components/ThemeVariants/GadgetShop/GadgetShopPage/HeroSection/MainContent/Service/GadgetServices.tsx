import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";

export default function GadgetServices() {
  const lstService = useContext(GadgetShopContextApi).service;

  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const [slidesToScroll, setSlidesToScroll] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
        setSlidesToScroll(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(3);
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
     autoplay: false,
     autoplaySpeed: 3000,
   };


  return (
    <>
      <div className="about-block" id="service">
        <GetGadgetHeader title="Services" />
        {lstService.length > 0 && (
          <Slider {...configuration}>
            {lstService.map((item, index) => (
              <div
                className="content-box rounded-[2rem] text-center min-h-[39.319rem] bg-white p-8 overflow-hidden gadgetfontfamily"
                style={{
                  boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                }}
                key={index}
              >
                <div
                  key={index}
                  className="content-box services-box pt-0 min-h-[39.319rem] rounded-[2rem] p-8 overflow-hidden"
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                  }}
                >
                  <div className="services-img -mx-8 mb-8">
                    {" "}
                    <img
                      data-src="assets/img/services-01.jpg"
                      width="298"
                      height="199"
                      alt="services-img"
                      title="services-img"
                      className="lazyload img-fluid w-full max-w-full min-h-full h-auto align-middle"
                      src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/service/${
                        item.service_image
                      }`}
                    />{" "}
                  </div>
                  <div className="services-info text-left">
                    <h4 className="services-title titleClr text-black text-[2.2rem] font-medium">
                      {item.service_name}
                    </h4>
                    <p className="services-description text-[1.6rem] text-black">
                      {item.service_desc}
                    </p>
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
