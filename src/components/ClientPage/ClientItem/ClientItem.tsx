import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { clientFormSchema } from "@/services/forms/formSchema";
import { IClients } from "@/types/commonTypes";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ClientItem({
  lstClient,
  onComplete,
}: {
  lstClient: IClients[];
  onComplete: () => void;
}) {
  const objForm = useForm({
    defaultValues: {
      client_data: lstClient || [
        {
          client_name: "",
          client_image: "",
        },
      ],
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
      console.log(data);
      let io = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append(
        "isupdate",
        (lstClient && lstClient.length > 0 ? true : false) as any
      );
      io.append("client_data", JSON.stringify(data.client_data));
      const res = await ApiService.saveServicePageDetails(io);
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
                    Client
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
                      imagePath={item.client_image}
                      savePath={`client_data.${index}.client_image`}
                      label="Upload Client Image"
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
          <button
            className="add_btn cursor-pointer  bg-white text-black rounded-xl sm:min-w-[15rem] xs:min-w-full font-semibold py-5 px-9 text-3xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light "
            style={{
              transition: "all 0.3s linear",
            }}
            onClick={() =>
              append({
                client_name: "",
                client_image: "",
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
