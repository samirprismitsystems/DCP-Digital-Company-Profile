import AdminBackButton from "@/common/AdminBackButton";
import AdminSocialMediaItem from "./AdminSocialMediaItem";

export default function AdminSocialMediaPage() {
  return (
    <>
      <AdminBackButton />
      {/* <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add Social Media Data</div>
        <div className="h4 mt-1">Upload social media for company</div>
      </div>
      <button
        onClick={() => {
          dispatch(
            setSelectedObj({
              selectedIndex: 2,
              selectedTitle: "addsocialcolors",
            })
          );
          dispatch(setRouteIsChanged(true));
          window.history.replaceState(
            "addsocialcolors",
            "",
            `/admindashboard/addsocialcolors`
          );
        }}
        className="cursor-pointer bg-[#666666] text-white  border-0 transition transition-[all 0.3s linear] rounded-xl min-w-[auto] py-4 px-7 font-normal text-2xl text-center mb-16 capitalize"
      >
        <FontAwesomeIcon
          size="lg"
          className="mr-4  font-extrabold text-white"
          icon={faAdd}
        />
        <span className="font-medium">Add Social Media Color Class</span>
      </button> */}
      <div
        className="mb-16 digital_profile_form form_shadow bg-white min-h-[50%] rounded-2xl p-10 pb-0 block relative"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <AdminSocialMediaItem />
        </div>
      </div>
    </>
  );
}
