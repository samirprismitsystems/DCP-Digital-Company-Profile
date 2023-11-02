import AddMore from "@/common/AddMore";
import AdminCommonButton from "@/common/AdminCommonButton";
import Loading from "@/common/Loading";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { themeFormSchema } from "@/services/forms/formSchema";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";

export default function AdminThemeItem() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstTheme, setLstTheme] = useState<any>([
    {
      theme_name: "",
      theme_image: "",
    },
  ]);
  const router = useRouter();
  
  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAdminThemes();
      if (!res.error) {
        setLstTheme(res.theme);
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

  const onComplete = () => {
    loadData();
  };

  const objForm = useForm({
    defaultValues: {
      theme_data: lstTheme,
    },
    resolver: yupResolver(themeFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "theme_data",
  });

  type IFormData = yup.InferType<typeof themeFormSchema>;
  const onSubmit = async (data: IFormData) => {
    try {
      // const oldData = data.theme_data;
      const oldData = data.theme_data?.filter((item: any) => {
        if (item.theme_id) {
          return item;
        }
      });
      const newData = data.theme_data?.filter((item: any) => {
        if (!item.theme_id) {
          return item;
        }
      });

      let io: any = new FormData();
      let imgcount = 0;

      if (oldData) {
        for (let index = 0; index < oldData.length; index++) {
          const item = oldData[index];
          if (typeof item.theme_image === "object") {
            io.append(`images${index}`, item.theme_image);
            imgcount += 1;
            continue;
          } else {
            io.append(`images${index}`, "undefined");
            imgcount += 1;
          }
        }
      }
      if (imgcount > 0) {
        io.append("imgcount", imgcount);
      } else {
        io.append("imgcount", 0);
      }

      if (oldData) {
        oldData.forEach((item: any) => {
          if (typeof item.theme_image === "object") {
            item.theme_image = item.theme_image?.name;
          }
        });
      }

      io.append("isupdate", true);
      io.append("theme_data", JSON.stringify(oldData));
      let token = AuthService.getToken();
      io.append("token", token);

      const res = await ApiService.saveAdminThemeInfo(io);

      if (newData && newData.length > 0) {
        let newIO: any = new FormData();
        let newImgcount = 0;

        for (let index = 0; index < newData.length; index++) {
          const item = newData[index];
          if (typeof item.theme_image === "object") {
            newIO.append(`images${index}`, item.theme_image);
            newImgcount += 1;
            continue;
          } else {
            newIO.append(`images${index}`, "undefined");
            newImgcount += 1;
            break;
          }
        }

        if (newImgcount > 0) {
          newIO.append("imgcount", newImgcount);
        }
        newIO.append("isupdate", false);
        newIO.append("theme_data", JSON.stringify(newData));
        newIO.append("token", token);
        const res = await ApiService.saveAdminThemeInfo(newIO);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          return null;
        }
      }

      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }

      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }

      if (res.message !== "Empty theme Data") throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  const itemDelete = async (index: number) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteAdminTheme(index);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          setLstTheme([
            {
              theme_image: "",
              theme_name: "",
            },
          ]);
          return null;
        }

        if (res.message !== "Empty Theme Data") throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const deleteDummyItem = async (index: number) => {
    const isValid = await Utils.showWarningMessage("Do you want to delete?");
    if (isValid.isConfirmed) {
      remove(index);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (lstTheme && lstTheme.length > 0) {
      objForm.reset({
        theme_data: lstTheme,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstTheme]);

  if (isLoading)
    return (
      <div className="py-[10rem]">
        <Loading />
      </div>
    );

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSubmit)}>
        <div className="grid mb-16 gap-6 max-w-full xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-2">
          {fields.map((item: any, index: number) => {
            return (
              <div key={item.id}>
                <div className='item_no flex justify-between items-center mb-2 font-["GothamRoundedLight"]'>
                  <h5 className="capitalize font-medium">
                    Theme
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      if (item.theme_id) {
                        itemDelete(item.theme_id);
                      } else {
                        deleteDummyItem(index);
                      }
                    }}
                    type="button"
                    className="before:content-normal text-black font-bold text-3xl p-2 border-0 bg-[#eeeeee]"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
                <div
                  className="item_div border-solid border-[1px] border-[#ccc] bg-[rgb(255, 255, 255)] p-6 rounded-[0.6rem]"
                  style={{
                    boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div>
                    <RHFImageUploader
                      srcPath={item.theme_image}
                      savePath={`theme_data.${index}.theme_image`}
                      label="Upload Theme Image"
                      folderPath="themes"
                      isIDNotAvailable={true}
                      imgPlaceholder={
                        <div className="placeholder_tex flex items-center justify-center w-full h-full text-center select-none opacity-30">
                          <h3>Please Upload Theme Image</h3>
                        </div>
                      }
                    />
                    <input
                      type="text"
                      className="py-5 bg-whiteSmoke px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 placeholder:text-info-main font-normal w-full  text-3xl text-secondary-main focus-within:outline-none not-italic  "
                      placeholder="Enter Theme Name"
                      {...objForm.register(`theme_data.${index}.theme_name`)}
                      defaultValue={item.theme_name}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full xs:flex-wrap sm:flex-nowrap sm:space-x-6">
          <AddMore
            onClick={() => {
              append({
                theme_name: "",
                theme_image: "",
              });
            }}
          />
          <AdminCommonButton />
        </div>
      </form>
    </FormProvider>
  );
}
