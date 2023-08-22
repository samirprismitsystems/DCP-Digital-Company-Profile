import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface IHomeCarePaymentInfo {
  label: string;
  icon?: any;
  value: any;
  imagPath?: string;
  isImage?: boolean;
  mb?: number;
}

export default function HomeCarePaymentInfo(props: IHomeCarePaymentInfo) {
  return (
    <>
      <div
        className={`items-center  m-0 ${
          props.mb === 0 ? "mb-0" : "mb-10"
        } flex flex-wrap`}
      >
        <div className="w-[40px] h-[40px] flex justify-center items-center text-center text-homeCareTheme-primary rounded-50 bg-[#e5ebf1]">
          {!props.isImage ? (
            <FontAwesomeIcon
              className="w-[25px] h-[25px] inline-flex justify-center items-center text-center text-homeCareTheme-primary  rounded-50"
              icon={props.icon}
            />
          ) : (
            <Image
              alt="image.png"
              width={500}
              height={500}
              src={props.imagPath || ""}
              className="w-[25px] h-[25px] inline-flex justify-center items-center text-center text-homeCareTheme-primary  rounded-50"
            />
          )}
        </div>
        <div className="payment_label text-3xl text-homeCareTheme-textColor homecarefont w-auto ml-8 max-w-full lg:text-4xl lg:ml-12">
          <strong>{props.label}:</strong> {props.value}
        </div>
      </div>
    </>
  );
}
