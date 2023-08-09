import TextField from "@/common/TextFields/TextField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function BankAccountDetails() {
  const [accountType, setAccountType] = useState("");

  const objForm = useFormContext();
  
  return (
    <div className="w-full">
      <div className="h3 pb-16">Bank Account Details:</div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Bank Name (Optional)"}
          placeHolder="Bank Name Ex:HDFC, SBI etc"
          name="bankName"
        />
      </div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Account Holder Name (Optional)"}
          placeHolder="Account Holder Name"
          name="accountHolderName"
        />
      </div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Bank Account Number (Optional)"}
          placeHolder="Account Number"
          type="text"
          name="bankAccountNumber"
        />
      </div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Bank IFSC Code (Optional)"}
          placeHolder="IFSC Code"
          name="bankIFSCCode"
        />
      </div>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 mb-16 transition-all duration-300 ease-linear">
        <label
          className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block`}
        >
          Account Type (Optional)
        </label>
        <div className="flex">
          <select
            className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            onChange={(e: any) => {
              objForm.setValue("accountType", e.target.value);
              setAccountType(e.target.value);
            }}
            value={objForm.getValues("accountType") || accountType}
          >
            <option value={"Saving Account"}>Saving Account</option>
            <option value={"Current Account"}>Current Account</option>
            <option value={"Salary Account"}>Salary Account</option>
          </select>
        </div>
      </div>
    </div>
  );
}
