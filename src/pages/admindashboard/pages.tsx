import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminPagesPage from "@/components/Admin/AdminPagesPage/AdminPagesPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function pages() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminPagesPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
