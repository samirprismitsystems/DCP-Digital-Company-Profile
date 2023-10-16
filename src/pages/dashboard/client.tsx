import ClientPage from "@/components/ClientPage/ClientPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function client() {
  return (
    <MainDashboardLayouts>
      <ClientPage />
    </MainDashboardLayouts>
  );
}
