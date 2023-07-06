import BackButton from "@/common/BackButton";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";
import EnquiryTable from "./EnquiryTable/EnquiryTable";

export default function EnquiryPage() {
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Inquiry Details</div>
        <div className="h4 mt-1">Inquiry From Users</div>
      </div>
      <div
        className="digital_profile_form form_shadow xs:w-full xl:w-4/5 m-auto mt-28 bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <EnquiryTable />
        </div>
        <div className="row -mr-3 -ml-3 py-32 w-full relative float-right">
          <div className="xs:w-2/4 relative float-right">
            <DashboardCommonButtons hideSaveButton={true} />
          </div>
        </div>
      </div>
    </>
  );
}
