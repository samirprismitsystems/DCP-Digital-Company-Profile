import AuthGuard from "@/AuthGuards/AuthGuards";
import ServicePage from "@/components/Dashboard/ServicePage/ServicePage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function service() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <ServicePage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
