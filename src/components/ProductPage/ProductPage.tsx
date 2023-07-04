import BackButton from "@/common/BackButton";
import { socialLinkFormSchema } from "@/services/forms/formSchema";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ProductPageItem from "./ProductPageItem/ProductPageItem";

export default function ProductPage() {
  const router = useRouter();
  const objForm = useForm();

  type IFormData = yup.InferType<typeof socialLinkFormSchema>;
  const onSave: any = async (data: IFormData) => {
    console.log(data);
  };
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add company products</div>
        <div className="h4 mt-1">
          Upload products which people can order online
        </div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
        onSubmit={objForm.handleSubmit(onSave)}
      >
        <div className="row -mr-3 -ml-3">
          <ProductPageItem />
        </div>
      </div>
    </>
  );
}
