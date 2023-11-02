import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { createNewAccountSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const objForm = useForm({
    resolver: yupResolver(createNewAccountSchema),
  });

  type IFormData = yup.InferType<typeof createNewAccountSchema>;

  const onRegister = async (data: IFormData) => {
    try {
      setIsLoading(true);
      const io: any = new FormData();
      io.append("first_name", data.firstName);
      io.append("last_name", data.lastName);
      io.append("email_id", data.email);
      io.append("password", data.confirmPassword);
      io.append("isupdate", "false");
      io.append("profile_photo", "");
      io.append("contact_no", data.mobile);

      const res = await ApiService.userRegistration(io);
      if (res.error) {
        throw new Error(res.message);
      }
      Utils.showSuccessMessage(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="sm:px-16 md:w-3/4 xl:w-4/5 md:m-auto"
        onSubmit={objForm.handleSubmit(onRegister)}
      >
        <div className="py-4 grid grid-cols-2 xs:grid-cols-1 gap-4 items-center">
          <div className="grid  xs:grid-cols-1 xl:grid-cols-2">
            <div className="py-1">
              <label
                className="block mb-4 font-normal px-2 text-black text-3xl"
                htmlFor="username"
              >
                First Name
              </label>
              <input
                required
                className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
                type="text"
                placeholder="Enter Your First Name"
                {...objForm.register("firstName")}
              />
            </div>
            <div className="py-1">
              <label
                className="block mb-4 font-normal px-2 text-black text-3xl"
                htmlFor="username"
              >
                Last Name
              </label>
              <input
                required
                className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
                type="text"
                placeholder="Enter Your Last Name"
                {...objForm.register("lastName")}
              />
            </div>
          </div>
          <div className="py-1">
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              Email
            </label>
            <input
              required
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="email"
              placeholder="Enter Your Email"
              {...objForm.register("email")}
            />
          </div>
          <div className="py-1">
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              Mobile No <span className="text-red-600 text-4xl">*</span>
            </label>
            <input
              required
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="number"
              placeholder="Enter Your Mobile Number"
              {...objForm.register("mobile")}
            />
          </div>
          <div className="py-1">
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              Create Your Password{" "}
              <span className="text-red-600 text-4xl">*</span>
            </label>
            <input
              required
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="password"
              placeholder="Enter 6 Digit Password"
              {...objForm.register("createPassword")}
            />
          </div>
          <div className="py-1">
            <label
              className="block mb-4 font-normal px-2 text-black text-3xl"
              htmlFor="username"
            >
              Confirm Password <span className="text-red-600 text-4xl">*</span>
            </label>
            <input
              required
              className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
              type="password"
              placeholder="Enter 6 Digit Password"
              {...objForm.register("confirmPassword")}
            />
          </div>
          {objForm.formState.errors.confirmPassword && (
            <span className="text-red-600 text-2xl font-normal">
              {objForm.formState.errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className={` ${
              isLoading && "opacity-20"
            } border py-4 px-14 text-3xl my-8 btnHoverEffect  text-white text-center`}
          >
            {isLoading && <CircularLoadingEffectForButton />}
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
