import AdminAddCompanyForm from "./AdminAddCompanyForm";

export default function AdminAddCompanyPage() {
  
  return (
    <>
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Company</div>
        <div className="h4 mt-1">Add User Data</div>
      </div>
      <div className="row flex flex-wrap justify-center mx-[-12px]">
        <div className="xs:w-full md:w-[82%]  max-w-full px-3 pt-8 pb-0">
          <AdminAddCompanyForm />
        </div>
      </div>
    </>
  );
}
