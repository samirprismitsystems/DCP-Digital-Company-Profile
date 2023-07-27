import { useState } from "react";
import RedThemeHeading from "../common/RedThemeHeading";
import FeedBackReview from "./FeedBackReview";
import Ratting from "./Ratting";

export default function RedThemeFeedBack({ lstTestimonial }: any) {
  const [rate, setRate] = useState(0);

  if (!lstTestimonial) return null;
  return (
    <>
      <RedThemeHeading title="Feedback" />
      <FeedBackReview lstTestimonial={lstTestimonial} />
      <div className="content-box feedback-box rounded-[2rem] bg-white p-8 shadow shadow-[0px 0px 20px 0px rgba(128, 128, 128, 0.3)] overflow-hidden ">
        <h3 className="text-center text-[2.4rem] font-semibold text-redThemeGreyTextColor">
          Give Your Feedback
        </h3>
        <form id="feedback_form" className="mt-8">
          <div className="row flex flex-wrap justify-center items-center -mx-3">
            <div className="flex justify-center items-center">
              <p className="start-ratting  text-center  mb-6 text-base mt-0">
                <Ratting
                  rating={rate}
                  onRating={(rattingValue: number) => {
                    setRate(rattingValue);
                  }}
                />
              </p>
            </div>
          </div>
          <input
            type="text"
            className="border border-[1px solid #e5e5e5] rounded-[10px] bg-white w-full min-h-[5rem] py-4 px-8 text-2xl "
          />
        </form>
      </div>
    </>
  );
}
