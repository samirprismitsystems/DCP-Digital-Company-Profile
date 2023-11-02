import AdminSettingPage from "@/components/Admin/AdminSettingPage/AdminSettingPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function setting() {
  return (
    <AdminDashboardLayout>
      <AdminSettingPage />
    </AdminDashboardLayout>
  );
}
