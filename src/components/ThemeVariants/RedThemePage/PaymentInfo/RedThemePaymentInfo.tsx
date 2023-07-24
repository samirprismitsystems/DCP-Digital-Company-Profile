import { IPaymentOptions } from "@/types/commonTypes";
import RedThemeHeading from "../common/RedThemeHeading";
import PaymentCard from "./PaymentCard";

export default function RedThemePaymentInfo({
  objPaymentInfo,
}: {
  objPaymentInfo: IPaymentOptions;
}) {
  if (!objPaymentInfo) return null;

  return (
    <div>
      <RedThemeHeading title={"Payment Info"} />
      <PaymentCard
        imagePath="/assets/themes/google-pay.png"
        name={"Google Pay"}
        data={objPaymentInfo.googlepay_number}
      />
      <PaymentCard
        imagePath="/assets/themes/phone-pe.png"
        name={"Phone Pay"}
        data={objPaymentInfo.phonepay_number}
      />
      <PaymentCard
        imagePath="/assets/themes/paytm.png"
        name={"PayTM"}
        data={objPaymentInfo.paytm_number}
      />
      <PaymentCard
        name={"QR Code"}
        isQRCode={true}
        data={objPaymentInfo.qrcode}
      />
      <div className="content-box bank_info p-16 rounded-[2rem] pb-8 overflow-hidden bg-white shadow shadow-[0px 0px 20px 0px rgba(128, 128, 128, 0.3)]">
        <h3>Bank Account Details</h3>
        <dl className="mt-6  mb-4">
          <dt className="font-medium text-[1.6rem] text-redThemeGreyTextColor">
            Name:
          </dt>
          <dd className="mb-4 text-black text-[1.6rem]">1</dd>
          <dt className="font-medium text-[1.6rem] text-redThemeGreyTextColor">
            Bank Name:
          </dt>
          <dd className="mb-4 text-black text-[1.6rem]">1</dd>
          <dt className="font-medium text-[1.6rem] text-redThemeGreyTextColor">
            Account Number:
          </dt>
          <dd className="mb-4 text-black text-[1.6rem]">1</dd>
          <dt className="font-medium text-[1.6rem] text-redThemeGreyTextColor">
            IFSC Code:
          </dt>
          <dd className="mb-4 text-black text-[1.6rem]">1</dd>
          <dt className="font-medium text text-[1.6rem] text-redThemeGreyTextColor">
            Account Type:
          </dt>
          <dd className="mb-4 text-black text-[1.6rem]">saving</dd>
        </dl>
      </div>
    </div>
  );
}
