import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function HomeCareEnquiryForm() {
  const [objEnquiry, setObjEnquiry] = useState({
    clientName: "",
    email: "",
    phone: "",
    message: "",
    isUpdate: false,
  });

  const updateState = (objState: any) => {
    console.log(objState);
    setObjEnquiry((prevState) => ({
      ...prevState,
      ...objState,
    }));
  };

  const onSave = async (event: any) => {
    try {
      event.preventDefault();

      const io: any = new FormData();
      io.append("client_name", objEnquiry.clientName);
      io.append("email_address", objEnquiry.email);
      io.append("phone_number", objEnquiry.phone);
      io.append("message", objEnquiry.message);
      io.append("user_id", AuthService.getUserEmail());
      io.append("company_id", Utils.getCompanyID());
      io.append("isupdate", objEnquiry.isUpdate);

      const res = await ApiService.createEnquiry(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        setObjEnquiry({
          clientName: "",
          email: "",
          phone: "",
          message: "",
          isUpdate: false,
        });
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  return (
    <>
      <div
        id="enquiry"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Enquiry Form
        </h4>
        <div className="homecarefont pt-4 pb-8 px-32">
          <form onSubmit={onSave}>
            <div className="form-group mb-10 ">
              <input
                type="text"
                required
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Name"
                name="name"
                value={objEnquiry.clientName || ""}
                onChange={(e: any) => {
                  updateState({
                    clientName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group mb-10 ">
              <input
                type="email"
                required
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Email"
                name="name"
                value={objEnquiry.email || ""}
                onChange={(e: any) => {
                  updateState({
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group mb-10 ">
              <input
                type="number"
                required
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Mobile"
                name="name"
                value={objEnquiry.phone || ""}
                onChange={(e: any) => {
                  updateState({
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-gromb-10p">
              <textarea
                required
                className="form-control border-2 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme py-2-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                rows={4}
                placeholder="Message"
                name="message"
                value={objEnquiry.message || ""}
                onChange={(e: any) => {
                  updateState({
                    message: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="mb-5 table mx-auto mt-6">
              <button
                type="submit"
                className="border border-solid border-homeCareTheme-primary text-center bg-homeCareTheme-primary  rounded-[10px]  flex justify-center items-center  font-normal homecarefont max-h-[40px] text-white mt-8 py-6 px-8"
              >
                <FontAwesomeIcon
                  className="text-[1.8rem]"
                  icon={faPaperPlane}
                />
                <span className="ml-4 text-3xl"> Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
