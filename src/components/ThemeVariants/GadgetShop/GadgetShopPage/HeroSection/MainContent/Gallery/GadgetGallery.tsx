import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function GadgetGallery() {
  const lstPortfolio = useContext(ThemeContextApi).portfolio;

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
    dots: true,
    center: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 1100,
  };

  return (
    <>
      <div id="gallery">
        <GetGadgetHeader title="Gallery" />
        {lstPortfolio.length > 0 && (
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {lstPortfolio.map((item, index) => (
              <div
                key={index}
                className="xs:mx-14 md:mx-4  content-box gallery-box p-0 xs:my-16 rounded-[2rem] h-[35rem]"
              >
                <div
                  style={{
                    boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
                  }}
                  className="content-box gallery-box p-0 overflow-hidden mx-4 my-6 rounded-[2rem] h-full"
                >
                  {" "}
                  <img
                    src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/portfolio/${
                      item.portfolio_image
                    }`}
                    alt="gallery-img"
                    title="gallery-img"
                    className="lazyload object-cover img-fluid w-full max-w-full h-full align-middle"
                  />{" "}
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </>
  );
}
