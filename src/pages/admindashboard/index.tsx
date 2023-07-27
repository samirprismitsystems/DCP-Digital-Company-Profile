import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminDashboardPage from "@/components/Admin/AdminDashboardPage/AdminDashboardPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminDashboardPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
