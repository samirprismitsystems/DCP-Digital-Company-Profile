import BackButton from "@/common/BackButton";
import TestimonialTable from "./TestimonialTable/TestimonialTable";
import DashboardCommonButtons from "@/common/DashboardCommonButtons";

export default function TestimonialPage() {
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Testimonials</div>
        <div className="h4 mt-1">Testimonials Data</div>
      </div>
      <div
        className="digital_profile_form form_shadow xs:w-full xl:w-4/5 m-auto mt-28 bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <TestimonialTable />
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
