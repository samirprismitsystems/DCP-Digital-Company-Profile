import BackButton from "@/common/BackButton";
import CompanyFirstPlease from "@/common/CompanyFirst/CompanyFirstPlease";
import Utils from "@/services/Utils";
import ProductItem from "./ProductItem/ProductItem";

export default function ProductPage() {
  
  if (!Utils.getCompanyID()) {
    return <CompanyFirstPlease />;
  }
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Company Products</div>
        <div className="h4 mt-1">
          Upload products which people can order online
        </div>
      </div>
      <div
        className="mb-16 pb-0 digital_profile_form  form_shadow bg-white min-h-[50%] rounded-2xl p-10  block relative_box_for_loading"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <ProductItem />
        </div>
      </div>
    </>
  );
}
