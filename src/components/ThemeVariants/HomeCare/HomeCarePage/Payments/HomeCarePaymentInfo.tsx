import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface IHomeCarePaymentInfo {
  label: string;
  icon?: any;
  value: any;
  imagPath?: string;
  isImage?: boolean;
  mb?: number;
  removeMargin?: boolean;
  isBlack?: boolean;
}

export default function HomeCarePaymentInfo(props: IHomeCarePaymentInfo) {
  return (
    <>
      <div
        className={`items-center  m-0 ${
          props.mb === 0 ? "mb-0" : "mb-10"
        } flex flex-initial`}
      >
        {(props.isImage || props.icon) && (
          <div className="w-[40px] h-[40px] flex justify-center items-center text-center text-homeCareTheme-primary rounded-50 bg-[#e5ebf1]">
            {props.icon && (
              <FontAwesomeIcon
                className="w-[25px] h-[25px] inline-flex justify-center items-center text-center text-homeCareTheme-primary  rounded-50"
                icon={props.icon}
              />
            )}
            {props.isImage && (
              <Image
                alt="image.png"
                width={500}
                height={500}
                src={props.imagPath || ""}
                className="w-[25px] h-[25px] inline-flex justify-center items-center text-center text-homeCareTheme-primary  rounded-50"
              />
            )}
          </div>
        )}
        <div
          className={`payment_label xs:text-[1.8rem] xlOne:text-2xl  homecarefont w-auto  max-w-full ml-8 ${
            !props.removeMargin && "lg:ml-12"
          }`}
        >
          <strong className="text-homeCareTheme-textColor">
            {props.label || "N/A"}:
          </strong>{" "}
          <span
            className={`${
              props.isBlack ? "text-black" : "text-homeCareTheme-textColor"
            }`}
          >
            {props.value || "N/A"}
          </span>
        </div>
      </div>
    </>
  );
}
