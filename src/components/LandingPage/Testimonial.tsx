import MainScrollAnimation from "@/common/MainScrollAnimation";
import ApiService from "@/services/ApiServices";
import { ILandingPageReview } from "@/types/commonTypes";
import { faQuoteLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { LandingPageContextApi } from "./LandingPage";

export default function Testimonial() {
  const [lstReview, setLstReview] = useState<ILandingPageReview[]>();
  const result = useContext(LandingPageContextApi);
  const data = result.pageDetails;
  SwiperCore.use([Autoplay]);

  const loadData = async () => {
    try {
      const res = await ApiService.getReviewData();
      if (res.error) {
        throw new Error(res.message);
      }

      setLstReview(res.review);
    } catch (Ex) {
      console.log(Ex);
    } finally {
      // other operation
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!lstReview) return null;

  return (
    <div className="container py-32">
      <MainScrollAnimation>
        <section className=" text-gray-600 body-font xs:pt-8">
          <div className="mx-auto bg-primary-main rounded-3xl">
            <div className="xs:p-16 flex flex-col md:flex-row items-center justify-between border-none h-full">
              <div className="md:border-b-0 md:border-r border-r-primary-lightDark md:w-2/5 mr-10 p-8 md:p-16 xs:p-0 xs:m-0">
                <h4 className="text-[2.2rem] text-primary-lightDark font-600 text-center md:text-left font-medium xs:mb-2">
                  {data.reviewtitle}
                </h4>
                <h3 className="xs:mb-4 text-[3.0rem] text-secondary-greyDark font-600 text-center md:text-left font-semibold">
                  {data.reviewsubtitle}
                </h3>
                <div className="flex items-center  justify-center w-full mb-10 md:mb-0">
                  <p className="text-secondary-greyDark pt-6 text-[1.8rem] text-center md:text-left">
                    {data.reviewdesc}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-16  justify-center w-full md:w-3/5 mb-10 md:mb-0">
                <Swiper autoplay className="w-full">
                  {lstReview &&
                    lstReview.map((item: ILandingPageReview, index: number) => (
                      <SwiperSlide
                        key={item.review_id}
                        className="text-2xl xs:p-0"
                      >
                        <div className="testimonial-slider flex flex-col items-center">
                          <p className="md:text-left text-center text-black text-[1.8rem] italic mb-6">
                            <FontAwesomeIcon
                              className="bg-transparent text-primary-lightDark text-[6rem] mr-4"
                              icon={faQuoteLeft}
                            />
                            {item.user_message || "N/A"}
                          </p>

                          <div className="flex items-center justify-center md:justify-start w-full space-x-4">
                            <FontAwesomeIcon
                              className="bg-transparent text-secondary-greyDark text-[3rem]"
                              icon={faUserCircle}
                            />
                            <h4 className="text-[2.2rem] text-secondary-greyDark text-left  font-bold">
                              {item.user_name || "N/A"}
                            </h4>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </MainScrollAnimation>
    </div>
  );
}
