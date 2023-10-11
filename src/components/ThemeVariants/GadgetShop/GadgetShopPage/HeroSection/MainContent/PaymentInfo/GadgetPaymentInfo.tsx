import PortfolioPaymentCard from "@/components/ThemeVariants/Portfolio/PortfolioPage/PaymentInfo/PortfolioPaymentCard";
import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
import GadgetBankDetails from "./GadgetBankDetails";

export default function GadgetPaymentInfo() {
  const objPaymentInfo = useContext(ThemeContextApi).paymentinfo;

  return (
    <>
      <div className="about-block " id="about-us">
        <GetGadgetHeader title="Payment Info" />
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-16">
          <div className="paymentCards">
            <PortfolioPaymentCard
              title="Google Pay"
              imgPath="assets/payments/google-pay.png"
              Upi={objPaymentInfo.googlepay_number}
            />
            <PortfolioPaymentCard
              title="Phone Pay"
              imgPath="assets/payments/phone-pe.png"
              Upi={objPaymentInfo.phonepay_number}
            />
            <PortfolioPaymentCard
              title="Paytm"
              imgPath="assets/payments/paytm.png"
              Upi={objPaymentInfo.paytm_number}
            />
          </div>
          <GadgetBankDetails objPayment={objPaymentInfo} />
        </div>
      </div>
    </>
  );
}
