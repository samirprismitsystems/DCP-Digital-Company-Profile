import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import MainScrollAnimation from "@/common/MainScrollAnimation";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import { LandingPageContextApi } from "../LandingPage";

interface IFormUser {
  fullName: string;
  email: string;
  message: string;
}

export default function GetInTouch() {
  const [isLoading, setIsLoading] = useState(false);
  const result = useContext(LandingPageContextApi);
  const data = result.pageDetails;
  const [objUser, setObjUser] = useState<IFormUser>({
    email: "",
    fullName: "",
    message: "",
  });

  const handleChange = (data: any) => {
    setObjUser({
      ...objUser,
      ...data,
    });
  };

  const onSave = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (objUser) {
        const io: any = new FormData();
        io.append("name", objUser.fullName);
        io.append("contactemail", objUser.email);
        io.append("email", Utils.getItem("settingEmail"));
        io.append("message", objUser.message);

        const res = await ApiService.sendEmail(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          setObjUser({
            email: "",
            fullName: "",
            message: "",
          });
          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="container lg:w-[60%] xl:w-[50%] mx-auto flex md:px-0 px-5  items-center xs:mt-0 flex-col xs:py-0 md:my-16"
      id="getInTouch"
    >
      <MainScrollAnimation>
        <div className="mx-auto pb-12">
          <div className="xs:px-8 xs:pt-0 md:pt-16">
            <h3 className="text-center text-[3.0rem] font-600 font-bold text-white">
              {data.contacttitle || "N/A"}
            </h3>
            <p className="xs:text-justify md:text-center text-white pt-6 text-[1.8rem] md:pb-16">
              {data.contactdesc || "N/A"}
            </p>
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
                  value={objUser.fullName}
                  onChange={(e) => {
                    handleChange({ fullName: e.target.value });
                  }}
                  required
                />
                <input
                  type="text"
                  name="name"
                  value={objUser.email}
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
                  value={objUser.message}
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
                  disabled={isLoading}
                  className="xs:text-[2.3rem] text-[1.8rem] xs:py-4 text-center first-letter xs:block xs:m-auto xs:w-full sm:w-52 btnHoverEffect px-9 py-4 rounded text-white bg-primary-light min-h-[5rem]"
                  type="submit"
                >
                  {isLoading ? <CircularLoadingEffectForButton /> : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </MainScrollAnimation>
    </section>
  );
}
