import AdminProfilePage from "@/components/Admin/AdminProfilePage/AdminProfilePage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function Profile() {
  return (
    <AdminDashboardLayout>
      <AdminProfilePage />
    </AdminDashboardLayout>
  );
}
