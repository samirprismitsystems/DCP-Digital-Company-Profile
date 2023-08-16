import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function HomeCareEnquiryForm() {
  const [objEnquiry, setObjEnquiry] = useState({});

  const onSave = async (event: any) => {
    event.preventDefault();
    console.log(objEnquiry, "from on save");
  };

  return (
    <>
      <div
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Google Map
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4">
          <form onSubmit={onSave}>
            <div className="form-group mb-10 ">
              <input
                type="text"
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Name"
                name="name"
                value=""
              />
            </div>
            <div className="form-group mb-10 ">
              <input
                type="email"
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Email"
                name="name"
                value=""
              />
            </div>
            <div className="form-group mb-10 ">
              <input
                type="text"
                className="form-control border-2 py-5 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                placeholder="Mobile"
                name="name"
                value=""
              />
            </div>
            <div className="form-gromb-10p">
              <textarea
                className="form-control border-2 homecarefont placeholder:font-bold focus:outline-none focus:border-homeCareTheme py-2-primary focus:shadow-homeCareTheme-primary border-solid border-[#ced4da] rounded-[10px] p-4 w-full homecarefont font-medium text-[15px] homecarehoverOutlined"
                rows={4}
                placeholder="Message"
                name="message"
              ></textarea>
            </div>
            <div className="mb-5 table mx-auto mt-6">
              <button
                type="submit"
                className="border border-solid border-homeCareTheme-primary text-center bg-homeCareTheme-primary  rounded-[10px]  flex justify-center items-center  font-normal homecarefont max-h-[40px] text-white mt-8 py-6 px-8"
              >
                <FontAwesomeIcon className="text-3xl" icon={faPaperPlane} />
                <span className="ml-4 text-3xl"> Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
