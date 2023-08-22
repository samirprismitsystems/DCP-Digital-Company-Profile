import Utils from "@/services/Utils";
import {
  faEnvelope,
  faMapMarkerAlt,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { HomeCareContextApi } from "../HomeCarePage";

export default function HomeCareContactInformation() {
  const objCompany = useContext(HomeCareContextApi).company;

  return (
    <>
      <div
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl mb-10 pt-8"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <div className="w-full pb-6 px-12">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-10 p-4 rounded-50  bg-[#e5ebf1] w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faPhone}
              />
            </div>
            <div className="per_text xs:text-3xl xl:text-2xl ml-8">
              {objCompany.company_contact}
            </div>
          </a>
          <hr />
        </div>
        <div className="w-full pb-6 px-12">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-10 p-4 rounded-50  bg-[#e5ebf1] w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMessage}
              />
            </div>
            <div className="per_text xs:text-3xl xl:text-2xl ml-8">
              {objCompany.company_email}
            </div>
          </a>
          <hr />
        </div>
        <div className="w-full pb-6 px-12">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-10 p-4 rounded-50  bg-[#e5ebf1] w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faEnvelope}
              />
            </div>
            <div className="per_text xs:text-3xl xl:text-2xl ml-8">
              {Utils.getMondayToSundayDateTime(
                objCompany.working_hours_from,
                objCompany.working_hours_to
              )}
            </div>
          </a>
          <hr />
        </div>
        <div className="w-full px-12">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-10 p-4 rounded-50  bg-[#e5ebf1] w-10 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMapMarkerAlt}
              />
            </div>
            <div className="per_text xs:text-3xl xl:text-2xl ml-8">Surat</div>
          </a>
        </div>
      </div>
    </>
  );
}
