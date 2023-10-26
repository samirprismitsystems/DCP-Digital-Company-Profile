import styles from "./styles/socialLinkPage.module.scss"
import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import Loading from "@/common/Loading";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import SocialLinkIcon from "./SocialLinkIcons/SocialLinkIcon";
import SocialLinkTextField from "./SocialLinkTextField/SocialLinkTextField";
import { useRouter } from "next/router";

export default function SocialLinksPage() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstSocialData, setLstSocialData] = useState<any>([]);
  const router = useRouter();
  const objForm = useForm({
    resolver: yupResolver(socialLinkFormSchema),
  });

  type IFormData = yup.InferType<typeof socialLinkFormSchema>;
  const onSave: any = async (data: IFormData) => {
    try {
      let pureFormData: any = [];
      if (isUpdate) {
        if (data.socialData) {
          data.socialData.forEach((item) => {
            if (item.social_id) {
              let objItem = {
                company_id: Utils.getCompanyID(),
                company_social_id: item.company_social_id,
                created_at: item.created_at,
                link: item.link,
                social_id: item.social_id,
                socialmedia_color: item.socialmedia_color,
                socialmedia_logo: item.socialmedia_logo,
                socialmedia_name: item.socialmedia_name,
                updated_at: item.updated_at,
              };

              pureFormData.push(objItem);
            }
          });
        }
      } else {
        if (data.socialData) {
          data.socialData.forEach((item) => {
            let objItem = null;
            lstSocialData.forEach((socialItem: any) => {
              if (parseInt(socialItem.social_id) === parseInt(item.social_id)) {
                objItem = {
                  created_at: item.created_at,
                  link: item.link,
                  socialmedia_id: item.social_id,
                  socialmedia_color: item.socialmedia_color,
                  socialmedia_logo: item.socialmedia_logo,
                  socialmedia_name: item.socialmedia_name,
                  updated_at: item.updated_at,
                };
              } else {
                objItem = {
                  created_at: socialItem.created_at,
                  link: socialItem.link,
                  socialmedia_id: socialItem.social_id,
                  socialmedia_color: socialItem.socialmedia_color,
                  socialmedia_logo: socialItem.socialmedia_logo,
                  socialmedia_name: socialItem.socialmedia_name,
                  updated_at: socialItem.updated_at,
                };
              }
              if (objItem) {
                pureFormData.push(objItem);
              }
            });
          });
        }
      }

      const uniqueArray = pureFormData?.concat(
        lstSocialData?.filter(
          (item: any) =>
            !pureFormData
              ?.map((obj: any) => obj.company_social_id)
              ?.includes(item.company_social_id)
        ) as any
      );

      let io = new FormData();
      io.append("socialdata", JSON.stringify(uniqueArray));
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", isUpdate as any);
      const res = await ApiService.saveSocialLinks(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        loadData();
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getSocialLinksData();
      if (!res.error) {
        if (res.social && res.social.length > 0) {
          setIsUpdate(true);
          setLstSocialData(res.social);
        } else {
          setIsUpdate(false);
          setLstSocialData([
            {
              social_id: "1",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Facebook",
              socialmedia_logo: "faFacebookF",
              socialmedia_color: "1",
            },
            {
              social_id: "2",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Instagram",
              socialmedia_logo: "faInstagram",
              socialmedia_color: "2",
            },
            {
              social_id: "3",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Linkedin",
              socialmedia_logo: "faLinkedinIn",
              socialmedia_color: "3",
            },
            {
              social_id: "4",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Twitter",
              socialmedia_logo: "faTwitter",
              socialmedia_color: "4",
            },
            {
              social_id: "5",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Whatsapp Group Link",
              socialmedia_logo: "faWhatsapp",
              socialmedia_color: "5",
            },
            {
              social_id: "6",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Pintrest",
              socialmedia_logo: "faPinterestP",
              socialmedia_color: "8",
            },
            {
              social_id: "7",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Telegram Channel",
              socialmedia_logo: "faTelegramPlane",
              socialmedia_color: "6",
            },
            {
              social_id: "8",
              link: "",
              created_at: "2023-09-08 11:38:47",
              updated_at: "2023-09-08 11:42:20",
              socialmedia_name: "Youtube",
              socialmedia_logo: "faYoutube",
              socialmedia_color: "8",
            },
          ]);
        }
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Social Media Links</div>
        <div className="h4 mt-1">Please fill up your social media links</div>
      </div>
      <FormProvider {...objForm}>
        <form
          className="relative digital_profile_form form_shadow bg-white rounded-2xl p-10 block mb-16 pb-0"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
          onSubmit={objForm.handleSubmit(onSave)}
        >
          {isLoading && (
            <div className="py-[10rem]">
              <Loading />
            </div>
          )}
          {lstSocialData && lstSocialData.length > 0 && (
            <div className="row -mr-3 -ml-3">
              {lstSocialData.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <SocialLinkTextField
                      title={
                        <div className={`${styles.socialLinkIconItems} flex items-center mb-1`}>
                          <SocialLinkIcon
                            icons={item.socialmedia_logo}
                            color={item.socialmedia_color}
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
                          link: event.target.value || "",
                        };
                        objForm.setValue(`socialData.${index}` as any, objItem);
                      }}
                      name={item.socialmedia_logo}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {lstSocialData && lstSocialData.length > 0 && (
            <div className="w-full flex justify-end">
              <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
                <DashboardCommonButtons />
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </>
  );
}
