import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function HomeCareMadeWithLove() {
  const objCompany = useContext(ThemeContextApi).company;
  return (
    <>
      <div
        className="bg-[#fff] rounded-[20px]  p-5 py-12 mb-10  text-center border border-solid border-homeCareTheme-opacityBorder"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <p className="mb-0 homecarefont">
          <span className="inline-block text-[20px] text-homeCareTheme-textColor">
            Made with{" "}
            <FontAwesomeIcon
              className="text-[#ff0000] text-[4rem] font-bold"
              icon={faHeart}
            />{" "}
            by{" "}
          </span>{" "}
          <img
            alt="image.png"
            className="w-[100px] -mt-[6px] inline-block"
            src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/logo/${
              objCompany.company_logo
            }`}
          />{" "}
        </p>
      </div>
    </>
  );
}
