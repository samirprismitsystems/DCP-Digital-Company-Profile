import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminCompanyPage from "@/components/Admin/AdminCompanyPage/AdminCompanyPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function CompanyList() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminCompanyPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
