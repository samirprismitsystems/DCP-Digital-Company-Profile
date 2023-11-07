import AdminCommonButton from "@/common/AdminCommonButton";
import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { adminResetPasswordFormSchema } from "@/services/forms/formSchema";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useRouter } from "next/router";

interface IUserReset {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm({token}: any) {
  const [objUser, setObjUser] = useState<IUserReset>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const objForm = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(adminResetPasswordFormSchema),
  });
  const router = useRouter();

  type IFormData = yup.InferType<typeof adminResetPasswordFormSchema>;

  const onSave = async (data: IFormData) => {
    try {
      
      const io: any = new FormData();
      io.append("email_id", data.email);
      io.append("cpass", data.confirmPassword);
      io.append("npass", data.confirmPassword);
      io.append("reset_token", token);

      const res = await ApiService.resetUserPassword(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        router.push('/login');
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const passWordError = objForm.formState.errors["confirmPassword"]?.message;
  return (
    <>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <div>
          <label htmlFor="email" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">Email</label>
          <input 
            type="email"
            id="email"
            className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Email Id or Mobile Number"
            required 
            {...objForm.register("email")}
          />
        </div>
        <div>
          <label className="block mb-3 text-2xl md:text-3xl  font-medium text-secondary-main dark:text-white">Password</label>
          <input 
            type="password"
            {...objForm.register("newPassword")}
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
        {passWordError && (
          <span className="text-red-600 text-2xl font-medium">
            {passWordError}
          </span>
        )}
        <button 
          type="submit"
          className="w-full text-white bg-secondary-main mt-3 sm:text-2xl text-3xl mb-5 hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isLoading && <CircularLoadingEffectForButton />}
            Reset Password
        </button>
        <p className="font-light text-2xl md:text-3xl mt-5">
          Go Back To Login? <Link href="/login" className="font-medium text-secondary-main hover:underline text-2xl md:text-3xl ">Login</Link>
        </p>
      </form>
  </>
  );
}
