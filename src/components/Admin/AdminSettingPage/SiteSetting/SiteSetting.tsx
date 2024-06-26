import AdminCommonButton from "@/common/AdminCommonButton";
import PageCircularLoading from "@/common/PageCircularLoading";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { ISiteSettingState } from "../SwitchComponent";
import FooterPageSelector from "./FooterPageSelector";
import SiteSettingImageUploader from "./SiteSettingImageUploader";
import SiteSettingTextField from "./SiteSettingTextField";
import styles from "./styles/siteSetting.module.scss";
import AuthService from "@/services/AuthServices";

export default function SiteSetting({ onComplete, objSiteSetting }: any) {
  const router = useRouter();
  const objForm = useForm({
    defaultValues: {
      facebook: "",
      instagram: "",
      linkedIn: "",
      siteDescription: "",
      siteEmail: "",
      siteTitle: "",
      footer_pages: [],
    },
    resolver: yupResolver(adminSiteSettingFormSchema),
  });

  const onSave: any = async (data: any) => {
    try {
      const io: any = new FormData();
      if (data.footer_pages && typeof data.footer_pages !== "string") {
        let arr: any = [];
        data.footer_pages?.forEach((item: any) => {
          let footerID = item.value;
          arr.push(footerID);
        });
        io.append("footer_pages", JSON.stringify(arr));
      } else {
        io.append("footer_pages", data.footer_pages);
      }
      io.append("site_title", data.siteTitle);
      io.append("site_desc", data.siteDescription);
      io.append("site_email", data.siteEmail);
      io.append("facebookurl", data.facebook);
      io.append("instaurl", data.instagram);
      io.append("linkedurl", data.linkedIn);
      if (typeof data.siteLogo == "object") {
        io.append("site_logo", data.siteLogo);
      } else {
        io.append("logo", data.siteLogo);
      }
      let token = AuthService.getToken();
      io.append("token", token);


      const res = await ApiService.saveAdminSiteSetting(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        // router.reload();
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  useEffect(() => {
    if (objSiteSetting && Object.keys(objSiteSetting).length > 0) {
      objForm.reset(objSiteSetting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objSiteSetting]);

  if (!objSiteSetting) return <PageCircularLoading />;
  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <div className="mb-16 digital_profile_form form_shadow bg-white rounded-2xl p-10 pt-0 pb-0 block">
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
                    className={`${styles.socialLinkColors} ${styles.socialmedia_color_1}`}
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
                    className={`${styles.socialLinkColors} ${styles.socialmedia_color_2}`}
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
                    className={`${styles.socialLinkColors} ${styles.socialmedia_color_3}`}
                    icon={faLinkedinIn}
                  />
                  LinkedIn
                </div>
              }
              name="linkedIn"
              placeHolder="Enter The LinkedIn URL"
            />
          </div>
          <AdminCommonButton
            saveBtnTitle="Save"
            isLeft={true}
            hideNextButton={true}
          />
        </div>
      </form>
    </FormProvider>
  );
}
