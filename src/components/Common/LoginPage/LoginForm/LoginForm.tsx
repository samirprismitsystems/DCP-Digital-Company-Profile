import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import { USER_TYPE } from "@/services/Enums";
import Utils from "@/services/Utils";
import { loginSchema } from "@/services/forms/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const objForm = useForm({
    resolver: yupResolver(loginSchema),
  });
  
  const loadCompanyPageDetails = async () => {
    try {
      const res = await ApiService.getCompanyDetailsPageData();
      if (!res.error) {
        let result = res.company[0];
        if (result) {
          let websiteSlug = result.company_slug;
          Utils.setItem("IMAGE_UPLOAD_ID", parseInt(result.company_id));
          Utils.setItem("slug", websiteSlug);
          Utils.setItem("userID", result.user_id);
          Utils.setItem("themeID", result.theme_id);
        }
        return null;
      }
  
      throw new Error(res.message);
    } catch (ex: any) {
      router.push('/login');
      Utils.showErrorMessage(ex.message);
    }
  };

  const onLogin: any = async (data: { userID: string; password: string }) => {
    try {
      setIsLoading(true);

      let userData = new FormData();
      userData.append("email", data.userID);
      userData.append("password", data.password);
      
      const res = await ApiService.loginUser(userData as any);
      if (!res.error) {
        const userData = res.userdata;
        const isValid = AuthService.setLoginUserData(userData, res.token);
        if (isValid) {
          if (userData.type === USER_TYPE.ADMIN) {
            Utils.showSuccessMessage("Admin Login Successfully");
            router.push("/admindashboard");
            return null;
          }

          if (userData.type === USER_TYPE.USER) {
            await loadCompanyPageDetails();
            Utils.showSuccessMessage("User Login Successfully");
            router.push("/dashboard");
            return null;
          }

          return null;
        }
      }

      throw new Error(res.message || "Something went wrong while login");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={objForm.handleSubmit(onLogin)}>
        <div>
            <label htmlFor="email" className="block mb-3 text-2xl md:text-3xl font-medium text-secondary-main dark:text-white">Your email</label>
            <input 
              type="email"
              id="email" 
              className="bg-gray-50 border border-cyan-700 ring-black text-cyan-700	text-2xl md:text-3xl mb-5 focus-visible:outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name@company.com" 
              required 
              {...objForm.register("userID")}
            />
        </div>
        <div>
            <label className="block mb-3 text-2xl md:text-3xl  font-medium text-secondary-main dark:text-white">Password</label>
            <input 
              type="password"
              {...objForm.register("password")}
              id="password" 
              placeholder="••••••••" 
              className="bg-gray-50 mb-5 border border-cyan-700 text-cyan-700 focus-visible:outline-none text-2xl md:text-3xl rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
            />
        </div>
        <button 
          type="submit"
          className="w-full text-white bg-secondary-main sm:text-2xl text-3xl mb-5 hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
            {isLoading && <CircularLoadingEffectForButton />}
        </button>
      </form>
    </>
  );
}
