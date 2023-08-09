import AdminCommonButton from "@/common/AdminCommonButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { googleAnalyticsFormSchema } from "@/services/forms/formSchema";
import { ISiteSetting } from "@/types/commonTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SiteSettingTextField from "../SiteSetting/SiteSettingTextField";

export default function GoogleAnalytics() {
  const [objSiteSetting, setObjSiteSetting] = useState({
    beforeTag: "",
    afterTag: "",
  });

  const objForm = useForm({
    defaultValues: objSiteSetting,
    resolver: yupResolver(googleAnalyticsFormSchema),
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getAdminSiteSettingInfo();
      if (!res.error) {
        const result: ISiteSetting[] = res.setting;
        const objItem = {
          beforeTag: result[6].setting_value || "",
          afterTag: result[7].setting_value || "",
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

  const onSave = async (data: any) => {
    try {
      console.log(data);
      const io: any = new FormData();
      io.append("before_body", data.beforeTag);
      io.append("after_body", data.afterTag);

      const res = await ApiService.saveAdminGoogleAnalyticsInfo(io);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objSiteSetting]);

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <SiteSettingTextField
          title={
            <div className="flex items-center mb-1">Site Email Address</div>
          }
          name="beforeTag"
          placeHolder="Before Body Tag Google Analytics"
          isTextArea={true}
        />
        <SiteSettingTextField
          title={
            <div className="flex items-center mb-1">Site Email Address</div>
          }
          name="afterTag"
          placeHolder="After Body Tag Google Analytics"
          isTextArea={true}
        />
        <AdminCommonButton
          saveBtnTitle="Save"
          isLeft={true}
          hideNextButton={true}
        />
      </form>
    </FormProvider>
  );
}
