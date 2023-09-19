import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import Loading from "@/common/Loading";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { paymentOptionFormSchema } from "@/services/forms/formSchema";
import { IPaymentOptions } from "@/types/commonTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import BankAccountDetails from "./Childs/BankAccountDetails";
import QRCodeImageUploader from "./Childs/QRCodeImageUploader";
import RazorpayCheckout from "./Childs/RazorpayCheckout";

export default function PaymentOptionPage() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [objPayment, setObjPayment] = useState<any>({});
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
      if (typeof data.QRCodeImage == "object") {
        io.append("qrcode", data.QRCodeImage);
      }

      if (typeof data.logo == "string") {
        io.append("logo", objPayment.logo);
      }
      io.append("isupdate", isUpdate);

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
      setIsLoading(true);
      const res = await ApiService.getPaymentOptionDetails();
      if (!res.error) {
        let result: IPaymentOptions = res.paymentdata;

        if (res.paymentdata && Object.keys(res.paymentdata).length > 0) {
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }

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
          logo: result.qrcode,
        };

        setObjPayment(defaultValue);
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (objPayment && Object.keys(objPayment).length > 0) {
      objForm.reset(objPayment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objPayment]);

  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }
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
          className="mb-16 elative digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block relative_box_for_loading"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
          onSubmit={objForm.handleSubmit(onSave)}
        >
          {true ? (
            <div className="py-[10rem]">
              <Loading />
            </div>
          ) : (
            <>
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
                {objPayment && Object.keys(objPayment).length > 0 && (
                  <div className="right xs:w-full lg:w-[50%] xl:w-[25%]">
                    <QRCodeImageUploader imagePath={objPayment.QRCodeImage} />
                  </div>
                )}
                <RazorpayCheckout />
                <BankAccountDetails />
              </div>
              <div className="w-full flex justify-end">
                <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
                  <DashboardCommonButtons />
                </div>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
}
