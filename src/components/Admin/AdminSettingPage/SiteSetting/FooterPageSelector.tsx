import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function FooterPageSelector() {
  const [selectedOption, setSelectedOption] = useState("");
  const objForm = useFormContext();

  return (
    <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
      <label
        className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none`}
      >
        Select Footer Pages
      </label>
      <div className="flex">
        <select
          className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
          onChange={(e: any) => {
            objForm.setValue("selectedOption", e.target.value);
            setSelectedOption(e.target.value);
            console.log(e.target.value, "selected option");
          }}
          value={objForm.getValues("selectedOption") || selectedOption}
        >
          <option value={"Saving Account"}>Saving Account</option>
          <option value={"Current Account"}>Current Account</option>
          <option value={"Salary Account"}>Salary Account</option>
        </select>
      </div>
    </div>
  );
}
