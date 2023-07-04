import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  title: string | ReactNode;
  type?: string;
  placeHolder?: string;
}

export default function TextField(props: ITextField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
        <label
          className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none ${
            errors[props.name]?.message && "text-red-600"
          }`}
        >
          {props.title}
        </label>
        <input
          className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
          type={props.type}
          placeholder={props.placeHolder ? props.placeHolder : ""}
          {...register(props.name)}
        />
      </div>
    </>
  );
}
