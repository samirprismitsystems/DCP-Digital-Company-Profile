import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useState } from "react";
import GetHeader from "../common/GetHeader";

export default function PortfolioContactUs() {
  const [objData, setObjData] = useState({
    clientName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      const io: any = new FormData();
      io.append("client_name", objData.clientName);
      io.append("email_address", objData.email);
      io.append("phone_number", objData.mobile);
      io.append("message", objData.message);
      if (Utils.getUserID()) {
        io.append("user_id", Utils.getUserID());
      }
      io.append("company_id", Utils.getCompanyID());
      io.append("isupdate", false);

      const res = await ApiService.createEnquiry(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const handleOnChange = (obj: any) => {
    setObjData((prevState: any) => ({
      ...prevState,
      ...obj,
    }));
  };

  return (
    <div className="contact-box" id="contactus">
      <GetHeader title="Contact Us" />
      <form
        onSubmit={onSave}
        className="c-text pt-9 pb-32 md:px-64 lg:px-40 xlOne:px-80 -mb-12"
      >
        <input
          required={true}
          type="text"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Name"
          onChange={(e: any) => {
            handleOnChange({
              clientName: e.target.value,
            });
          }}
        />
        <input
          required={true}
          type="text"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Mobile Number"
          onChange={(e: any) => {
            handleOnChange({
              mobile: e.target.value,
            });
          }}
        />
        <input
          required={true}
          type="email"
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          placeholder="Enter Your Email"
          onChange={(e: any) => {
            handleOnChange({
              email: e.target.value,
            });
          }}
        />
        <textarea
          className="placeholder:text-redThemeGreyTextColor focus-within:outline-none border-[1px] border-solid border-[#e5e5e5]  bg-[#f0f5f9] rounded-[10px] w-full min-h-[5rem] py-8 px-4 max-h-[375px] mb-6 text-3xl"
          cols={5}
          rows={5}
          required={true}
          placeholder="Enter Your Feedback"
          onChange={(e: any) => {
            handleOnChange({
              message: e.target.value,
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
          Send
        </button>
      </form>
    </div>
  );
}
