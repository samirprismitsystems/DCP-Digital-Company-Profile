import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import global from "../../styles/platinum.module.scss";
import styles from "./styles/products.module.scss";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function Products() {
  const lstProduct = useContext(ThemeContextApi).product;
  const [slidesToShow, setSlidesToShow] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 950) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 2000) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    loop: true,
    items: slidesToShow,
    autoplay: false,
    dots: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 1100,
  };

  return (
    <>
      <section id="products" className="team_area bg-white pb-platinum18 pt-platinum18 platinumLg:pt-platinum120 platinumLg:pb-platinum120">
        <div className="container">
          <div className="flex items-center justify-center">
            <div className="w-full">
              <div className={`${global.section_title} text-center pb-platinum6`}>
                <h5 className={global.sub_title}>Products</h5>
                <h4 className={global.main_title}>Our Products</h4>
              </div>
            </div>
          </div>
          <div className="team-wrapper relative">
            <div className="w-full team_active">
              {lstProduct.length > 0 && (
                <OwlCarousel className="owl-carousel owl-theme" {...options}>
                  {lstProduct.map((item, index) => (
                    <div className="w-full" key={index}>
                      <div className={`${styles.single_team_item} mx-auto group`}>
                        <div className={`mx-platinum3 ${styles.single_team} hover:shadow-lg transition-all duration-300 ease-in`}>
                          <div className={`${styles.team_image} w-full h-full min-h-[300px] max-h-[300px] relative`}>
                            <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/product/${item.product_image}`} alt="team" className="w-full max-h-[300px] min-h-[300px] h-full object-cover object-center align-middle" />
                          </div>
                          <div className="team_content py-platinum5 px-platinum8 relative ">
                            <h4 className="team_name"><a href="#" className="text-black group-hover:text-platinum-theme-color">{Utils.getContent(item.product_name)}</a></h4>
                            <p className="mt-platinum2 transition-all duration-300 group-hover:text-platinum-theme-color overflow-y-auto max-h-[170px] min-h-[170px] h-full">{Utils.getContent(item.product_desc)}</p>
                            <p className="mt-platinum2 font-bold transition-all duration-300 group-hover:text-platinum-theme-color">{`Rs. ${Utils.getContent(item.product_price)}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
