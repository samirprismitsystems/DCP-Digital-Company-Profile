import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { createNewAccountSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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
      if (!res.error) {
        objForm.reset({
          firstName: '',
          lastName: '',
          email: '',
          confirmPassword: '',
          mobile: 0
        })
        router.push('/login');
      }
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
        onSubmit={objForm.handleSubmit(onRegister)}
      >
        <div className="flex flex-start items-center justify-center gap-x-2">
          <div className="flex-1">
              <label htmlFor="first name" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">First Name</label>
              <input 
                type="text"
                id="first name" 
                className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="first name" 
                required 
                {...objForm.register("firstName")}
              />
          </div>
          <div className="flex-1">
              <label htmlFor="last name" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">Last Name</label>
              <input 
                type="text"
                id="last name" 
                className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="last name" 
                required 
                {...objForm.register("lastName")}
              />
          </div>
        </div>
        <div>
            <label htmlFor="email" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">Your email</label>
            <input 
              type="email"
              id="email" 
              className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name@company.com" 
              required 
              {...objForm.register("email")}
            />
        </div>
        <div>
            <label htmlFor="mobile" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">Mobile No.</label>
            <input 
              type="tel"
              pattern="[0-9]{10}"
              id="mobile" 
              className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="123456789" 
              required 
              {...objForm.register("mobile")}
            />
        </div>
        <div>
            <label className="block mb-3 text-2xl md:text-3xl  font-medium text-secondary-main dark:text-white">Password</label>
            <input 
              type="password"
              {...objForm.register("createPassword")}
              id="password" 
              placeholder="••••••••" 
              className="bg-gray-50 mb-5 border border-cyan-700 text-cyan-700 focus-visible:outline-none text-2xl md:text-3xl rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
            />
        </div>
        <div>
            <label className="block mb-3 text-2xl md:text-3xl  font-medium text-secondary-main dark:text-white">Confirm Password</label>
            <input 
              type="password"
              {...objForm.register("confirmPassword")}
              id="confirm password" 
              placeholder="••••••••" 
              className="bg-gray-50 mb-5 border border-cyan-700 text-cyan-700 focus-visible:outline-none text-2xl md:text-3xl rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
            />
        </div>
        {objForm.formState.errors.confirmPassword && (
          <span className="text-red-600 text-2xl font-normal">
            {objForm.formState.errors.confirmPassword.message}
          </span>
        )}
        <button 
          type="submit"
          className="w-full h-[40px] text-white bg-secondary-main mt-3 sm:text-2xl text-3xl mb-5 hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isLoading && <CircularLoadingEffectForButton />}
            Sign Up
        </button>
        <p className="font-light text-2xl md:text-3xl mt-5">
          Go Back To Login? <Link href="/login" className="font-medium text-secondary-main hover:underline text-2xl md:text-3xl ">Login</Link>
        </p>
      </form>
    </>
  );
}
