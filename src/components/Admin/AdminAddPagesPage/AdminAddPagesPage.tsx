import AdminBackButton from "@/common/AdminBackButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { IPagesPageInfo } from "@/types/commonTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TemplateSelector from "./TemplateSelector";
import DefaultTemplate from "./Templates/DefaultTemplate";
import LandingPageTemplate from "./Templates/LandingPageTemplate";
import TemplateTwo from "./Templates/TemplateTwo";

export default function AdminAddPagesPage({
  objPageInfo,
}: {
  objPageInfo?: IPagesPageInfo;
}) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(Boolean(objPageInfo));
  const objForm = useForm<any>({
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
      faq_data: [
        {
          faqtitle: "",
          faqdesc: "",
        },
      ],
    },
  });

  const dispatch = useDispatch();
  const selectedOption = objForm.watch("selectedOption");

  const loadData = async () => {
    try {
      await ApiService.getAllPagesInfo();
      await ApiService.getAdminSocialColors();
      await ApiService.getAllCompanies();
      await ApiService.getAllAdminUserReview();
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onSave: SubmitHandler<any> = async (data: any) => {
    try {
      if (parseInt(data.selectedOption) === 1) {

        const io: any = new FormData();
        io.append("page_slug", Utils.generatePageSlug(data.pageTitle));
        io.append("isupdate", isEdit ? true : false);
        io.append("template_name", "default_template");
        io.append("page_name", data.pageName);
        io.append("page_title", data.pageTitle);
        io.append("meta_title", data.metaTitle);
        io.append("meta_description", data.metaDesc);
        io.append("meta_keywords", data.metaKeywords);
        io.append("meta_image", data.metaImage);
        io.append("page_content", data.pageContent);

        const res = await ApiService.createCompanyPage(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          if (isEdit) {
            objForm.reset();
            router.back();
            return null;
          }
          dispatch(
            setSelectedObj({
              selectedIndex: 3,
              selectedTitle: "pages",
            })
          );
          dispatch(setRouteIsChanged(true));
          if (typeof window !== "undefined") {
            window.history.replaceState("pages", "", `/admindashboard/pages`);
          }
          return null;
        }

        objForm.reset();

        throw new Error(res.message);
      }

      if (parseInt(data.selectedOption) === 3) {
        const io: any = new FormData();

        io.append("page_slug", Utils.generatePageSlug(data.pageName));
        io.append("page_name", data.pageName);
        io.append("template_name", "landingpage_template");
        io.append("meta_title", data.metaTitle);
        io.append("meta_description", data.metaDesc);
        io.append("meta_image", data.metaImage);
        io.append("meta_keywords", data.metaKeywords);
        io.append("hometitle", data.homeTitle);
        io.append("homesubtitle", data.homeSubTitle);
        io.append("homedesc", data.homeDesc);
        io.append("homeimg", data.homeImage);
        io.append("homebtntitle", data.homeBtnTitle);
        io.append("steps", JSON.stringify(data.steps));
        io.append("cardtitle1", data.cardTitle1);
        io.append("carddesc1", data.cardContent1);
        io.append("cardimg1", data.cardImage1);
        io.append("cardtitle2", data.cardTitle2);
        io.append("carddesc2", data.cardContent2);
        io.append("cardimg2", data.cardImage2);
        io.append("featuretitle", data.featureTitle);
        io.append("featuresubtitle", data.featureSubTitle);
        io.append("featuredesc", data.featureDescription);
        io.append("featurebtntitle", data.featureBtnTitle);
        io.append("featurebtnlink", data.featureBtnLink);
        io.append("logoandtext", JSON.stringify(data.features_data));
        io.append("faqtitle", data.faqTitle);
        io.append("faqdesc", data.faqDesc);
        io.append("faqimg", data.faqImage);
        io.append("accordian", JSON.stringify(data.faq_data));
        io.append("fttitle", data.freeTrailTitle);
        io.append("ftdesc", data.freeTrailDesc);
        io.append("ftimg", data.freeTrailImage);
        io.append("ftbtntitle", data.freeTrailBtnTitle);
        io.append("ftbtnlink", data.freeTrailBtnLink);
        io.append("reviewtitle", data.reviewTitle);
        io.append("reviewsubtitle", data.reviewSubTitle);
        io.append("reviewdesc", data.reviewDescription);
        io.append("contacttitle", data.contactTitle);
        io.append("contactdesc", data.contactDescription);
        io.append("footerpages", data.contactDescription);

        const res = await ApiService.createCompanyPage(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          loadData();
          dispatch(
            setSelectedObj({
              selectedIndex: 3,
              selectedTitle: "pages",
            })
          );
          dispatch(setRouteIsChanged(true));
          if (typeof window !== "undefined") {
            window.history.replaceState("pages", "", `/admindashboard/pages`);
          }
          return null;
        }

        objForm.reset();
        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    if (isEdit && objPageInfo && Object.keys(objPageInfo).length > 0) {
      let defaultTemplate = 0;
      if (objPageInfo.template_name === "template2") {
        defaultTemplate = 2;
      } else if (objPageInfo.template_name === "landingpage_template") {
        defaultTemplate = 3;
      } else {
        defaultTemplate = 1;
      }

      objForm.reset({
        selectedOption: defaultTemplate,
        pageName: objPageInfo.page_name || "",
        pageTitle: objPageInfo.page_content.page_title || "",
        pageContent: objPageInfo.page_content.page_content || "",
        metaTitle: objPageInfo.meta_title || "",
        metaDesc: objPageInfo.meta_description || "",
        metaKeywords: objPageInfo.meta_keywords || "",
        metaImage: objPageInfo.meta_image || "",
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
        faq_data: [
          {
            faqtitle: "",
            faqdesc: "",
          },
        ],
      });
    }
  }, []);

  return (
    <>
      <AdminBackButton backPath="pages" index={3} />
      <div className="tab_titles mb-16 -mt-4">
        <div className="h2">{isEdit ? "Update Pages" : "Add Pages"}</div>
      </div>
      <FormProvider {...objForm}>
        <form onSubmit={objForm.handleSubmit(onSave as any)}>
          <div className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl pb-0 block">
            <div
              className={`xs:w-full ${
                isEdit ? "lg:w-full" : "lg:w-4/6"
              } lg:m-auto grid ${
                isEdit ? "xs:grid-cols-1" : "xs:grid-cols-1 md:grid-cols-2"
              } gap-14`}
            >
              <TextField
                name="pageName"
                title={"Page Name"}
                placeHolder="Enter Page Name"
                isRequired={true}
              />
              {!isEdit && <TemplateSelector />}
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
