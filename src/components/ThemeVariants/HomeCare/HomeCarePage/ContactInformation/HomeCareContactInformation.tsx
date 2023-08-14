import {
  faEnvelope,
  faMapMarkerAlt,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeCareContactInformation() {
  return (
    <>
      <div
        className="bg-white rounded-3xl mb-16 pt-8"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <div className="w-full pb-6 px-4">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-12 p-4 rounded-50  bg-[#e5ebf1] w-12 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faPhone}
              />
            </div>
            <div className="per_text text-3xl ml-8">9876543210</div>
          </a>
          <hr />
        </div>
        <div className="w-full pb-6 px-4">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-12 p-4 rounded-50  bg-[#e5ebf1] w-12 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMessage}
              />
            </div>
            <div className="per_text text-3xl ml-8">samirshaikh@gmail.com</div>
          </a>
          <hr />
        </div>
        <div className="w-full pb-6 px-4">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-12 p-4 rounded-50  bg-[#e5ebf1] w-12 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faEnvelope}
              />
            </div>
            <div className="per_text text-3xl ml-8">
              Mon - Sat Day: 09.30 to 6.30 - Sunday Closed
            </div>
          </a>
          <hr />
        </div>
        <div className="w-full px-4">
          <a className="border-t-0  cursor-default flex items-center pb-8 border-0 text-homeCareTheme-textColor homecarefont text-base font-bold h-auto break-words whitespace-normal">
            <div
              className="per_link"
              style={{
                border: "1px solid transparent !important",
              }}
            >
              <FontAwesomeIcon
                className="inline-flex h-12 p-4 rounded-50  bg-[#e5ebf1] w-12 justify-center items-center text-homeCareTheme-primary text-center"
                icon={faMapMarkerAlt}
              />
            </div>
            <div className="per_text text-3xl ml-8">Surat</div>
          </a>
        </div>
      </div>
    </>
  );
}
