import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import { productFormSchema } from "@/services/forms/formSchema";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function ProductPageItem() {
  const objForm = useForm({
    defaultValues: {
      product_data: [
        {
          product_name: "",
          product_price: "",
          product_desc: "",
          product_image: "",
        },
      ],
    },
    resolver: yupResolver(productFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: objForm.control,
    name: "product_data",
  });

  type IFormData = yup.InferType<typeof productFormSchema>;
  const onSubmit = (data: IFormData) => {
    console.log(data.product_data);
  };

  return (
    <div>
      <form onSubmit={objForm.handleSubmit(onSubmit)}>
        <div className="grid mb-16 gap-6 max-w-full xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-2">
          {fields.map((item, index) => (
            <div key={item.id}>
              <div className='item_no flex justify-between items-center mb-2 font-["GothamRoundedLight"]  '>
                <h5 className="capitalize font-medium">
                  Product
                  <span className="inline-block ml-2">#{index + 1}</span>
                </h5>
                <button
                  onClick={() => {
                    remove(index);
                  }}
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
                <div className="item_image mb-4 w-full h-[20rem] border-0 bg-primary-main">
                  <img
                    src={
                      (objForm.getValues(
                        `product_data.${index}.product_image`
                      ) as any) || "/assets/landing/doctor.png"
                    }
                    alt="image.png"
                    className="w-full h-full object-cover object-center align-middle border-none"
                  />
                </div>
                <div>
                  <div
                    className="upload_btn btn_100 site_btn relative z-0 border-[1px] border-solid  border-secondary-main bg-secondary-main text-white no-underline rounded-xl min-w-[12rem] py-3 px-10 not-italic font-normal text-center capitalize"
                    style={{
                      transition: "all",
                      transitionDuration: "0.3s",
                      animation: "linear",
                    }}
                  >
                    <input
                      type="file"
                      className="absolute w-full h-full top-0 left-0 z-[1] opacity-0 cursor-pointer not-italic font-light text-primary-light bg-transparent border-0"
                      {...objForm.register(
                        `product_data.${index}.product_image`
                      )}
                    />
                    <p className="text-2xl font-medium text-white">
                      Upload Product Image
                    </p>
                  </div>
                  <input
                    type="text"
                    className="py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 bg-[#f5f5f5] font-normal w-full text-3xl  text-primary-light focus-within:outline-none not-italic bg-transparent "
                    placeholder="Enter Product Name"
                    {...objForm.register(`product_data.${index}.product_name`)}
                    defaultValue={item.product_name}
                    required
                  />
                  <input
                    type="number"
                    className="py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 bg-[#f5f5f5] font-normal w-full text-3xl  text-primary-light focus-within:outline-none not-italic bg-transparent "
                    placeholder="Enter Product MRP"
                    required
                    {...objForm.register(`product_data.${index}.product_price`)}
                    defaultValue={item.product_price}
                  />
                  <textarea
                    className="py-5 px-4 border-[1px] border-solid border-[#ccc] rounded-lg mt-4 bg-[#f5f5f5] font-normal w-full text-3xl text-primary-light  focus-within:outline-none not-italic bg-transparent"
                    required
                    {...objForm.register(`product_data.${index}.product_desc`)}
                    placeholder="Enter Product Description"
                    defaultValue={item.product_desc}
                    cols={0}
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full xs:flex-wrap sm:flex-nowrap space-x-6">
          <button
            className="add_btn cursor-pointer  bg-white text-black rounded-xl sm:min-w-[15rem] xs:min-w-full font-semibold py-5 px-9 text-3xl text-center mb-16 capitalize border-solid border-[1px] border-primary-light "
            style={{
              transition: "all 0.3s linear",
            }}
            onClick={() =>
              append({
                product_desc: "",
                product_price: "",
                product_name: "",
                product_image: "",
              })
            }
          >
            Add More
          </button>
          <DashboardCommonButtons />
        </div>
      </form>
    </div>
  );
}
