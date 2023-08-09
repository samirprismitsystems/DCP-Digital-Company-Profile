import { useContext } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";
import PortfolioPaymentCard from "./PortfolioPaymentCard";

export default function PortfolioPaymentInfo() {
  const objPaymentInfo = useContext(PortfolioContextApi).paymentinfo;


  return (
    <div className="payment-info">
      <GetHeader title="Payment Info" />
      <div className="pt-8 pb-8">
        <PortfolioPaymentCard
          title="Google Pay"
          imgPath="/assets/payments/google-pay.png"
          Upi={objPaymentInfo.googlepay_number}
          />
        <PortfolioPaymentCard
          title="Phone Pay"
          imgPath="/assets/payments/phone-pe.png"
          Upi={objPaymentInfo.phonepay_number}
          />
        <PortfolioPaymentCard
          title="Paytm"
          imgPath="/assets/payments/paytm.png"
          Upi={objPaymentInfo.paytm_number}
          />
      </div>
    </div>
  );
}