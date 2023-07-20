import BackButton from "@/common/BackButton";
import ServiceItem from "./ServiceItem/ServiceItem";

export default function ServicePage() {
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
