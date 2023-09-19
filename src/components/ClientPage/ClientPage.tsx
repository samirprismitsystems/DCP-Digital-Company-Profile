import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import Utils from "@/services/Utils";
import ClientItem from "./ClientItem/ClientItem";

export default function ClientPage() {
  
  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Company Clients</div>
        <div className="h4 mt-1">Add clients</div>
      </div>
      <div
        className="relative_box_for_loading digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <ClientItem />
        </div>
      </div>
    </>
  );
}
