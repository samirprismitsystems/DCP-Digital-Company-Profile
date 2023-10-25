import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminChangePasswordPage from "@/components/Admin/AdminChangePasswordPage/AdminChangePasswordPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function Changepassword() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminChangePasswordPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
