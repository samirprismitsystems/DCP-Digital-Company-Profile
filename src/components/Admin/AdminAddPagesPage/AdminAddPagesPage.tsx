import AdminBackButton from "@/common/AdminBackButton";
import TextField from "@/common/TextFields/TextField";
import { FormProvider, useForm } from "react-hook-form";
import TemplateSelector from "./TemplateSelector";

export default function AdminAddPagesPage() {
  const objForm = useForm({
    defaultValues: {
      selectedOption: 1,
    },
  });
  const selectedOption = objForm.watch("selectedOption");

  return (
    <>
      <AdminBackButton backPath="pages" index={3} />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Pages</div>
      </div>
      <FormProvider {...objForm}>
        <div className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl pb-0 block">
          <div className="w-4/6 m-auto grid grid-cols-2 gap-14">
            <TextField
              name="pageName"
              title={"Page Name"}
              placeHolder="Enter Page Name"
              isRequired={true}
            />
            <TemplateSelector />
          </div>
          
        </div>
      </FormProvider>
    </>
  );
}
