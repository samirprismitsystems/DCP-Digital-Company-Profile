import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { adminProfileFormSchema } from "@/services/forms/formSchema";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  profilePhoto: string;
  userID: string;
}

interface IProfileFormProps {
  isAdmin?: boolean;
}

export default function ProfileForm() {
  const [objUser, setObjUser] = useState<IUser>();
  const dispatch = useDispatch();
  const objForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      userID: "",
      profilePhoto: "",
    },
    resolver: yupResolver(adminProfileFormSchema),
  });

  type IFormData = yup.InferType<typeof adminProfileFormSchema>;

  const loadData = async () => {
    try {
      const res = await ApiService.getUserProfileInfo();
      if (!res.error) {
        const result = res.userdata;
        const objItem = {
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email_id,
          mobile: result.contact_no,
          userID: result.user_id,
          profilePhoto: result.profile_photo,
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
      io.append("user_id", data.userID);
      io.append("first_name", data.firstName);
      io.append("last_name", data.lastName);
      io.append("email_id", data.email);
      io.append("contact_no", data.mobile);
      io.append("profile_photo", data.profilePhoto);
      io.append("isupdate", true);

      const res = await ApiService.saveUserProfileInfo(io);
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
  }, [objUser]);

  return (
    <FormProvider {...objForm}>
      <form onSubmit={objForm.handleSubmit(onSave)}>
        <div className="grid grid-cols-2 gap-8">
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
        <AdminCommonButton hideNextButton={true} />
      </form>
      <button
        onClick={() => {
          dispatch(
            setSelectedObj({
              selectedIndex: 0,
              selectedTitle: "changepassword",
            })
          );
          dispatch(setRouteIsChanged(true));
          if (typeof window !== "undefined") {
            window.history.replaceState("changepassword", "", "changepassword");
          }
        }}
        type="button"
        className="inline text-black text-3xl font-semibold font-['GothamRoundedBook'] text-center capitalize transition  transition-[all 0.3s linear] flex items-center"
      >
        Change Password
        <FontAwesomeIcon
          className="mx-2 my-0 text-[1.8rem]"
          icon={faAngleDoubleRight}
        />
      </button>
    </FormProvider>
  );
}
