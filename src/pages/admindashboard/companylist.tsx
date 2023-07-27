import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function companylist() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <h1>hello world</h1>
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
