import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminSocialMediaPage from "@/components/Admin/AdminSocialMediaPage/AdminSocialMediaPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function socialmediaadd() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminSocialMediaPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
