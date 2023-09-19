import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminAddCompanyFormSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export default function AdminAddCompanyForm() {
  const objForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      createPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(adminAddCompanyFormSchema),
  });

  type IFormData = yup.InferType<typeof adminAddCompanyFormSchema>;
  const onSave = async (data: IFormData) => {
    try {
      const io: any = new FormData();
      io.append("status", 1);
      io.append("first_name", data.firstName);
      io.append("last_name", data.lastName);
      io.append("email_id", data.email);
      io.append("contact_no", data.mobile);
      io.append("password", data.confirmPassword);
      io.append("isupdate", false);

      const res = await ApiService.registerUserAdmin(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const passWordError = objForm.formState.errors["confirmPassword"]?.message;
  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-8">
          <TextField
            isRequired={true}
            name="firstName"
            title="First Name"
            placeHolder="Enter Your First Name"
          />
          <TextField
            isRequired={true}
            name="lastName"
            title="Last Name"
            placeHolder="Enter Your Last Name"
          />
        </div>
        <TextField
          isRequired={true}
          type="email"
          name="email"
          title="Email"
          placeHolder="Enter Your Email"
        />
        <TextField
          isRequired={true}
          name="mobile"
          title="Mobile No.*"
          placeHolder="Enter Your Mobile Number"
        />
        <TextField
          isRequired={true}
          name="createPassword"
          title="Create Password"
          placeHolder="Create Your Password"
          type="password"
        />
        <TextField
          isRequired={true}
          name="confirmPassword"
          title="Confirm Password"
          placeHolder="Enter Your Confirm Password"
          type="password"
        />
        {passWordError && (
          <span className="text-red-600 text-2xl font-medium">
            {passWordError}
          </span>
        )}
        <AdminCommonButton hideNextButton={true} />
      </form>
    </FormProvider>
  );
}
