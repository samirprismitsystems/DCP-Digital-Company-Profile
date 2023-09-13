import AddMore from "@/common/AddMore";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import Loading from "@/common/Loading";
import RHFImageUploader from "@/common/RHFImageUploader";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { productFormSchema } from "@/services/forms/formSchema";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ProductItem() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstProducts, setLstProducts] = useState<any>([
    {
      product_name: "",
      product_price: "",
      product_desc: "",
      product_image: "",
    },
  ]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getProductPageDetails();
      if (!res.error) {
        if (res.product.length > 0) {
          setLstProducts(res.product);
        }
        return null;
      }
      if (res.message !== "Empty Product Data") throw new Error(res.message);
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
      product_data: lstProducts,
    },
    resolver: yupResolver(productFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "product_data",
  });

  type IFormData = yup.InferType<typeof productFormSchema>;
  const onSubmit = async (data: IFormData) => {
    try {
      const oldData = data.product_data?.filter((item: any) => {
        if (item.product_id) {
          return item;
        }
      });

      let io: any = new FormData();
      io.append("user_id", AuthService.getUserEmail());
      io.append("isupdate", true);
      let imgcount = 0;

      if (oldData) {
        oldData.forEach((item: any, index: any) => {
          if (typeof item.product_image === "object") {
            io.append(`oldimages${index}`, item.product_image);
          } else {
            io.append(`oldimages${index}`, "undefined");
          }
          imgcount += 1;
        });
      }
      if (imgcount > 0) {
        io.append("imgcount", imgcount);
      }
      io.append("product_data", JSON.stringify(oldData));
      const res = await ApiService.saveProductPageDetails(io);

      const newData = data.product_data?.filter((item: any) => {
        if (!item.product_id) {
          return item;
        }
      });

      if (newData && newData.length > 0) {
        let newIO: any = new FormData();
        let newImgcount = 0;
        newData.forEach((item: any, index: number) => {
          if (typeof item.product_image === "object") {
            newIO.append(`oldimages${index}`, item.product_image);
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
        newIO.append("product_data", JSON.stringify(newData));

        const res = await ApiService.saveProductPageDetails(newIO);
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

      if (res.message !== "Empty Product Data") throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const itemDelete = async (index: number) => {
    try {
      const isValid = await Utils.showWarningMessage("Do you want to delete?");
      if (isValid.isConfirmed) {
        const res = await ApiService.deleteProductItem(index);
        if (!res.error) {
          Utils.showSuccessMessage(res.message);
          onComplete();
          setLstProducts([
            {
              product_name: "",
              product_price: "",
              product_desc: "",
              product_image: "",
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
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lstProducts && lstProducts.length > 0) {
      objForm.reset({
        product_data: lstProducts,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstProducts]);

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
                    Product
                    <span className="inline-block ml-2">#{index + 1}</span>
                  </h5>
                  <button
                    onClick={() => {
                      if (item.product_id) {
                        itemDelete(item.product_id);
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
                      srcPath={item.product_image}
                      savePath={`product_data.${index}.product_image`}
                      label="Upload Product Image"
                      folderPath="product"
                      imgPlaceholder={
                        <div className="w-full h-full flex items-center justify-center placeholder_tex text-center select-none opacity-30">
                          <h3>Please Upload Product Image</h3>
                        </div>
                      }
                    />
                    <input
                      type="text"
                      className="imageUploaderInputs placeholder:text-gray-400 py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4  font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic bg-transparent "
                      placeholder="Enter Product Name"
                      {...objForm.register(
                        `product_data.${index}.product_name`
                      )}
                      defaultValue={item.product_name}
                      required
                    />
                    <input
                      type="number"
                      className="py-5 px-4 border-[1px] imageUploaderInputs placeholder:text-gray-400 border-solid border-[#ccc] rounded-lg mt-4  font-normal w-full text-3xl  text-secondary-main focus-within:outline-none not-italic bg-transparent "
                      placeholder="Enter Product MRP"
                      required
                      {...objForm.register(
                        `product_data.${index}.product_price`
                      )}
                      defaultValue={item.product_price}
                    />
                    <textarea
                      className="py-5 px-4 border-[1px] imageUploaderInputs placeholder:text-gray-400 border-solid border-[#ccc] rounded-lg mt-4 font-normal w-full text-3xl text-secondary-main  focus-within:outline-none not-italic bg-transparent"
                      required
                      {...objForm.register(
                        `product_data.${index}.product_desc`
                      )}
                      placeholder="Enter Product Description"
                      defaultValue={item.product_desc}
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
          <AddMore
            onClick={() =>
              append({
                product_desc: "",
                product_price: "",
                product_name: "",
                product_image: "",
              })
            }
          />
          <DashboardCommonButtons />
        </div>
      </form>
    </FormProvider>
  );
}
