import Ratting from "@/components/ThemeVariants/RedThemePage/FeedBack/Ratting";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import GetPortfolioFeedBackReview from "./GetPortfolioFeedBackReview";

export default function PortfolioFeedback() {
  const lstTestimonial = useContext(PortfolioContextApi).testimonial;
  const objCompany = useContext(PortfolioContextApi).company;
  const [objFeedback, setObjFeedback] = useState({
    clientName: "",
    email: "",
    comment: "",
  });
  const [rate, setRate] = useState(0);

  const onSave = async (e:any) => {
    try {
      e.preventDefault();

      const io: any = {
        client_name: objFeedback.clientName,
        email_address: objFeedback.email,
        ratting: rate,
        comment: objFeedback.comment,
        company_id: objCompany.company_id,
        isupdate: false,
      };

      const res = await ApiService.createTestimonial(io);

      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  return (
    <div className="feedback-block">
      <GetHeader title="Feedback" />
      <div className="py-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <GetPortfolioFeedBackReview lstTestimonial={lstTestimonial} />
        </div>
        <div className="content-box feedback-box rounded-[2rem] bg-white  overflow-hidden ">
          <h3 className="c-text text-center text-[3rem] pb-4 pt-6 font-bold text-portfolioTheme-titleColor">
            Give Your Feedback
          </h3>
          <form id="feedback_form" className="mt-8" onSubmit={onSave}>
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
              required={true}
              type="text"
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              placeholder="Enter Your Name"
            />
            <input
              type="email"
              required={true}
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              placeholder="Enter Your Email"
            />
            <textarea
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              cols={5}
              rows={5}
              required={true}
              placeholder="Enter Your Feedback"
            />
            <button
              type="submit"
              className="w-full max-h-[375px] bg-[#4d4d4d] text-center py-6 px-8 capitalize text-4xl c-text text-white rounded-lg"
              onClick={() => {
                console.log("data submitted");
                // onSave()
              }}
              style={{
                borderRadius: "13px",
              }}
            >
              Give Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
