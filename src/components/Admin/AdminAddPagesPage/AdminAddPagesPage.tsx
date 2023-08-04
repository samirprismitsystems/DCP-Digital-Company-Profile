import AdminBackButton from "@/common/AdminBackButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TemplateSelector from "./TemplateSelector";
import DefaultTemplate from "./Templates/DefaultTemplate";
import LandingPageTemplate from "./Templates/LandingPageTemplate";
import TemplateTwo from "./Templates/TemplateTwo";

export default function AdminAddPagesPage() {
  const objForm = useForm({
    defaultValues: {
      selectedOption: 1,
      pageName: "",
      steps: [
        {
          stepstitle: "",
          stepsdesc: "",
        },
      ],
      features_data: [
        {
          featuretext: "",
          featurelogo: "",
        },
      ],
    },
  });
  const dispatch = useDispatch();
  const selectedOption = objForm.watch("selectedOption");

  const onSave: SubmitHandler<any> = async (data: any) => {
    try {
      if (parseInt(data.selectedOption) === 1) {
        const io: any = new FormData();
        io.append("page_slug", Utils.getPageSlug(data.pageTitle));
        io.append("isupdate", false);
        io.append("template_name", "default_template");
        io.append("page_name", data.pageTitle);
        io.append("page_title", data.pageTitle);
        io.append("meta_title", data.metaTitle);
        io.append("meta_description", data.metaDesc);
        io.append("meta_keywords", data.metaKeywords);
        io.append("meta_image", data.metaImage);
        io.append("page_content", data.pageContent);

        const res = await ApiService.createCompanyPage(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          dispatch(
            setSelectedObj({
              selectedIndex: 3,
              selectedTitle: "pages",
            })
          );
          dispatch(setRouteIsChanged(true));
          window.history.replaceState("pages", "", `/admindashboard/pages`);
          return null;
        }

        throw new Error(res.message);
      }

      if (parseInt(data.selectedOption) === 3) {
        console.log("333333", data);
      }

      objForm.reset();
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  return (
    <>
      <AdminBackButton backPath="pages" index={3} />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Pages</div>
      </div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSave as any)}>
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
            {selectedOption == 1 && <DefaultTemplate />}
            {selectedOption == 2 && <TemplateTwo />}
            {selectedOption == 3 && <LandingPageTemplate />}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
