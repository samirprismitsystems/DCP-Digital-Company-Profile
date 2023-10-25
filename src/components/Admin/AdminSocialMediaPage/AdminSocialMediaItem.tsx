import AddMore from "@/common/AddMore";
import AdminCommonButton from "@/common/AdminCommonButton";
import Loading from "@/common/Loading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminSocialMediaInfo } from "@/services/forms/formSchema";
import { ISocialMediaColors } from "@/types/commonTypes";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import UpdateAndShowSocialColor from "../AdminAddSocialColorPage/UpdateAndShowSocialColor";
import AuthService from "@/services/AuthServices";
import { useRouter } from "next/router";

export default function AdminSocialMediaItem() {
  const [lstSocialColor, setLstSocialColor] = useState<ISocialMediaColors[]>();
  const [lstSocialMedia, setLstSocialMedia] = useState<any>([
    {
      socialmedia_logo: "",
      socialmedia_name: "",
      socialmedia_color: "",
    },
  ]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getColors = async () => {
    try {
      const res = await ApiService.getAdminSocialMediaColors();
      if (!res.error) {
        setLstSocialColor(res.socialcolor);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  // useEffect(() => {
  //   getColors();
  // }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAdminSocialMediaInfo();
      if (!res.error) {
        if (res.social.length > 0) {
          setLstSocialMedia(res.social);
          return null;
        }
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onComplete = async () => {
    await loadData();
    // getColors();
  };

  const objForm = useForm({
    defaultValues: {
      adminSocialMediaInfo: lstSocialMedia,
    },
    resolver: yupResolver(adminSocialMediaInfo),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "adminSocialMediaInfo",
  });

  type IFormData = yup.InferType<typeof adminSocialMediaInfo>;

  const onSubmit = async (data: IFormData) => {
    try {
      const oldData = data.adminSocialMediaInfo?.filter((item: any) => {
        if (item.socialmedia_id) {
          return item;
        }
      });

      let io: any = new FormData();
      io.append("isupdate", true);
      io.append("social_data", JSON.stringify(oldData));
      let token = AuthService.getToken();
      io.append("token", token);
      
      const res = await ApiService.saveAdminSocialMediaInfo(io);

      const newData = data.adminSocialMediaInfo?.filter((item: any) => {
        if (!item.socialmedia_id) {
          return item;
        }
      });

      newData?.forEach((item) => {
        if (!Boolean(item.socialmedia_color)) {
          item.socialmedia_color = "#000000";
        }
      });

      if (newData && newData.length > 0) {
        let newIO: any = new FormData();
        newIO.append("isupdate", false);
        newIO.append("social_data", JSON.stringify(newData));

        const res = await ApiService.saveAdminSocialMediaInfo(newIO);
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

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/');
    }
  };

  const itemDelete = async (index: number) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteAdminSocialMediaItem(index);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          setLstSocialMedia([
            {
              socialmedia_logo: "",
              socialmedia_name: "",
              socialmedia_color: "",
            },
          ]);
          return null;
        }

        throw new Error(res.message);
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
    if (lstSocialMedia && lstSocialMedia.length > 0) {
      objForm.reset({
        adminSocialMediaInfo: lstSocialMedia,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstSocialMedia]);

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
                <div className='item_no flex justify-between items-center mb-2 font-["GothamRoundedLight"]  '>
                  <h5 className="capitalize font-medium">
                    Social
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      if (item.socialmedia_id) {
                        itemDelete(item.socialmedia_id);
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
                    <input
                      type="text"
                      className="bg-whiteSmoke placeholder:text-info-main py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4  font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic  "
                      placeholder="Enter Social Name"
                      {...objForm.register(
                        `adminSocialMediaInfo.${index}.socialmedia_name`
                      )}
                      defaultValue={item.socialmedia_name || "N/A"}
                      required={true}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="bg-whiteSmoke placeholder:text-info-main py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4  font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic  "
                      placeholder="Enter Social Logo Class"
                      {...objForm.register(
                        `adminSocialMediaInfo.${index}.socialmedia_logo`
                      )}
                      defaultValue={item.socialmedia_logo || "N/A"}
                      required={true}
                    />
                  </div>
                  {/* adminSocialMediaInfo.${indexNumber}.socialmedia_color */}
                  {/* <AdminSocialLinkSelector
                    selectedColorId={item.socialmedia_color}
                    lstSocialMediaColor={lstSocialColor}
                    indexNumber={index}
                  /> */}
                  <UpdateAndShowSocialColor index={index} color={item.socialmedia_color}   />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full xs:flex-wrap sm:flex-nowrap sm:space-x-6">
          <AddMore
            onClick={() =>
              append({
                socialmedia_logo: "",
                socialmedia_name: "",
                socialmedia_color: "",
              })
            }
          />
          <AdminCommonButton />
        </div>
      </form>
    </FormProvider>
  );
}
