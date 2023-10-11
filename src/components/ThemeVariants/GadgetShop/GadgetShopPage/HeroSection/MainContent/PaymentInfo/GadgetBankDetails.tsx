import HomeCarePaymentInfo from '@/components/ThemeVariants/HomeCare/HomeCarePage/Payments/HomeCarePaymentInfo';
import { IPaymentOptions } from '@/types/commonTypes';

export default function GadgetBankDetails({ objPayment }: { objPayment :IPaymentOptions}) {

  
  return (
    <div
      id="payment"
      className="bg-white rounded-3xl p-4 mb-10"
      style={{
        boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
      }}
    >
      <h4 className="pt-4 text-[22px] text-left ml-8 text-gadgetTheme-text  font-bold mb-6 homecarefont">
        Bank Account Details
      </h4>
      <div className="homecarefont pt-4 pb-8">
        <HomeCarePaymentInfo
          removeMargin={true}
          label="Name"
          value={objPayment.account_holder_name}
          isBlack={true}
          />
        <HomeCarePaymentInfo
          removeMargin={true}
          label="Bank Name"
          value={objPayment.bank_name}
          isBlack={true}
          />
        <HomeCarePaymentInfo
          removeMargin={true}
          label="Account Number"
          isBlack={true}
          value={objPayment.bank_account_number}
          />
        <HomeCarePaymentInfo
          removeMargin={true}
          label="IFSC Code"
          isBlack={true}
          value={objPayment.bank_ifsc_code}
          />
        <HomeCarePaymentInfo
          removeMargin={true}
          label="Account Type"
          isBlack={true}
          value={objPayment.account_type}
        />
      </div>
    </div>
  );
}
