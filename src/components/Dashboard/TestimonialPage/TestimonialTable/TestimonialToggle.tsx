import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { useState } from "react";

export default function TestimonialToggle(props: {
  isActive: boolean;
  testimonialID: any;
  onComplete: () => void;
}) {
  const [isActive, setIsActive] = useState<boolean>(props.isActive);
  const toggle = async (tid: any, status: any) => {
    try {
      setIsActive(!isActive);
      let io = new FormData();
      io.append("testimonial_id", tid);
      io.append("status", status ? "0" : "1");
      let token = AuthService.getToken();
      io.append("token", token);
      const res = await ApiService.activeDeactiveTestimonialStatus(io);
      if (!res.error) {
        props.onComplete();
        Utils.showSuccessMessage(res.message);
        return null;
      }

      throw new Error(res.message);
    } catch (error: any) {
      Utils.showErrorMessage(error.message);
    }
  };
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <div
          onClick={() => {
            toggle(props.testimonialID, props.isActive);
          }}
          className={`w-24 h-12 ${
            !isActive && "bg-gray-200"
          } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-3 ${
            isActive ? "after:left-[34px]" : "after:left-[5px]"
          } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 ${
            isActive && "bg-blue-600"
          }`}
        ></div>
      </label>
    </>
  );
}
