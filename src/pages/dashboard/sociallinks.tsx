import AuthGuard from "@/AuthGuards/AuthGuards";
import SocialLinksPage from "@/components/Dashboard/SocialLinksPage/SocialLinksPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function sociallinks() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <SocialLinksPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
