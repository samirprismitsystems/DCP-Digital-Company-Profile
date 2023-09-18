import AddMore from "@/common/AddMore";
import RemoveItem from "@/common/RemoveItem";
import TextField from "@/common/TextFields/TextField";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function TemplateFeatures() {
  const objForm = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "features_data",
  });

  return (
    <>
      <TextField
        name="featureTitle"
        isRequired={true}
        placeHolder="Enter Feature Title"
        title={"Title"}
        type="text"
      />
      <TextField
        name="featureSubTitle"
        isRequired={true}
        placeHolder="Enter Feature Sub Title"
        title={"Sub Title"}
        type="text"
      />
      <TextField
        name="featureDescription"
        isRequired={true}
        placeHolder="Enter Feature Description"
        title={"Description"}
        isTextArea={true}
      />
      <TextField
        name="featureBtnTitle"
        isRequired={true}
        placeHolder="Enter Button Title"
        title={"Button Title"}
      />
      <TextField
        name="featureBtnLink"
        isRequired={true}
        placeHolder="Enter Button Link"
        title={"Button Link"}
      />
      <h3 className="pb-6">Logo And Text</h3>
      {fields.map((item, index) => (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-6" key={index}>
          <TextField
            name={`features_data.${index}.featuretext`}
            title="Text"
            placeHolder="Enter Feature Text"
          />
          <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2">
            <TextField
              name={`features_data.${index}.featurelogo`}
              isRequired={true}
              title="Logo"
              placeHolder="Enter Feature Logo"
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
            featuretext: "",
            featurelogo: "",
          });
        }}
      />
    </>
  );
}
