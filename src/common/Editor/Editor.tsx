import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import CustomQuill from "../../common/Editor/CustomQuill";

export default function Editor(props: { savePath: string }) {
  const [value, setValue] = useState("");
  const objForm = useFormContext();

  return (
    <div className="w-full pb-8">
      <CustomQuill
        value={value}
        onChange={(content: any) => {
          setValue(content);
          objForm.setValue(props.savePath, content);
        }}
      />
      ;
    </div>
  );
}
