import { ReactNode, useState } from "react";

interface ITextField {
  name: string;
  title: string | ReactNode;
  type?: string;
  placeHolder?: string;
  value?: any;
  onchange: (event: any) => void;
}

export default function SocialLinkTextField(props: ITextField) {
  const [text, setText] = useState(props.value);
  return (
    <>
      <div className="form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
        <label
          className={`font-['GothamRoundedLight'] font-light text-3xl text-black w-full mb-4 inline-block select-none`}
        >
          {props.title}
        </label>
        <input
          className="w-full text-3xl mt-1 focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight'] "
          type={props.type}
          value={text || ""}
          required={true}
          placeholder={props.placeHolder ? props.placeHolder : ""}
          onChange={(e: any) => {
            setText(e.target.value);
            props.onchange(e);
          }}
        />
      </div>
    </>
  );
}
