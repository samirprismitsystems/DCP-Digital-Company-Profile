import AdminPagesPage from "@/components/Admin/AdminPagesPage/AdminPagesPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function pages() {
  return (
    <AdminDashboardLayout>
      <AdminPagesPage />
    </AdminDashboardLayout>
  );
}
