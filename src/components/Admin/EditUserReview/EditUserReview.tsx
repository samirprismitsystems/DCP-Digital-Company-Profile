import AdminBackButton from "@/common/AdminBackButton";
import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { adminUserReviewFormSchema } from "@/services/forms/formSchema";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { IAdminUserReview } from "@/types/commonTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function AdminEditUserReview(props: {
  objItem?: IAdminUserReview;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const objForm = useForm({
    defaultValues: {
      userName: "",
      userReview: "",
    },
    resolver: yupResolver(adminUserReviewFormSchema),
  });

  const onComplete = () => {
    if (props.objItem) {
      router.push("/admindashboard/userreview");
    } else {
      dispatch(
        setSelectedObj({
          selectedIndex: 4,
          selectedTitle: "userreview",
        })
      );
      dispatch(setRouteIsChanged(true));
      if (typeof window !== "undefined") {
        window.history.replaceState(
          "userreview",
          "",
          `/admindashboard/userreview`
        );
      }
    }
  };

  type IFormData = yup.InferType<typeof adminUserReviewFormSchema>;
  const onSave = async (data: IFormData) => {
    try {
      const io: any = new FormData();
      io.append("user_name", data.userName);
      io.append("user_message", data.userReview);
      if (props.objItem && Object.keys(props.objItem).length > 0) {
        io.append("isupdate", true);
        io.append("review_id", props.objItem.review_id);
      }
      let token = AuthService.getToken();
      io.append("token", token);
      const res = await ApiService.addAdminUserReview(io);
      if (!res.error) {
        Utils.showSuccessMessage(res.message);
        onComplete();
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
      router.push('/login');
    }
  };

  const loadData = () => {
    if (props.objItem) {
      const defaultValue = {
        userName: props.objItem.user_name || "",
        userReview: props.objItem.user_message || "",
      };
      objForm.reset(defaultValue);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.objItem]);
  return (
    <FormProvider {...objForm}>
      <AdminBackButton backPath="userreview" index={4} />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add User Review</div>
      </div>
      <div className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl pb-0 block">
        <form onSubmit={objForm.handleSubmit(onSave)}>
          <div className="row -mr-3 -ml-3">
            <TextField
              isRequired={true}
              name="userName"
              title="User Name"
              placeHolder="Enter User Name"
              type="text"
            />
            <TextField
              isRequired={true}
              name="userReview"
              title="User Review"
              placeHolder="Enter User Review"
              isTextArea={true}
              rows={10}
            />
            <div className="xs:w-full md:w-[70%]">
              <AdminCommonButton
                isLeft={true}
                hideNextButton={true}
                saveBtnTitle="Save"
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
