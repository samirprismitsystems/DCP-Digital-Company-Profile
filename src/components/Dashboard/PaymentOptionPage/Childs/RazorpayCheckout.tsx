import TextField from "@/common/TextFields/TextField";
import React from "react";

export default function RazorpayCheckout() {
  return (
    <div className="py-16 w-full">
      <div className="h3 pb-16">Razorpay Checkout Settings:</div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Key ID"}
          placeHolder="e.g. test_df0025g6s96s0rs"
          name="keyID"
        />
      </div>
      <div className="form_field border-b-[1px]border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black pb-3 transition-all duration-300 ease-linear">
        <TextField
          title={"Key Secret"}
          placeHolder="e.g. test_df0025g6s96s0rs"
          name="keySecret"
        />
      </div>
    </div>
  );
}
