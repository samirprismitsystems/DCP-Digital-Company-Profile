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
        <div className="flex xs:flex-col xl:flex-row" key={index}>
          <div className="xs:w-full xl:w-[40%] xs:mr-0 lg:mr-8">
            <TextField
              name={`steps.${index}.stepstitle`}
              title="Title"
              placeHolder="Enter Step Title"
            />
          </div>
          <div className="xs:flex xs:flex-col md:flex-row sm:flex-wrap w-full justify-start xs:items-start md:items-center">
            <div className="xs:w-full xl:w-[70%] xs:mr-0 xl:mr-8">
              <TextField
                name={`steps.${index}.stepsdesc`}
                isRequired={true}
                title="Description"
                rows={3}
                placeHolder="Enter Step Description"
                isTextArea={true}
              />
            </div>
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
