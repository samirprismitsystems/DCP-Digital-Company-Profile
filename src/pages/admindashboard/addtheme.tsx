import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminThemePage from "@/components/Admin/AdminThemePage/AdminThemePage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function addtheme() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminThemePage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
