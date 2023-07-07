import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import { ISocialLinks } from "@/types/sociallinks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import SocialLinkIcon from "./SocialLinkIcons/SocialLinkIcon";
import SocialLinkTextField from "./SocialLinkTextField/SocialLinkTextField";

export default function SocialLinksPage() {
  const [lstSocialData, setLstSocialData] = useState<ISocialLinks[]>();
  const objForm = useForm({
    resolver: yupResolver(socialLinkFormSchema),
  });

  type IFormData = yup.InferType<typeof socialLinkFormSchema>;

  const onSave: any = async (data: IFormData) => {
    try {
      let pureFormData = data.socialData?.filter((item) => {
        if (item.social_id && item.link) {
          return true;
        }
        return false;
      });

      const uniqueArray = pureFormData?.concat(
        lstSocialData?.filter(
          (item: any) =>
            !pureFormData
              ?.map((obj: any) => obj.company_social_id)
              ?.includes(item.company_social_id)
        ) as any
      );

      let io = new FormData();
      io.append("socialdata", JSON.stringify(uniqueArray || lstSocialData));
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", true as any);
      const res = await ApiService.saveSocialLinks(io);
      Utils.showSuccessMessage(res.message);
      loadData();
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const loadData = async () => {
    try {
      const res = await ApiService.getSocialLinksData();
      if (!res.error) {
        setLstSocialData(res.social);
        return null;
      }

      throw new Error("Error occurred while getting social media links!");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add social media links</div>
        <div className="h4 mt-1">
          Please fill up the your social media links
        </div>
      </div>
      <FormProvider {...objForm}>
        <form
          className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
          onSubmit={objForm.handleSubmit(onSave)}
        >
          <div className="row -mr-3 -ml-3">
            {lstSocialData &&
              lstSocialData.length > 0 &&
              lstSocialData.map((item, index: number) => {
                return (
                  <div key={index}>
                    <SocialLinkTextField
                      title={
                        <div className="flex items-center mb-1">
                          <SocialLinkIcon
                            icons={item.socialmedia_logo}
                            socialID={item.social_id}
                          />
                          {Utils.capitalizeFirstLetter(item.socialmedia_name)}
                        </div>
                      }
                      value={item.link || ""}
                      placeHolder={`Add ${Utils.capitalizeFirstLetter(
                        item.socialmedia_name
                      )}`}
                      onchange={(event: any) => {
                        let objItem = {
                          ...item,
                          link: event.target.value,
                        };
                        objForm.setValue(`socialData.${index}` as any, objItem);
                      }}
                      name={item.socialmedia_logo}
                    />
                  </div>
                );
              })}
          </div>
          <div className="w-full flex justify-end">
            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
              <DashboardCommonButtons />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
