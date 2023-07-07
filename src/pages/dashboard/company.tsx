import AuthGuard from "@/AuthGuards/AuthGuards";
import CompanyDetailsPage from "@/components/CompanyDetailsPage/CompanyDetailsPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function company() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <CompanyDetailsPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
