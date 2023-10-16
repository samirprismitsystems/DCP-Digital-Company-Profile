import DashboardPage from "@/components/DashboardPage/DashboardPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function dashboard() {
return (
    <MainDashboardLayouts>
      <DashboardPage />
    </MainDashboardLayouts>
  );
}
