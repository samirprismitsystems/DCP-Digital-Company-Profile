import Utils from "@/services/Utils";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomeCareShareCard() {
  const router = useRouter();
  const [objUser, SetObjUser] = useState({
    name: "",
    mobile: "",
  });

  const onSave = (e: any) => {
    e.preventDefault();
    if(objUser.mobile.length !==10){
      Utils.showErrorMessage('Mobile number must be 10 digit!')
      return null;
    }
    let redirectLink = `https://api.whatsapp.com/send?phone=+91${objUser.mobile}&text='hello I am ${objUser.name}'`;
    if (typeof window !== "undefined") {
      window.open(redirectLink);
    }
    return null;
  };

  return (
    <>
      <div
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
        className="border border-solid border-homeCareTheme-opacityBorder text-center contact-information mb-10 bg-white rounded-3xl py-5 px-16"
      >
        <form onSubmit={onSave} className="text-center">
          <h4 className="text-[22px] text-black font-bold pt-4 mb-6 text-center homecarefont">
            Share Your Card
          </h4>
          <div className="form-group mb-5 text-center">
            <input
              type="text"
              required
              className="form-control-input rounded-xl p-6 text-[14px]  text-homeCareTheme-textColor w-full font-medium homecarefont whitespace-normal break-words focus:outline focus:border-[1px] focus:border-solid placeholder:text-[#757575] focus:border-homeCareTheme-primary"
              style={{
                border: "2px solid #ced4da",
              }}
              placeholder="Name"
              name="name"
              value={objUser.name || ""}
              onChange={(e: any) => {
                SetObjUser((prevState: any) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="form-group mb-5 text-center">
            <input
              type="number"
              className="form-control-input rounded-xl p-6 text-[14px]  text-homeCareTheme-textColor w-full font-medium homecarefont whitespace-normal break-words focus:outline focus:border-[1px] focus:border-solid focus:border-homeCareTheme-primary placeholder:text-[#757575]"
              style={{
                border: "2px solid #ced4da",
              }}
              placeholder="Mobile"
              name="mobile"
              value={objUser.mobile || ""}
              onChange={(e: any) => {
                const userInput = e.target.value;
                if (userInput.length <= 10) {
                  SetObjUser((prevState: any) => ({
                    ...prevState,
                    mobile: userInput,
                  }));
                }
              }}
            ></input>
          </div>
          <div className="flex justify-center items-center py-4">
            <button
              type="submit"
              className="bg-homeCareTheme-primary text-white border-[1px] border-solid border-homeCareTheme-primary p-6 text-center text-2xl flex  justify-center items-center max-h-[40px] homecarefont rounded-2xl"
            >
              <FontAwesomeIcon
                className="inline-block  font-normal text-5xl"
                icon={faWhatsapp}
              />
              <span className="ml-4 text-3xl">Share Now</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
