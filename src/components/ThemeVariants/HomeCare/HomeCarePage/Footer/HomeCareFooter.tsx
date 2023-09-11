import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { lstHomeCareFooterButton } from "../../data/homeCareFooterButtons";
import GetHomeCareFooterButton from "./GetHomeCareFooterButton";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function HomeCareFooter() {
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1074) {
        setSlidesToShow(5);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(7);
      } else {
        setSlidesToShow(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const configuration = {
    items: slidesToShow,
    dots: false,
    nav: true,
    autoplayTimeout: 3000,
    smartSpeed: 1100,
  };

  return (
    <>
      <div
        className="max-w-full mx-auto  rounded-bl-none rounded-br-none sticky  bottom-0 z-[1] w-full bg-[#fff] rounded-[20px] border border-solid border-homeCareTheme-opacityBorder text-center"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
          padding: "25px",
        }}
      >
        <OwlCarousel {...configuration}>
          {lstHomeCareFooterButton.map((item, index) => (
            <GetHomeCareFooterButton
              key={index}
              icon={item.icon}
              title={item.name}
              link={item.link}
            />
          ))}
        </OwlCarousel>
      </div>
    </>
  );
}
