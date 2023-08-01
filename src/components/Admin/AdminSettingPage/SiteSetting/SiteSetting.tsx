import AdminCommonButton from "@/common/AdminCommonButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminSiteSettingFormSchema } from "@/services/forms/formSchema";
import { ISiteSetting } from "@/types/commonTypes";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { ISiteSettingState } from "../SwitchComponent";
import FooterPageSelector from "./FooterPageSelector";
import SiteSettingImageUploader from "./SiteSettingImageUploader";
import SiteSettingTextField from "./SiteSettingTextField";

export default function SiteSetting() {
  const [objSiteSetting, setObjSiteSetting] = useState<ISiteSettingState>();
  const objForm = useForm({
    defaultValues: {
      facebook: "",
      instagram: "",
      linkedIn: "",
      selectedOption: "",
      siteDescription: "",
      siteEmail: "",
      siteTitle: "",
    },
    resolver: yupResolver(adminSiteSettingFormSchema),
  });

  type IFormData = yup.InferType<typeof adminSiteSettingFormSchema>;
  const loadData = async () => {
    try {
      const res = await ApiService.getAdminSiteSettingInfo();
      if (!res.error) {
        const result: ISiteSetting[] = res.setting;
        const objItem = {
          siteLogo: result[0].setting_value || "",
          siteTitle: result[1].setting_value || "",
          siteDescription: result[2].setting_value || "",
          facebook: result[3].setting_value || "",
          instagram: result[4].setting_value || "",
          linkedIn: result[5].setting_value || "",
          siteEmail: result[8].setting_value || "",
          selectedOption: result[9].setting_value || "",
        };
        setObjSiteSetting(objItem);
        return null;
      }

      throw new Error("Error occurred while getting social media links!");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const onSave: any = async (data: IFormData) => {
    try {
      const io: any = new FormData();
      io.append("site_logo", data.siteLogo);
      io.append("site_title", data.siteTitle);
      io.append("site_desc", data.siteDescription);
      io.append("site_email", data.siteEmail);
      io.append("facebookurl", data.facebook);
      io.append("instaurl", data.instagram);
      io.append("linkedurl", data.linkedIn);
      io.append("footer_pages", data.selectedOption);

      const res = await ApiService.saveAdminSiteSetting(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (objSiteSetting && Object.keys(objSiteSetting).length > 0) {
      objForm.reset(objSiteSetting);
    }
  }, [objSiteSetting]);

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <div className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pt-0 pb-0 block">
          <div className="row -mr-3 -ml-3">
            <SiteSettingImageUploader
              folderPath="setting"
              savePath="siteLogo"
              srcPath={(objSiteSetting && objSiteSetting.siteLogo) || ""}
            />
            <SiteSettingTextField
              title={<div className="flex items-center mb-1">Site Title</div>}
              name="siteTitle"
              placeHolder="Enter The Site Title"
            />
            <SiteSettingTextField
              title={
                <div className="flex items-center mb-1">Site Description</div>
              }
              name="siteDescription"
              placeHolder="Enter The Site Description"
            />
            <SiteSettingTextField
              title={
                <div className="flex items-center mb-1">Site Email Address</div>
              }
              name="siteEmail"
              placeHolder="Enter The Site Email Address"
            />
            <FooterPageSelector />
            <SiteSettingTextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className={`social-link-icons socialmedia_color_1`}
                    icon={faFacebookF}
                  />
                  Facebook
                </div>
              }
              name="facebook"
              placeHolder="Enter The Facebook URL"
            />
            <SiteSettingTextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className={`social-link-icons socialmedia_color_2`}
                    icon={faInstagram}
                  />
                  Instagram
                </div>
              }
              name="instagram"
              placeHolder="Enter The Instagram URL"
            />
            <SiteSettingTextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className={`social-link-icons socialmedia_color_3`}
                    icon={faLinkedinIn}
                  />
                  LinkedIn
                </div>
              }
              name="linkedIn"
              placeHolder="Enter The LinkedIn URL"
            />
          </div>
          <div className="w-full flex justify-end">
            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
              <AdminCommonButton hideNextButton={true} />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
