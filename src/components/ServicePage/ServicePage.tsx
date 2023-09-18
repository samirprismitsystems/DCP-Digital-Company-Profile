import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import Utils from "@/services/Utils";
import ServiceItem from "./ServiceItem/ServiceItem";

export default function ServicePage() {
  
  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add company Services</div>
        <div className="h4 mt-1">Upload best services</div>
      </div>
      <div
        className="relative_box_for_loading digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 mb-16 block"
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
