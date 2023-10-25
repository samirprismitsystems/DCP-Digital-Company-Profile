import Ratting from "@/components/ThemeVariants/Portfolio/PortfolioPage/Feedback/Ratting";
import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";

interface IGadgetGiveFeedbackProps {
  title?: string;
  buttonTitle?: string;
  addEmailMobile?: boolean;
  isAnotherSubmit?: boolean;
}

export default function GadgetGiveFeedback(props: IGadgetGiveFeedbackProps) {
  const objCompany = useContext(ThemeContextApi).company;

  const [objFeedback, setObjFeedback] = useState({
    clientName: "",
    email: "",
    comment: "",
    phoneNumber: "",
  });

  const [rate, setRate] = useState(1);
  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      if (props.addEmailMobile) {
        if (objFeedback.phoneNumber.length !== 10) {
          Utils.showErrorMessage("Mobile number must be 10 digit!");
          return null;
        }
      }
      const io: any = new FormData();
      io.append("client_name", objFeedback.clientName);
      io.append("email_address", objFeedback.email);
      if (!props.isAnotherSubmit) {
        io.append("ratting", rate);
        io.append("comment", objFeedback.comment);
      }
      io.append("company_id", objCompany.company_id || Utils.getCompanyID());
      io.append("isupdate", false);

      if (props.isAnotherSubmit) {
        io.append("message", objFeedback.comment);
        io.append("phone_number", objFeedback.phoneNumber);
        if (Utils.getUserID() || objCompany.user_id) {
          io.append("user_id", Utils.getUserID() || objCompany.user_id);
        }
      }

      if (props.isAnotherSubmit) {
        const res = await ApiService.createEnquiry(io);

        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          setObjFeedback({
            clientName: "",
            comment: "",
            email: "",
            phoneNumber: "",
          });
          return null;
        }

        throw new Error(res.message);
      } else {
        const res = await ApiService.createTestimonial(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          setObjFeedback({
            clientName: "",
            comment: "",
            email: "",
            phoneNumber: "",
          });

          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const handleOnChange = (obj: any) => {
    setObjFeedback((prevState: any) => ({
      ...prevState,
      ...obj,
    }));
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
            value={objFeedback.clientName || ""}
            className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
            placeholder="Enter Your Name"
            onChange={(e: any) => {
              handleOnChange({
                clientName: e.target.value,
              });
            }}
          />
          <input
            type="email"
            value={objFeedback.email || ""}
            required={true}
            className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
            placeholder="Enter Your Email"
            onChange={(e: any) => {
              handleOnChange({
                email: e.target.value,
              });
            }}
          />
          {props.addEmailMobile && (
            <>
              <input
                type="number"
                value={objFeedback.phoneNumber || ""}
                required={true}
                className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
                placeholder="Enter Your Mobile No"
                onChange={(e: any) => {
                  const userInput = e.target.value;
                  if (userInput.length <= 10)
                    handleOnChange({
                      phoneNumber: userInput,
                    });
                }}
              />
            </>
          )}
          <textarea
            className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
            cols={5}
            rows={5}
            value={objFeedback.comment || ""}
            required={true}
            placeholder="Enter Your Feedback"
            onChange={(e: any) => {
              handleOnChange({
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
            {props.buttonTitle || "Give Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
