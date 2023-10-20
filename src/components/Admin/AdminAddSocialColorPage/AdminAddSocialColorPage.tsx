import AdminBackButton from "@/common/AdminBackButton";
import AdminCommonButton from "@/common/AdminCommonButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminSocialMediaClassFormSchema } from "@/services/forms/formSchema";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import UpdateAndShowSocialColor from "./UpdateAndShowSocialColor";
export default function AdminAddSocialColorPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [lstSocialClasses, setLstSocialClasses] = useState<any[]>([]);

  const objForm = useForm({
    defaultValues: {
      socialcolor: lstSocialClasses || [
        {
          created_at: "",
          socialmedia_color_id: "",
          socialmedia_color_name: "",
          updated_at: "",
        },
      ],
      socialMediaClass: "",
    },
    resolver: yupResolver(adminSocialMediaClassFormSchema),
  });

  const loadData = async () => {
    try {
      const res = await ApiService.getAdminSocialColors();
      if (!res.error) {
        if (res.socialcolor) {
          const arr = res.socialcolor.map((item: any) => ({
            ...item,
            isDelete: true,
          }));

          setLstSocialClasses((prevState: any) => ([
            {
              socialmedia_color_name: "#3b5999",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#e4405f",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#0077b5",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#55acee",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#25d366",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#bd081c",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#0088cc",
              isDelete: false,
            },
            {
              socialmedia_color_name: "#cd201f",
              isDelete: false,
            },
            ...arr,
          ]));
        }

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
      if (!selectedColor) {
        Utils.showErrorMessage('Please select color first!')
        return null;
      }
      const io: any = new FormData();
      io.append("socialmedia_color_name", selectedColor);
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
      <AdminBackButton backPath="socialmediaadd" index={2} />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Social Media Color Class</div>
      </div>
      <div className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl pb-0 block">
        <form onSubmit={objForm.handleSubmit(newItemSave)}>
          <div className="row -mr-3 -ml-3">
            <HexColorPicker color={selectedColor || ""} onChange={(value: any) => {
              setSelectedColor(value)
            }} />;
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
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            {fields.map((item: any, index: number) => (
              <tbody
                key={index}
                className="text-2xl text-left border-0 p-[10px] align-middle text-secondary-dark"
              >
                {index % 2 == 0 ? (
                  <tr className="bg-white border-0">
                    <td className="flex p-4 text-2xl form_field border-b-[1px] hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
                      {/* <div className={`${item.isDelete && "hover:cursor-pointer"} inline w-8 h-8 px-4 mr-4`} style={{ backgroundColor: item.socialmedia_color_name }}></div> */}
                      <UpdateAndShowSocialColor index={index} color={item.socialmedia_color_name} isDelete={item.isDeleted} />
                    </td>

                    <td className="p-4 text-2xl">
                      {item.isDelete && (
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
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr className="bg-primary-main border-red-100">
                    <td className="flex p-4 text-2xl form_field border-b-[1px] hover:border-b-black focus-within:border-b-black  pb-3 mb-16 transition-all duration-300 ease-linear">
                      <UpdateAndShowSocialColor index={index} color={item.socialmedia_color_name} isDelete={item.isDeleted}  />
                      {/* <div style={{ backgroundColor: item.socialmedia_color_name }} className={`w-8 h-8 inline px-4 mr-4 ${item.isDelete && "hover:cursor-pointer"}`}></div>
                      <input
                        type="text"
                        disabled
                        className="w-full text-2xl focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight']"
                        {...objForm.register(
                          `socialcolor.${index}.socialmedia_color_name`
                        )}
                      /> */}
                    </td>

                    <td className="p-4 text-2xl">
                      {item.isDelete && (
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
                      )}
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
