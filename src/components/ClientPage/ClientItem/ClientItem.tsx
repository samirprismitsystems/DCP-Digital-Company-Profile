import AddMore from "@/common/AddMore";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import Loading from "@/common/Loading";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { clientFormSchema } from "@/services/forms/formSchema";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ClientItem() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstClient, setLstClient] = useState<any>([
    {
      client_name: "",
      client_logo: "",
    },
  ]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getClientsPageDetails();
      if (!res.error) {
        setLstClient(res.client);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const objForm = useForm({
    defaultValues: {
      client_data: lstClient,
    },
    resolver: yupResolver(clientFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "client_data",
  });

  type IFormData = yup.InferType<typeof clientFormSchema>;
  const onSubmit = async (data: IFormData) => {
    try {
      const oldData = data.client_data?.filter((item: any) => {
        if (item.client_id) {
          return item;
        }
      });

      let io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", true);
      let imgcount = 0;

      if (oldData) {
        oldData.forEach((item: any, index: any) => {
          if (typeof item.client_logo === "object") {
            io.append(`oldimages${index}`, item.client_logo);
          } else {
            io.append(`oldimages${index}`, "undefined");
          }
          imgcount += 1;
        });
      }
      if (imgcount > 0) {
        io.append("imgcount", imgcount);
      }
      io.append("client_data", JSON.stringify(oldData));
      const res = await ApiService.saveClientPageDetails(io);

      const newData = data.client_data?.filter((item: any) => {
        if (!item.client_id) {
          return item;
        }
      });

      if (newData && newData.length > 0) {
        let newIO: any = new FormData();
        let newImgcount = 0;
        newData.forEach((item: any, index: number) => {
          if (typeof item.client_logo === "object") {
            newIO.append(`oldimages${index}`, item.client_logo);
          } else {
            newIO.append(`oldimages${index}`, "undefined");
          }
          newImgcount += 1;
        });
        if (newImgcount > 0) {
          newIO.append("imgcount", newImgcount);
        }
        newIO.append("user_id", AuthService.getUserEmail());
        newIO.append("isupdate", false);
        newIO.append("client_data", JSON.stringify(newData));

        const res = await ApiService.saveClientPageDetails(newIO);
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

      if (res.message !== "Empty Client Data") throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const itemDelete = async (index: number) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteClientItem(index);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          setLstClient([
            {
              client_name: "",
              client_logo: "",
            },
          ]);
          return null;
        }

        if (res.message !== "Empty Client Data") throw new Error(res.message);
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
    if (lstClient && lstClient.length > 0) {
      objForm.reset({
        client_data: lstClient,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstClient]);

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
                    Client
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      if (item.client_id) {
                        itemDelete(item.client_id);
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
                      srcPath={item.client_logo}
                      savePath={`client_data.${index}.client_logo`}
                      label="Upload Client Image"
                      folderPath="client"
                      imgPlaceholder={
                        <div className="w-full h-full flex items-center justify-center placeholder_tex text-center select-none opacity-30">
                          <h3>Please Upload Client Image</h3>
                        </div>
                      }
                    />
                    <input
                      type="text"
                      className="py-5 imageUploaderInputs px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 bg-[#f6f4f4] placeholder:text-gray-400 font-normal w-full  text-3xl text-secondary-main focus-within:outline-none not-italic bg-transparent "
                      placeholder="Enter Client Name"
                      {...objForm.register(`client_data.${index}.client_name`)}
                      defaultValue={item.client_name}
                      required
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full xs:flex-wrap sm:flex-nowrap space-x-6">
          <AddMore
            onClick={() =>
              append({
                client_name: "",
                client_image: "",
              })
            }
          />
          <DashboardCommonButtons />
        </div>
      </form>
    </FormProvider>
  );
}
