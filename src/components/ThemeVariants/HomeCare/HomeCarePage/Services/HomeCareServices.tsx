import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";
import { useContext } from "react";
import { HomeCareContextApi } from "../HomeCarePage";
import { ThemeContextApi } from "@/pages/[slug]";

export default function HomeCareServices() {
  const lstService = useContext(ThemeContextApi).service;

  return (
    <>
      <div
        id="services"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont ">
          Services
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid xs:grid-cols-2 lg:grid-cols-3 gap-8">
          {lstService.map((item) => (
            <div
              key={item.service_id}
              className="image  flex flex-wrap justify-start items-center"
            >
              <div className="w-full h-auto">
                <div className="image w-full h-auto py-6">
                  <img
                    alt="image.png"
                    src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/service/${
                      item.service_image
                    }`}
                    className="max-w-[400px] block m-auto w-full h-full align-middle"
                  />
                </div>
                <h4 className="pb-2 text-homeCareTheme-textColor">
                  {item.service_name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
