import AuthGuard from "@/AuthGuards/AuthGuards";
import Utils from "@/services/Utils";

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-center text-white text-5xl md:text-7xl pb-6">
          Admin Dashboard
        </h1>
        <h2 className="text-center text-white text-xl md:text-2xl">
          work in progress
        </h2>
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
    </AuthGuard>
  );
}
