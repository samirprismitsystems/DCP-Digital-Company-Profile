import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import TextField from "@/common/TextFields/TextField";
import { paymentOptionFormSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import RazorpayCheckout from "./Childs/RazorpayCheckout";
import BankAccountDetails from "./Childs/BankAccountDetails";
import QRCodeImageUploader from "./Childs/QRCodeImageUploader";

export default function PaymentOptionPage() {
  const objForm = useForm({
    defaultValues: {},
    resolver: yupResolver(paymentOptionFormSchema),
  });

  type IFormData = yup.InferType<typeof paymentOptionFormSchema>;
  const onSave: any = async (data: IFormData) => {
    console.log(data);
  };

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
                  name="googlePeNumber"
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
