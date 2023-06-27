import CircularLoadingEffectForButton from "@/common/CircularLoadingEffectForButton";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../services/forms/formSchema";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const objForm = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onLogin: any = async (data: { userID: string; password: string }) => {
    try {
      setIsLoading(true);
      let userData = new FormData();
      userData.append("email", data.userID);
      userData.append("password", data.password);

      const res = await ApiService.loginUser(userData as any);
      if (!res.error) {
        const userData = res.userdata;
        const isValid = AuthService.setLoginUserData(userData);
        if (!isValid) {
          throw new Error("something went wrong while save user data!");
        }
        router.push("/admindashboard");
        Utils.showSuccessMessage("User Login Successfully");
        return null;
      }

      throw new Error("Something went wrong while login");
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="xs:w-full w-4/5 m-auto px-16 xs:px-0">
      <form
        className="sm:px-16 md:w-3/4 xl:w-4/5 md:m-auto"
        onSubmit={objForm.handleSubmit(onLogin)}
      >
        <div className="py-4">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            User ID
          </label>
          <input
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="email"
            required
            placeholder="Enter Email Id or Mobile Number"
            {...objForm.register("userID")}
          />
        </div>
        <div className="py-8">
          <label
            className="block mb-4 font-normal px-2 text-black text-3xl"
            htmlFor="username"
          >
            Password
          </label>
          <input
            required
            className="bg-transparent border-b hover:border-b-black w-full text-primary-light placeholder:text-info-main mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl"
            type="password"
            placeholder="Enter 6 Digit Password"
            {...objForm.register("password")}
          />
        </div>
        <div className="py-10">
          <h1 className="text-primary-lightDark font-bold text-center text-3xl">
            <Link href={"/forgetpassword"}>Forgot Password?</Link>
          </h1>
          <div className="w-full text-center">
            <button
              type="submit"
              className={`${
                isLoading && "opacity-20"
              } border py-4 px-14 text-3xl my-16 btnHoverEffect  text-white text-center`}
            >
              {isLoading && <CircularLoadingEffectForButton />}
              Login
            </button>
          </div>
          <div className="text-black text-3xl text-center font-semibold">
            <Link href={"/registration"} className="hover:text-secondary-main">
              New User? Create An Account
              <FontAwesomeIcon size="sm" icon={faAngleDoubleRight} />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
