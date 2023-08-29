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
    <div className="w-full pb-8">
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
