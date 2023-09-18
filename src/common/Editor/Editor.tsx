import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import CustomQuill from "../../common/Editor/CustomQuill";

export default function Editor(props: { savePath: string }) {
  const objForm = useFormContext();
  const [value, setValue] = useState(objForm.watch("pageContent"));

  useEffect(() => {
    if (objForm.getValues(props.savePath)) {
      setValue(objForm.getValues(props.savePath));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.savePath]);

  return (
    <div className="w-full pb-14 form_field border-b-[1px] border-b-companyFormFieldBorderColor hover:border-b-black focus-within:border-b-black xs:mb-8 sm:mb-16 transition-all duration-300 ease-linear">
        <CustomQuill
        value={value || ""}
        onChange={(content: any) => {
          setValue(content);
          objForm.setValue(props.savePath, content);
        }}
      />
      ;
    </div>
  );
}
