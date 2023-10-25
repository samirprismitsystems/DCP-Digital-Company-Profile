import AuthGuard from "@/AuthGuards/AuthGuards";
import ThemesPage from "@/components/Dashboard/ThemesPage/ThemesPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function themes() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <ThemesPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
