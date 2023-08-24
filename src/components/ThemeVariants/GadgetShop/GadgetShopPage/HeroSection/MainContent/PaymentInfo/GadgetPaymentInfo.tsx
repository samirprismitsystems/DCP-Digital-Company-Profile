import PortfolioPaymentCard from "@/components/ThemeVariants/Portfolio/PortfolioPage/PaymentInfo/PortfolioPaymentCard";
import { useContext } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
import GadgetBankDetails from "./GadgetBankDetails";

export default function GadgetPaymentInfo() {
  const objPaymentInfo = useContext(GadgetShopContextApi).paymentinfo;

  return (
    <>
      <div className="about-block " id="about-us">
        <GetGadgetHeader title="Payment Info" />
        <div className="grid grid-cols-2 gap-16">
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