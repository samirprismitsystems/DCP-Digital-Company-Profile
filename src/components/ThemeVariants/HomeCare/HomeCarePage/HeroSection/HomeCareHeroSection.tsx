import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";
import { useContext } from "react";
import { HomeCareContextApi } from "../HomeCarePage";

export default function HomeCareHeroSection() {
  const objCompany = useContext(HomeCareContextApi).company;

  return (
    <>
      <div
        className="section-1 xs:mb-[30vh] sm:mb-10 bg-white py-8 rounded-3xl border border-solid border-homeCareTheme-opacityBorder"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,128,0.2)",
        }}
      >
        <div className="w-full text-center max-w-full">
          <div className="brand-image w-72 table  ml-auto mr-auto mt-auto mb-7 text-center  justify-center items-center">
            <div className="brand-img w-auto m-auto table-cell h-32 align-middle text-center justify-center items-center">
              <div className="flex items-center justify-center">
                <Image
                  src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/logo/${
                    objCompany.company_logo
                  }`}
                  width={500}
                  height={500}
                  alt="image.png"
                  className="max-w-[150px] h-auto w-full align-middle text-center"
                />
              </div>
            </div>
          </div>

          <h5 className="head6 text-center">{objCompany.company_name}</h5>
          <h5 className="link_title font-bold homecarefont">
            {objCompany.business_segment}
          </h5>
        </div>
      </div>
    </>
  );
}
