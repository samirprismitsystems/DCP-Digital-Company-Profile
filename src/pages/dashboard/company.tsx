import CompanyDetailsPage from "@/components/Dashboard/CompanyDetailsPage/CompanyDetailsPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function company() {
  return (
    <MainDashboardLayouts>
      <CompanyDetailsPage />
    </MainDashboardLayouts>
  );
}
