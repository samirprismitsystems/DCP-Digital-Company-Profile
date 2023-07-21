import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { serviceFormSchema } from "@/services/forms/formSchema";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ServiceItem() {
  const [lstServiceData, setLstServiceData] = useState<any>([
    {
      service_desc: "",
      service_image: "",
      service_name: "",
      service_price: "",
    },
  ]);

  const loadData = async () => {
    try {
      const res = await ApiService.getServicePageDetails();
      if (!res.error) {
        setLstServiceData(res.service);
        return null;
      }

      if (res.message !== "Empty Product Data") throw new Error(res.error);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const objForm = useForm({
    defaultValues: {
      service_data: lstServiceData,
    },
    resolver: yupResolver(serviceFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "service_data",
  });

  type IFormData = yup.InferType<typeof serviceFormSchema>;
  const onSubmit = async (data: IFormData) => {
    try {
      const oldData = data.service_data?.filter((item: any) => {
        if (item.service_id) {
          return item;
        }
      });

      let io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", true);
      let imgcount = 0;

      if (oldData) {
        oldData.forEach((item: any, index: any) => {
          if (typeof item.service_image === "object") {
            io.append(`oldimages${index}`, item.service_image);
          } else {
            io.append(`oldimages${index}`, "undefined");
          }
          imgcount += 1;
        });
      }
      if (imgcount > 0) {
        io.append("imgcount", imgcount);
      }
      io.append("service_data", JSON.stringify(oldData));
      const res = await ApiService.saveServicePageDetails(io);

      const newData = data.service_data?.filter((item: any) => {
        if (!item.service_id) {
          return item;
        }
      });

      if (newData && newData.length > 0) {
        let newIO: any = new FormData();
        let newImgcount = 0;
        newData.forEach((item: any, index: number) => {
          if (typeof item.service_image === "object") {
            newIO.append(`oldimages${index}`, item.service_image);
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
        newIO.append("service_data", JSON.stringify(newData));

        const res = await ApiService.saveServicePageDetails(newIO);
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

      if (res.message !== "Empty Service Data") throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const itemDelete = async (index: number) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteServiceItem(index);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          setLstServiceData([
            {
              service_desc: "",
              service_image: "",
              service_name: "",
              service_price: "",
            },
          ]);
          return null;
        }

        if (res.message !== "Empty Product Data") throw new Error(res.message);
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
    if (lstServiceData && lstServiceData.length > 0) {
      objForm.reset({
        service_data: lstServiceData,
      });
    }
  }, [lstServiceData]);

  const onComplete = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSubmit)}>
        <div className="grid mb-16 gap-6 max-w-full xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-2">
          {fields.map((item: any, index) => {
            return (
              <div key={item.id}>
                <div className='item_no flex justify-between items-center mb-2 font-["GothamRoundedLight"]  '>
                  <h5 className="capitalize font-medium">
                    Service
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      if (item.service_id) {
                        itemDelete(item.service_id);
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
                      srcPath={item.service_image}
                      savePath={`service_data.${index}.service_image`}
                      label="Upload Service Image"
                      folderPath="service"
                    />
                    <input
                      type="text"
                      className="imageUploaderInputs placeholder:text-gray-400 py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic bg-transparent "
                      placeholder="Enter Service Name"
                      {...objForm.register(
                        `service_data.${index}.service_name`
                      )}
                      defaultValue={item.service_name}
                      required
                    />
                    <input
                      type="number"
                      className="imageUploaderInputs placeholder:text-gray-400 py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic bg-transparent "
                      placeholder="Enter Service MRP"
                      required
                      {...objForm.register(
                        `service_data.${index}.service_price`
                      )}
                      defaultValue={item.service_price}
                    />
                    <textarea
                      className="imageUploaderInputs placeholder:text-gray-400 py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4  font-normal w-full text-3xl text-secondary-main  focus-within:outline-none not-italic bg-transparent"
                      required
                      {...objForm.register(
                        `service_data.${index}.service_desc`
                      )}
                      placeholder="Enter Service Description"
                      defaultValue={item.service_desc}
                      cols={0}
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full xs:flex-wrap sm:flex-nowrap space-x-6">
          <button
            className="add_btn cursor-pointer  bg-white text-black rounded-xl sm:min-w-[15rem] xs:min-w-full font-semibold py-5 px-9 text-3xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light "
            style={{
              transition: "all 0.3s linear",
            }}
            onClick={() =>
              append({
                service_desc: "",
                service_price: "",
                service_name: "",
                service_image: "",
              })
            }
          >
            Add More
          </button>
          <DashboardCommonButtons />
        </div>
      </form>
    </FormProvider>
  );
}
