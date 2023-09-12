import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import GetHeader from "../common/GetHeader";
import GetPortfolioFeedBackReview from "./GetPortfolioFeedBackReview";
import Ratting from "./Ratting";

export default function PortfolioFeedback() {
  const lstTestimonial = useContext(ThemeContextApi).testimonial;
  const [objFeedback, setObjFeedback] = useState({
    clientName: "",
    emailAddress: "",
    comment: "",
  });
  const [rate, setRate] = useState(1);

  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      const io: any = new FormData();
      io.append("client_name", objFeedback.clientName);
      io.append("email_address", objFeedback.emailAddress);
      io.append("ratting", rate);
      io.append("comment", objFeedback.comment);
      io.append("company_id", Utils.getCompanyID());
      io.append("isupdate", false);

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

  const handleOnCHange = (obj: any) => {
    setObjFeedback((prevState: any) => ({
      ...prevState,
      ...obj,
    }));
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
                <p className=" flex start-ratting  text-center  mb-6 text-base mt-0">
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
              value={objFeedback.clientName || ""}
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              placeholder="Enter Your Name"
              onChange={(e: any) => {
                handleOnCHange({
                  clientName: e.target.value,
                });
              }}
            />
            <input
              type="email"
              value={objFeedback.emailAddress || ""}
              required={true}
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              placeholder="Enter Your Email"
              onChange={(e: any) => {
                handleOnCHange({
                  emailAddress: e.target.value,
                });
              }}
            />
            <textarea
              className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
              value={objFeedback.comment || ""}
              cols={5}
              rows={5}
              required={true}
              placeholder="Enter Your Feedback"
              onChange={(e: any) => {
                handleOnCHange({
                  comment: e.target.value,
                });
              }}
            />
            <button
              type="submit"
              className="w-full max-h-[375px] bg-[#4d4d4d] text-center py-6 px-8 capitalize text-4xl c-text text-white rounded-lg"
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
