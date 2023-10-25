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
import AuthService from "@/services/AuthServices";

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
      isEdit: isEdit,
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
        if (typeof data.metaImage === "object") {
          io.append("meta_image", data.metaImage);
          io.append("meta_image_name", objPageInfo?.meta_image);
        } else {
          io.append("meta_image_name", data.metaImage);
        }
        io.append("page_content", data.pageContent);

        if (isEdit) {
          io.append("page_id", objPageInfo?.page_id);
        }
        let token = AuthService.getToken();
        io.append("token", token);
        
        const res = await ApiService.createCompanyPage(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          if (isEdit) {
            objForm.reset();
            router.push("/admindashboard/pages");
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

        // return null;
        if (data.footerPages && typeof data.footerPages !== "string") {
          let arr: any = [];
          data.footerPages.forEach((item: any) => {
            let footerID = item.value;
            arr.push(footerID);
          });
          io.append("footerpages", JSON.stringify(arr));
        } else {
          io.append("footerpages", data.footerPages);
        }
        io.append("isupdate", isEdit ? true : false);
        io.append("page_slug", Utils.generatePageSlug(data.pageName));
        io.append("page_name", data.pageName);
        io.append("template_name", "landingpage_template");
        io.append("meta_title", data.metaTitle);
        io.append("meta_description", data.metaDesc);
        if (typeof data.metaImage == "object") {
          io.append("meta_image", data.metaImage);
        } else {
          io.append("meta_image_name", data.metaImage);
        }
        io.append("meta_keywords", data.metaKeywords);
        io.append("hometitle", data.homeTitle);
        io.append("homesubtitle", data.homeSubTitle);
        io.append("homedesc", data.homeDesc);
        if (typeof data.homeImage == "object") {
          io.append("homeimg", data.homeImage);
        } else {
          io.append("homeimgpic", data.homeImage);
        }
        io.append("homebtntitle", data.homeBtnTitle);
        io.append("homebtnlink", data.homeBtnLink);
        io.append("steps", JSON.stringify(data.steps));
        io.append("cardtitle1", data.cardTitle1);
        io.append("carddesc1", data.cardContent1);
        if (typeof data.cardImage1 == "object") {
          io.append("cardimg1", data.cardImage1);
        } else {
          io.append("cardimg1pic", data.cardImage1);
        }
        io.append("cardtitle2", data.cardTitle2);
        io.append("carddesc2", data.cardContent2);
        if (typeof data.cardImage2 == "object") {
          io.append("cardimg2", data.cardImage2);
        } else {
          io.append("cardimg2pic", data.cardImage2);
        }
        io.append("featuretitle", data.featureTitle);
        io.append("featuresubtitle", data.featureSubTitle);
        io.append("featuredesc", data.featureDescription);
        io.append("featurebtntitle", data.featureBtnTitle);
        io.append("featurebtnlink", data.featureBtnLink);
        io.append("logoandtext", JSON.stringify(data.features_data));
        io.append("faqtitle", data.faqTitle);
        io.append("faqdesc", data.faqDesc);
        if (typeof data.faqImage == "object") {
          io.append("faqimg", data.faqImage);
        } else {
          io.append("faqimgpic", data.faqImage);
        }

        io.append("accordian", JSON.stringify(data.faq_data));
        io.append("fttitle", data.freeTrailTitle);
        io.append("ftdesc", data.freeTrailDesc);
        if (typeof data.freeTrailImage == "object") {
          io.append("ftimg", data.freeTrailImage);
        } else {
          io.append("ftimgpic", data.freeTrailImage);
        }

        io.append("ftbtntitle", data.freeTrailBtnTitle);
        io.append("ftbtnlink", data.freeTrailBtnLink);
        io.append("reviewtitle", data.reviewTitle);
        io.append("reviewsubtitle", data.reviewSubTitle);
        io.append("reviewdesc", data.reviewDescription);
        io.append("contacttitle", data.contactTitle);
        io.append("contactdesc", data.contactDescription);
        let token = AuthService.getToken();
        io.append("token", token);

        if (isEdit) {
          io.append("page_id", objPageInfo?.page_id);
        }

        const res = await ApiService.createCompanyPage(io);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          if (isEdit) {
            objForm.reset();
            loadData();
            router.push("/admindashboard/pages");
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
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/');
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
        isEdit: isEdit,
        pageTitle: objPageInfo.page_content.page_title || "",
        pageContent: objPageInfo.page_content.page_content || "",
        metaTitle: objPageInfo.meta_title || "",
        metaDesc: objPageInfo.meta_description || "",
        metaKeywords: objPageInfo.meta_keywords || "",
        metaImage: objPageInfo.meta_image || "",
        homeTitle: objPageInfo.page_content.hometitle || "",
        homeSubTitle: objPageInfo.page_content.homesubtitle || "",
        homeDesc: objPageInfo.page_content.homedesc || "",
        homeImage: objPageInfo.page_content.homeimg || "",
        homeBtnTitle: objPageInfo.page_content.homebtntitle || "",
        homeBtnLink: objPageInfo.page_content.homebtnlink || "",
        cardTitle1: objPageInfo.page_content.cardtitle1 || "",
        cardTitle2: objPageInfo.page_content.cardtitle2 || "",
        cardImage1: objPageInfo.page_content.cardimg1 || "",
        cardImage2: objPageInfo.page_content.cardimg2 || "",
        cardContent1: objPageInfo.page_content.carddesc1 || "",
        cardContent2: objPageInfo.page_content.carddesc2 || "",
        featureTitle: objPageInfo.page_content.featuretitle || "",
        featureSubTitle: objPageInfo.page_content.featuresubtitle || "",
        featureDescription: objPageInfo.page_content.featuredesc || "",
        featureBtnTitle: objPageInfo.page_content.featurebtntitle || "",
        featureBtnLink: objPageInfo.page_content.featurebtnlink || "",
        faqTitle: objPageInfo.page_content.faqtitle || "",
        faqDesc: objPageInfo.page_content.faqdesc || "",
        faqImage: objPageInfo.page_content.faqimg || "",
        freeTrailTitle: objPageInfo.page_content.fttitle || "",
        freeTrailDesc: objPageInfo.page_content.ftdesc || "",
        freeTrailImage: objPageInfo.page_content.ftimg || "",
        freeTrailBtnTitle: objPageInfo.page_content.ftbtntitle || "",
        freeTrailBtnLink: objPageInfo.page_content.ftbtnlink || "",
        reviewTitle: objPageInfo.page_content.reviewtitle || "",
        reviewSubTitle: objPageInfo.page_content.reviewsubtitle || "",
        reviewDescription: objPageInfo.page_content.reviewdesc || "",
        contactTitle: objPageInfo.page_content.contacttitle || "",
        contactDescription: objPageInfo.page_content.contactdesc || "",
        footerPages: objPageInfo.page_content.footerpages || "",
        steps: JSON.parse(objPageInfo.page_content.steps || "{}") || [
          {
            stepstitle: "",
            stepsdesc: "",
          },
        ],
        features_data: JSON.parse(
          objPageInfo.page_content.logoandtext || "{}"
        ) || [
          {
            featuretext: "",
            featurelogo: "",
          },
        ],
        faq_data: JSON.parse(objPageInfo.page_content.accordian || "{}") || [
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
