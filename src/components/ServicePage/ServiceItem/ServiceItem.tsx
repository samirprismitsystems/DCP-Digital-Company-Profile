import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { serviceFormSchema } from "@/services/forms/formSchema";
import { IServicePageData } from "@/types/commonTypes";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ServiceItem({
  lstServiceData,
  onComplete,
}: {
  lstServiceData: IServicePageData[];
  onComplete: () => void;
}) {
  console.log(lstServiceData);
  const objForm = useForm({
    defaultValues: {
      service_data: lstServiceData || [
        {
          service_desc: "",
          service_image: "",
          service_name: "",
          service_price: "",
        },
      ],
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
      let io = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", true as any);
      io.append("service_data", JSON.stringify(data.service_data));
      const res = await ApiService.saveServicePageDetails(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.error);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const itemDelete = async (index: number) => {
    const isValid = await Utils.showWarningMessage("Do you want to delete?");
    if (isValid.isConfirmed) {
      remove(index);
    }
  };

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSubmit)}>
        <div className="grid mb-16 gap-6 max-w-full xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-2">
          {fields.map((item, index) => {
            return (
              <div key={item.id}>
                <div className='item_no flex justify-between items-center mb-2 font-["GothamRoundedLight"]  '>
                  <h5 className="capitalize font-medium">
                    Service
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      itemDelete(index);
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
                      imagePath={item.service_image}
                      savePath={`service_data.${index}.service_image`}
                      label="Upload Service Image"
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
