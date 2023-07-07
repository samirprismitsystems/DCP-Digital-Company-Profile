import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import { socialLinkFormSchema } from "@/services/forms/formSchema";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import ThemeCards from "./ThemeCards/ThemeCards";

export default function ThemesPage() {
  const objForm = useForm();

  type IFormData = yup.InferType<typeof socialLinkFormSchema>;
  const onSave: any = async (data: IFormData) => {
    console.log(data);
  };

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Themes For Company Profile Page</div>
        <div className="h4 mt-1">Select Themes</div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3 grid grid-cols-5 gap-8 pb-16">
          <ThemeCards />
          <ThemeCards />
          <ThemeCards />
          <ThemeCards />
          <div></div>
        </div>
        <div className="w-full flex justify-end">
          <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
            <DashboardCommonButtons />
          </div>
        </div>
      </div>
    </>
  );
}
