import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import Loading from "@/common/Loading";
import Utils from "@/services/Utils";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import SocialLinkIcon from "./SocialLinkIcons/SocialLinkIcon";
import SocialLinkTextField from "./SocialLinkTextField/SocialLinkTextField";
import styles from "./styles/socialLinkPage.module.scss";

export default function FormField(props: any) {
    const objForm = useForm({
        resolver: yupResolver(socialLinkFormSchema),
    });

    return (
        <>
            <FormProvider {...objForm}>
                <form
                    className="relative digital_profile_form form_shadow bg-white rounded-2xl p-10 block mb-16 pb-0"
                    style={{
                        boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
                    }}
                    onSubmit={objForm.handleSubmit(props.onSave)}
                >
                    {props.isLoading && (
                        <div className="py-[10rem]">
                            <Loading />
                        </div>
                    )}

                    {props.lstSocialData && props.lstSocialData.length > 0 && (
                        <div className="row -mr-3 -ml-3">
                            {props.lstSocialData.map((item: any, index: number) => {
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

                    {props.lstSocialData && props.lstSocialData.length > 0 && (
                        <div className="w-full flex justify-end">
                            <div className="xs:w-full sm:w-[60%] lg:w-[100%] xl:w-[80%]">
                                <DashboardCommonButtons />
                            </div>
                        </div>
                    )}
                </form>
            </FormProvider>
        </>
    )
}
