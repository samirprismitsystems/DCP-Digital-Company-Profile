import AdminCompanyPage from "@/components/Admin/AdminCompanyPage/AdminCompanyPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function CompanyList() {
  return (
    <AdminDashboardLayout>
      <AdminCompanyPage />
    </AdminDashboardLayout>
  );
}
