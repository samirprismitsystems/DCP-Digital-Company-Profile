import AddMore from "@/common/AddMore";
import RemoveItem from "@/common/RemoveItem";
import TextField from "@/common/TextFields/TextField";
import { useFieldArray, useFormContext } from "react-hook-form";
import TemplateImageUploader from "../Templates/TemplateImageUploader";

export default function FAQs() {
  const objForm = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "faq_data",
  });

  return (
    <>
      <TextField
        name="faqTitle"
        title="Title"
        placeHolder="Enter FAQ Title"
        isRequired={true}
      />
      <TextField
        name="faqDesc"
        title="Description"
        placeHolder="Enter FAQ Description"
        isRequired={true}
      />
      <TemplateImageUploader
        uploadPath="landingpageoriginal"
        savePath="faqImage"
        title="Upload FAQ Image"
      />
      <h3 className="pb-6">Accordion</h3>
      {fields.map((item, index) => (
        <div className="flex xs:flex-col xl:flex-row" key={index}>
          <div className="xs:w-full xl:w-[35%]">
            <TextField
              name={`faq_data.${index}.faqtitle`}
              title="Title"
              placeHolder="Enter Accordion Title"
            />
          </div>
          <div className="w-full xl:ml-8 flex xs:flex-col xl:flex-row xs:mb-16 sm:mb-0">
            <div className="w-full">
              <TextField
                name={`faq_data.${index}.faqdesc`}
                isRequired={true}
                title="Description"
                placeHolder="Enter Accordion Description"
                isTextArea={true}
                rows={3}
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
            faqtitle: "",
            faqdesc: "",
          });
        }}
      />
    </>
  );
}
