import AdminBackButton from "@/common/AdminBackButton";
import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminSocialMediaClassFormSchema } from "@/services/forms/formSchema";
import { ISocialMediaColors } from "@/types/commonTypes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
export default function AdminAddSocialColorPage() {
  const [lstSocialClasses, setLstSocialClasses] = useState<
    ISocialMediaColors[]
  >([
    {
      created_at: "",
      socialmedia_color_id: "",
      socialmedia_color_name: "",
      updated_at: "",
    },
  ]);
  const router = useRouter();
  const objForm = useForm({
    defaultValues: {
      socialcolor: lstSocialClasses,
      socialMediaClass: "",
    },
    resolver: yupResolver(adminSocialMediaClassFormSchema),
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getAdminSocialColors();
      if (!res.error) {
        setLstSocialClasses(res.socialcolor);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const onDelete = async (itemID: string) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteAdminSocialMediaClass(itemID);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          return null;
        }

        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const newItemSave = async (data: any) => {
    try {
      const io: any = new FormData();
      io.append("socialmedia_color_name", data.socialMediaClass);
      const res = await ApiService.saveAdminSocialMediaColorInfo(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onUpdate = async (data: any) => {
    try {
      const io: any = new FormData();
      io.append("socialcolor_data", JSON.stringify(data.socialcolor));
      const res = await ApiService.updateAdminSocialClass(io);
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
    if (lstSocialClasses && lstSocialClasses.length > 0) {
      objForm.reset({
        socialcolor: lstSocialClasses,
        socialMediaClass: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstSocialClasses]);

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "socialcolor",
  });

  return (
    <FormProvider {...objForm}>
      <AdminBackButton backPath="socialmediaadd" index={2}/>
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Social Media Color Class</div>
      </div>
      <div className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl pb-0 block">
        <form onSubmit={objForm.handleSubmit(newItemSave)}>
          <div className="row -mr-3 -ml-3">
            <TextField
              isRequired={true}
              name="socialMediaClass"
              title="Social Media Color Class"
              placeHolder="Enter Social Media Class"
              type="text"
            />
            <div className="xs:w-full md:w-[70%]">
              <AdminCommonButton
                isLeft={true}
                hideNextButton={true}
                saveBtnTitle="Save"
              />
            </div>
          </div>
        </form>
        <form
          onSubmit={objForm.handleSubmit(onUpdate)}
          className="relative w-full overflow-x-auto rounded-2xl"
        >
          <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-50">
              <tr className="text-3xl text-primary-main bg-secondary-greyDark text-left p-3">
                <th className="p-4 font-medium">Social Media Color</th>
                <th className="p-4 font-medium">Delete</th>
              </tr>
            </thead>
            {fields.map((item, index: number) => (
              <tbody
                key={index}
                className="text-2xl text-left border-0 p-[10px] align-middle text-secondary-dark"
              >
                {index % 2 == 0 ? (
                  <tr className="bg-white border-0">
                    <td className="p-4 text-2xl form_field border-b-[1px] hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
                      <input
                        type="text"
                        className="w-full text-2xl focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight']"
                        {...objForm.register(
                          `socialcolor.${index}.socialmedia_color_name`
                        )}
                      />
                    </td>

                    <td className="p-4 text-2xl">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.socialmedia_color_id) {
                            onDelete(item.socialmedia_color_id);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr className="bg-primary-main border-red-100">
                    <td className="p-4 text-2xl form_field border-b-[1px] hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
                      <input
                        type="text"
                        className="w-full text-2xl focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight']"
                        {...objForm.register(
                          `socialcolor.${index}.socialmedia_color_name`
                        )}
                      />
                    </td>
                    <td className="p-4 text-2xl">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.socialmedia_color_id) {
                            onDelete(item.socialmedia_color_id);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="text-secondary-main text-3xl text-center"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
          </table>
          <div className="mt-8 pt-4 xs:w-full md:w-[70%]">
            <AdminCommonButton
              isLeft={true}
              saveBtnTitle="Update"
              hideNextButton={true}
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
