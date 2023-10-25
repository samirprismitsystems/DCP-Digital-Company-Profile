import AuthGuard from "@/AuthGuards/AuthGuards";
import DashboardPage from "@/components/Dashboard/DashboardPage/DashboardPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function dashboard() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <DashboardPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
