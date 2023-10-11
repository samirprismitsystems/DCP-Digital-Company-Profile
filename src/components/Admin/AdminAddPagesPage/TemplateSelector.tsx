import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function TemplateSelector() {
  const [selectedOption, setSelectedOption] = useState("");
  const objForm = useFormContext();

  return (
    <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
      <label
        className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none`}
      >
        Select Page Templates
      </label>
      <div className="flex">
        <select
          className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
          onChange={(e: any) => {
            objForm.setValue("selectedOption", e.target.value);
            setSelectedOption(e.target.value);
          }}
          value={objForm.getValues("selectedOption") || selectedOption}
        >
          <option value={1}>Default Template</option>
          <option value={2}>Template 2</option>
          <option value={3}>Landing Page Template</option>
        </select>
      </div>
    </div>
  );
}
