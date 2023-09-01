import AdminCommonButton from "@/common/AdminCommonButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AdminCompanyTable from "./AdminCompanyTable";

export default function AdminCompanyPage() {
  return (
    <>
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Company List</div>
        <div className="h4 mt-1">All Company List</div>
      </div>
      <Link
        href={"/admindashboard/addcompany"}
        target="_blank"
        className="cursor-pointer bg-[#666666] text-white  border-0 transition transition-[all 0.3s linear] rounded-xl min-w-[auto] py-5 px-8 font-normal text-2xl text-center mb-16 capitalize"
      >
        <FontAwesomeIcon
          size="lg"
          className="mr-4  font-extrabold text-white"
          icon={faAdd}
        />
        <span className="font-medium">Add Company</span>
      </Link>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl mt-16 p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <AdminCompanyTable />
        <AdminCommonButton hideSaveButton={true} />
      </div>
    </>
  );
}
