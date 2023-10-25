import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminChangePasswordFormSchema } from "@/services/forms/formSchema";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface IUser {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  const [objUser, setObjUser] = useState<IUser>();
  const dispatch = useDispatch();
  const objForm = useForm({
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(adminChangePasswordFormSchema),
  });

  type IFormData = yup.InferType<typeof adminChangePasswordFormSchema>;

  const loadData = async () => {
    try {
      const res = await ApiService.getUserProfileInfo();
      if (!res.error) {
        const result = res.userdata;
        const objItem: any = {
          email: result.email_id,
        };
        setObjUser(objItem);
        return null;
      }
      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  const onSave = async (data: IFormData) => {
    try {
      const io: any = new FormData();
      io.append("email_id", data.email);
      io.append("cpass", data.currentPassword);
      io.append("npass", data.confirmPassword);
      
      const res = await ApiService.changeUserPassword(io);
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

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (objUser && Object.keys(objUser).length > 0) {
      objForm.reset(objUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objUser]);

  const passWordError = objForm.formState.errors["confirmPassword"]?.message;
  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <TextField
          isRequired={true}
          type="email"
          name="email"
          title="Email"
          placeHolder="Enter Your Email"
        />
        <TextField
          isRequired={true}
          name="currentPassword"
          title="Current Password"
          placeHolder="Enter Your Current Password"
          type="password"
        />
        <TextField
          isRequired={true}
          name="newPassword"
          title="New Password"
          placeHolder="Enter Your New Password"
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
      <button
        onClick={() => {
          dispatch(
            setSelectedObj({
              selectedIndex: 0,
              selectedTitle: "profile",
            })
          );
          dispatch(setRouteIsChanged(true));
          if (typeof window !== "undefined") {
            window.history.replaceState("profile", "", "profile");
          }
        }}
        type="button"
        className="inline text-black text-3xl font-semibold font-['GothamRoundedBook'] text-center capitalize transition  transition-[all 0.3s linear] flex items-center"
      >
        <FontAwesomeIcon
          className="mx-2 my-0 text-[1.8rem]"
          icon={faAngleDoubleLeft}
        />
        Back To Profile
      </button>
    </FormProvider>
  );
}
