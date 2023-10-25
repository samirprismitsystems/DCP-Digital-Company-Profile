import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminProfilePage from "@/components/Admin/AdminProfilePage/AdminProfilePage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function Profile() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminProfilePage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
