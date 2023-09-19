import AdminBackButton from "@/common/AdminBackButton";
import AdminCommonButton from "@/common/AdminCommonButton";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import AdminPagesTable from "./AdminPagesTable";

export default function AdminPagesPage() {
  const dispatch = useDispatch();

  return (
    <>
      <AdminBackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Pages</div>
        <div className="h4 mt-1">Add or update pages</div>
      </div>
      <button
        onClick={() => {
          dispatch(
            setSelectedObj({
              selectedIndex: 3,
              selectedTitle: "addpages",
            })
          );
          dispatch(setRouteIsChanged(true));
          if (typeof window !== "undefined") {
            window.history.replaceState(
              "addpages",
              "",
              `/admindashboard/addpages`
            );
          }
        }}
        type="button"
        className="cursor-pointer bg-[#666666] text-white  border-0 transition transition-[all 0.3s linear] rounded-xl min-w-[auto] py-4 px-7 font-normal text-2xl text-center mb-16 capitalize"
      >
        <FontAwesomeIcon
          size="lg"
          className="mr-4  font-extrabold text-white"
          icon={faAdd}
        />
        <span className="font-medium">Add Pages</span>
      </button>
      <div
        className="digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <AdminPagesTable />
        <div className="pb-4 pt-16">
          <AdminCommonButton hideSaveButton={true} />
        </div>
      </div>
    </>
  );
}
