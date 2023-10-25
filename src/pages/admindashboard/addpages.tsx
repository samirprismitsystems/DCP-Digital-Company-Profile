import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminAddPagesPage from "@/components/Admin/AdminAddPagesPage/AdminAddPagesPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function AddPages() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminAddPagesPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
