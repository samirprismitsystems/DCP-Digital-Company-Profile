import MainScrollAnimation from "@/common/MainScrollAnimation";
import ApiService from "@/services/ApiServices";
import { IUser } from "@/types/commonTypes";
import { useContext, useState } from "react";
import { LandingPageContextApi } from "./LandingPage";

interface IFormUser {
  fullName: string;
  email: string;
  message: string;
}

export default function GetInTouch() {
  const result = useContext(LandingPageContextApi);
  const data = result.pageDetails;
  const [objUser, setObjUser] = useState<IFormUser>();

  const handleChange = (data: any) => {
    setObjUser({
      ...objUser,
      ...data,
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();
    try {
      if (objUser) {
        const io: IUser = {
          name: objUser.fullName,
          contactemail: objUser.email,
          email: "16mscit072@gmail.com",
          message: objUser.message,
        };
        const res = await ApiService.sendEmail(io);
        // cors error occurred the issues from the backend side so this work is pending from here
      } else {
        throw new Error("There is no user information available!");
      }
    } catch (ex) {
      console.log("from get in touch component", ex);
    } finally {
      // we can do other things here
    }
  };

  return (
    <section className="container lg:w-[60%] mx-auto flex px-5  items-center mt-16 flex-col py-32">
      <MainScrollAnimation>
        <div className="mx-auto pb-12">
          <div className="xs:px-8 pt-16">
            <h3 className="text-center text-[3.0rem] font-600 font-bold text-white">
              {data.contacttitle}
            </h3>
            <p className="text-center pt-6 text-[1.8rem]">{data.contactdesc}</p>
          </div>
        </div>
        <div className="xs:px-8  w-full">
          <form id="get-in-touch " className="w-full" onSubmit={onSave}>
            <div className="w-full">
              <div className="w-full md:flex-row xs:flex-col flex justify-between xs:space-x-0 md:space-x-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full rounded-[2.5rem] p-[1.8rem] border border-primary-lightDark text-[1.8rem]  mb-[2rem]  text-primary-main "
                  style={{
                    backgroundColor: "rgba(18, 110, 131, 0.5)",
                  }}
                  value={objUser?.fullName || ""}
                  onChange={(e) => {
                    handleChange({ fullName: e.target.value });
                  }}
                  required
                />
                <input
                  type="text"
                  name="name"
                  value={objUser?.email || ""}
                  onChange={(e) => {
                    handleChange({ email: e.target.value });
                  }}
                  placeholder="Your Email Address"
                  required
                  className=" w-full rounded-[2.5rem] p-[1.8rem] border border-primary-lightDark text-[1.8rem] mb-[2rem]  text-primary-main "
                  style={{
                    backgroundColor: "rgba(18, 110, 131, 0.5)",
                  }}
                />
              </div>
              <div className="col-12">
                <textarea
                  className="w-full rounded-[2.5rem] p-[1.8rem] border border-primary-lightDark text-[1.8rem] mb-[3rem]  text-primary-main "
                  placeholder="Type Message"
                  rows={6}
                  value={objUser?.message || ""}
                  onChange={(e) => {
                    handleChange({ message: e.target.value });
                  }}
                  style={{
                    backgroundColor: "rgba(18, 110, 131, 0.5)",
                  }}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center text-[4rem]">
                <button
                  className="xs:text-[2.3rem] text-[1.8rem] xs:py-4 text-center first-letter xs:block xs:m-auto xs:w-full sm:w-52 btnHoverEffect px-9 py-4 rounded text-white bg-primary-light"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </MainScrollAnimation>
    </section>
  );
}
