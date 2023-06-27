import Utils from "@/services/Utils";

export default function AdminDashboard() {
  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-center text-5xl md:text-7xl pb-6">
          Admin Dashboard
        </h1>
        <h2 className="text-center text-xl md:text-2xl">work in progress</h2>
        <button
          className="mt-8 btnHoverEffect py-3 px-6 text-xl md:text-2xl"
          onClick={() => {
            Utils.clearStorage();
            window.history.back();
            Utils.showSuccessMessage("User Logout Successfully");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
