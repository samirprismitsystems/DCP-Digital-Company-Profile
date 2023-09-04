import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Pages() {
  const [selectedFooterPage, setSelectedFooterPage] = useState("");
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
            objForm.setValue("selectedFooterPage", e.target.value);
            setSelectedFooterPage(e.target.value);
          }}
          value={objForm.getValues("selectedFooterPage") || selectedFooterPage}
        >
          <option value={"Saving Account"}>Simple footer</option>
          <option value={"Current Account"}>Modern footer</option>
          <option value={"Salary Account"}>Creative footer</option>
        </select>
      </div>
    </div>
  );
}
