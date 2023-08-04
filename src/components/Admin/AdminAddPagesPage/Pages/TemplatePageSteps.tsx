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
        <div className="grid grid-cols-2 gap-6">
          <TextField
            name={`steps.${index}.stepstitle`}
            title="Step Title"
            placeHolder="Enter Step Title"
          />
          <div className="flex flex-wrap w-full justify-start items-center">
            <TextField
              name={`steps.${index}.stepsdesc`}
              isRequired={true}
              title="Step Description"
              rows={3}
              placeHolder="Enter Step Description"
              isTextArea={true}
            />
            <div>
              <button
                className="add_btn cursor-pointer  bg-white text-black rounded-xl sm:min-w-[15rem] font-semibold py-5 px-9 text-3xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light"
                style={{
                  transition: "all 0.3s linear",
                }}
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex w-full xs:flex-wrap sm:flex-nowrap space-x-6">
        <button
          className="add_btn cursor-pointer  bg-white text-black rounded-xl sm:min-w-[15rem] xs:min-w-full font-semibold py-5 px-9 text-3xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light"
          style={{
            transition: "all 0.3s linear",
          }}
          type="button"
          onClick={() =>
            append({
              stepstitle: "",
              stepsdesc: "",
            })
          }
        >
          Add More
        </button>
      </div>
    </>
  );
}
