import Ratting from "@/components/ThemeVariants/Portfolio/PortfolioPage/Feedback/Ratting";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";

interface IGadgetGiveFeedbackProps {
  title?: string;
  buttonTitle?: string;
  addEmailMobile?: boolean;
  isAnotherSubmit?: boolean;
}

export default function GadgetGiveFeedback(props: IGadgetGiveFeedbackProps) {
  const objCompany = useContext(GadgetShopContextApi).company;

  const [objFeedback, setObjFeedback] = useState({
    clientName: "",
    email: "",
    comment: "",
    phoneNumber: "",
  });

  const [rate, setRate] = useState(0);
  const onSave = async (e: any) => {
    try {
      e.preventDefault();

      let io: any = {
        client_name: objFeedback.clientName,
        email_address: objFeedback.email,
        comment: objFeedback.comment,
        company_id: objCompany.company_id,
        isupdate: false,
      };

      if (props.isAnotherSubmit) {
        io.phone_number = objFeedback.phoneNumber;
        io.user_id = 0;
      } else {
        io.ratting = rate;
      }

      if (props.isAnotherSubmit) {
        const res = await ApiService.createEnquiry(io);

        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          return null;
        }

        throw new Error(res.message);
      } else {
        const res = await ApiService.createTestimonial(io);

        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  return (
    <div>
      <div
        className="rounded-[2rem] bg-white p-10"
        style={{
          boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
        }}
      >
        <h3 className="c-text text-center text-[3rem] pb-4 pt-6 font-bold text-portfolioTheme-titleColor">
          {props.title || "Give Your Feedback"}
        </h3>
        <form id="feedback_form" className="mt-8" onSubmit={onSave}>
          {!props.addEmailMobile && (
            <div className="row flex flex-wrap justify-center items-center -mx-3">
              <div className="flex justify-center items-center">
                <p className="start-ratting flex text-center  mb-8 text-base mt-0">
                  <Ratting
                    rating={rate}
                    onRating={(rattingValue: number) => {
                      setRate(rattingValue);
                    }}
                  />
                </p>
              </div>
            </div>
          )}
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
          {props.addEmailMobile && (
            <>
              <input
                type="number"
                required={true}
                className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
                placeholder="Enter Your Mobile No"
              />
            </>
          )}
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
            style={{
              borderRadius: "13px",
            }}
          >
            {props.buttonTitle || "Give Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
