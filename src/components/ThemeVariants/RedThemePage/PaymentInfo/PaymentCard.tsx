import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function PaymentCard({
  name,
  imagePath,
  data,
  isQRCode,
}: {
  name: string;
  imagePath?: string;
  data: string | number;
  isQRCode?: boolean;
}) {
  return (
    <>
      {isQRCode ? (
        <div className="payment_card w-full">
          <div className="pay_details flex items-center rounded-[2rem] bg-white shadow shadow-[0px 0px 20px 0px rgb(128 128 128 / 30%)]  p-[1.5rem]  overflow-hidden  mb-8  relative">
            <span className="app_name absolute top-[1.5rem] right-[1.5rem] text-[1rem] text-redThemeGreyTextColor ">
              {name}
            </span>
            <div className="link-icon m-0 bg-[#f2f2f2] w-20 h-20 rounded-[1rem] flex justify-center items-center">
              <Image
                width={35}
                height={30}
                rel="preload"
                alt="Digital Profile"
                title="Digital Profile"
                className="h-auto w-[3.2rem] "
                src={`${UPLOAD_IMAGE_URI}/${Utils.getItem(
                  "IMAGE_UPLOAD_ID"
                )}/qrcode/${data}`}
              />
            </div>
            <div className="pay-info ml-6">
              <dl className="mt-0 mb-4">
                <dt className="clear-both  mr-2 font-semibold p-0 text-black float-left text-[1.5rem]">
                  QR Code .:
                </dt>
                <dd className="float-left p-0 m-0 text-[1.5rem]">
                  <Image
                    width={90}
                    height={90}
                    rel="preload"
                    alt="Digital Profile"
                    title="Digital Profile"
                    className="h-auto w-[15.2rem] "
                    src={`${UPLOAD_IMAGE_URI}/${Utils.getItem(
                      "IMAGE_UPLOAD_ID"
                    )}/qrcode/${data}`}
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment_card w-full">
          <div className="pay_details flex items-center rounded-[2rem] bg-white shadow shadow-[0px 0px 20px 0px rgb(128 128 128 / 30%)]  p-[1.5rem]  overflow-hidden  mb-8  relative">
            <span className="app_name absolute top-[1.5rem] right-[1.5rem] text-[1rem] text-redThemeGreyTextColor ">
              {name}
            </span>
            <div className="link-icon m-0 bg-white w-20 h-20 rounded-[1rem] flex justify-center items-center">
              <Image
                rel="preload"
                width={35}
                height={30}
                alt="Digital Profile"
                title="Digital Profile"
                className="h-auto w-[3.2rem] "
                src={`/${imagePath || ""}`}
              />
            </div>
            <div className="pay-info ml-6">
              <dl className="mt-0 mb-4">
                <dt className="clear-both  mr-2 font-semibold p-0 text-black float-left text-[1.5rem]">
                  No / UPI .:
                </dt>
                <dd className="float-left p-0 m-0 text-[1.5rem] text-redThemeGreyTextColor">
                  {data}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
