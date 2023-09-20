import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";

export default function HomeCareAboutUs() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <div
      id="about"
      className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
      style={{
        boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
      }}
    >
      <h4 className="text-[22px] text-center text-black  font-bold mb-6 homecarefont pt-4">
        About Us
      </h4>
      <p className="text-justify homecarefont pt-4 pb-8 px-4 text-homeCareTheme-textColor">
        {objCompany.company_desc || "N/A"}
      </p>
      {/* <p className="gst-text py-8 mb-0  border-t-[1px] border-solid border-[#efefef] pt-6 text-center text-black font-bold text-4xl">
        GST: 29XXXXXXXXX1006
      </p> */}
    </div>
  );
}
