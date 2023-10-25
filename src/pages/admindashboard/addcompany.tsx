import AdminAddCompanyPage from "@/components/Admin/AdminAddCompanyPage/AdminAddCompanyPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function AddCompany() {
  return (
      <AdminDashboardLayout>
        <AdminAddCompanyPage />
      </AdminDashboardLayout>
  );
}
