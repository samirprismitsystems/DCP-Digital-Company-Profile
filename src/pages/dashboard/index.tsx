import DashboardPage from "@/components/Dashboard/DashboardPage/DashboardPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function dashboard() {
  return (
    <MainDashboardLayouts>
      <DashboardPage />
    </MainDashboardLayouts>
  );
}
