import BackButton from "@/common/BackButton";
import ApiService from "@/services/ApiServices";
import { useEffect } from "react";
import ServiceItem from "./ServiceItem/ServiceItem";
import Utils from "@/services/Utils";

export default function ServicePage() {
  const loadData = async () => {
    try {
      const res = await ApiService.getServicePageDetails();
      console.log(res);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add company Services</div>
        <div className="h4 mt-1">Upload best services</div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <ServiceItem />
        </div>
      </div>
    </>
  );
}
