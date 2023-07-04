import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import TextField from "@/common/TextFields/TextField";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faTelegramPlane,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export default function SocialLinksPage() {
  const router = useRouter();
  const objForm = useForm();

  type IFormData = yup.InferType<typeof socialLinkFormSchema>;
  const onSave: any = async (data: IFormData) => {
    console.log(data);
  };
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
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#3b5999] social-link-icons"
                    icon={faFacebookF}
                  />
                  Facebook
                </div>
              }
              placeHolder="Add Facebook"
              name="facebookLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#e4405f] social-link-icons"
                    icon={faInstagram}
                  />
                  Instagram
                </div>
              }
              placeHolder="Add Instagram"
              name="instagramLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#0077b5] social-link-icons"
                    icon={faLinkedinIn}
                  />
                  LinkedIn
                </div>
              }
              placeHolder="Add LinkedIn"
              name="linkedInLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#55acee] social-link-icons"
                    icon={faTwitter}
                  />
                  Twitter
                </div>
              }
              placeHolder="Add Twitter"
              name="twitterLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#25d366] social-link-icons"
                    icon={faWhatsapp}
                  />
                  WhatsApp Group Link
                </div>
              }
              placeHolder="Add WhatsApp Group Link"
              name="whatsAppLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#bd081c] social-link-icons"
                    icon={faPinterestP}
                  />
                  Pintrest
                </div>
              }
              placeHolder="Add Pintrest"
              name="pintrestLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#0088cc] social-link-icons"
                    icon={faTelegramPlane}
                  />
                  Telegram Channel
                </div>
              }
              placeHolder="Add Telegram"
              name="telegramLink"
            />
            <TextField
              title={
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon
                    className="text-[#cd201f] social-link-icons"
                    icon={faYoutube}
                  />
                  Youtube
                </div>
              }
              placeHolder="Add Youtube"
              name="youtubeLink"
            />
          </div>
          <DashboardCommonButtons />
        </form>
      </FormProvider>
    </>
  );
}
