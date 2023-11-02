import AdminCommonButton from "@/common/AdminCommonButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { googleAnalyticsFormSchema } from "@/services/forms/formSchema";
import { ISiteSetting } from "@/types/commonTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SiteSettingTextField from "../SiteSetting/SiteSettingTextField";
import AuthService from "@/services/AuthServices";
import { useRouter } from "next/router";

export default function GoogleAnalytics({objGoogleAnalyticsSetting, onComplete}: any) {
  const [objSiteSetting, setObjSiteSetting] = useState({
    beforeTag: "",
    afterTag: "",
  });
  const router = useRouter();

  const objForm = useForm({
    defaultValues: objSiteSetting,
    resolver: yupResolver(googleAnalyticsFormSchema),
  });

  const onSave = async (data: any) => {
    try {
      const io: any = new FormData();
      io.append("before_body", data.beforeTag);
      io.append("after_body", data.afterTag);
      let token = AuthService.getToken();
      io.append("token", token);
      
      const res = await ApiService.saveAdminGoogleAnalyticsInfo(io);

      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  useEffect(() => {
    if (objGoogleAnalyticsSetting && Object.keys(objGoogleAnalyticsSetting).length > 0) {
      objForm.reset(objGoogleAnalyticsSetting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objGoogleAnalyticsSetting]);

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <SiteSettingTextField
          title={<div className="flex items-center mb-1">Before Body Tag</div>}
          name="beforeTag"
          placeHolder="Before Body Tag Google Analytics"
          isTextArea={true}
        />
        <SiteSettingTextField
          title={<div className="flex items-center mb-1">After Body Tag</div>}
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
