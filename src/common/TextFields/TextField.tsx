import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  title?: string | ReactNode;
  type?: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  placeHolder?: string;
  rows?: number;
}

export default function TextField(props: ITextField) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 xs:mb-8 sm:mb-16 transition-all duration-300 ease-linear">
        {props.title && (
          <label
            className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none ${
              errors[props.name]?.message && "text-red-600"
            }`}
          >
            {props.title}
          </label>
        )}
        {/* <input
          className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
          type={props.type || "text"}
          placeholder={props.placeHolder ? props.placeHolder : ""}
          {...register(props.name)}
        /> */}
        {props.isTextArea ? (
          <textarea
            rows={props.rows ? props.rows : 5}
            required={props.isRequired}
            className="w-full h-auto text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            placeholder={props.placeHolder ? props.placeHolder : ""}
            {...register(props.name)}
          />
        ) : (
          <input
            required={props.isRequired}
            className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
            type={props.type || "text"}
            placeholder={props.placeHolder ? props.placeHolder : ""}
            {...register(props.name)}
          />
        )}
      </div>
    </>
  );
}
