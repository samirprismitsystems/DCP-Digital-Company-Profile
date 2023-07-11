import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { paymentOptionFormSchema } from "@/services/forms/formSchema";
import { IPaymentOptions } from "@/types/commonTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import BankAccountDetails from "./Childs/BankAccountDetails";
import QRCodeImageUploader from "./Childs/QRCodeImageUploader";
import RazorpayCheckout from "./Childs/RazorpayCheckout";

export default function PaymentOptionPage() {
  const objForm = useForm({
    resolver: yupResolver(paymentOptionFormSchema),
  });

  type IFormData = yup.InferType<typeof paymentOptionFormSchema>;
  const onSave: any = async (data: IFormData) => {
    try {
      let io: any = new FormData();
      io.append("paytm_number", data.payTMNumber);
      io.append("googlepay_number", data.googlePayNumber);
      io.append("phonepay_number", data.phonePeNumber);
      io.append("razorpay_key_id", data.keyID);
      io.append("razorpay_key_secret", data.keySecret);
      io.append("bank_name", data.bankName);
      io.append("account_holder_name", data.accountHolderName);
      io.append("bank_account_number", data.bankAccountNumber);
      io.append("bank_ifsc_code", data.bankIFSCCode);
      io.append("account_type", data.accountType);
      io.append("user_id", AuthService.getUserEmail());
      io.append("qrcode", data.QRCodeImage);
      io.append("isupdate", true);

      const res = await ApiService.savePaymentOptionDetails(io);
      if (!res.error) {
        onComplete();
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const loadData = async () => {
    try {
      const res = await ApiService.getPaymentOptionDetails();
      if (!res.error) {
        let result: IPaymentOptions = res.paymentdata;
        const defaultValue: any = {
          accountHolderName: result.account_holder_name,
          accountType: result.account_type,
          bankAccountNumber: result.bank_account_number,
          bankIFSCCode: result.bank_ifsc_code,
          bankName: result.bank_name,
          googlePayNumber: result.googlepay_number,
          keyID: result.razorpay_key_id,
          keySecret: result.razorpay_key_secret,
          payTMNumber: result.paytm_number,
          phonePeNumber: result.phonepay_number,
          QRCodeImage: result.qrcode,
        };
        objForm.reset(defaultValue);
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Payment Options</div>
        <div className="h4 mt-1">
          Please fill up the detail to create your profile
        </div>
      </div>
      <FormProvider {...objForm}>
        <form
          className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
          onSubmit={objForm.handleSubmit(onSave)}
        >
          <div className="row -mr-3 -ml-3 flex flex-wrap">
            <div className="left xs:w-full lg:w-[50%] xl:w-[75%]">
              <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-6 transition-all duration-300 ease-linear">
                <TextField
                  title={"PayTm Number (Optional)"}
                  name="payTMNumber"
                  placeHolder="PayTm Number"
                />
              </div>
              <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-6 transition-all duration-300 ease-linear">
                <TextField
                  title={"Google Pay Number / UPI ID (Optional)"}
                  placeHolder="Google Pay Number / UPI ID "
                  name="googlePayNumber"
                />
              </div>
              <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-6 transition-all duration-300 ease-linear">
                <TextField
                  title={"PhonePe Number / UPI ID (Optional)"}
                  placeHolder="PhonePe Number / UPI ID "
                  name="phonePeNumber"
                />
              </div>
            </div>
            <div className="right xs:w-full lg:w-[50%] xl:w-[25%]">
              <QRCodeImageUploader />
            </div>
            <RazorpayCheckout />
            <BankAccountDetails />
          </div>
          <div className="w-full flex justify-end">
            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
              <DashboardCommonButtons />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
