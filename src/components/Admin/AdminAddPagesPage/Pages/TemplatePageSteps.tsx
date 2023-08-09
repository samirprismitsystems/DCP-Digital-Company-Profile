import AddMore from "@/common/AddMore";
import RemoveItem from "@/common/RemoveItem";
import TextField from "@/common/TextFields/TextField";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function TemplatePageSteps() {
  const objForm = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "steps",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-6" key={index}>
          <TextField
            name={`steps.${index}.stepstitle`}
            title="Title"
            placeHolder="Enter Step Title"
          />
          <div className="xs:flex sm:flex-wrap w-full justify-start items-center">
            <TextField
              name={`steps.${index}.stepsdesc`}
              isRequired={true}
              title="Description"
              rows={3}
              placeHolder="Enter Step Description"
              isTextArea={true}
            />
            <div>
              <RemoveItem
                onChange={() => {
                  remove(index);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <AddMore
        onClick={() => {
          append({
            stepstitle: "",
            stepsdesc: "",
          });
        }}
      />
    </>
  );
}
