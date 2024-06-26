import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormField from "./FormField";

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
      let token = AuthService.getToken();
      io.append("token", token);

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
      <FormField isLoading={isLoading} onSave={onSave} lstSocialData={lstSocialData} />
    </>
  );
}
