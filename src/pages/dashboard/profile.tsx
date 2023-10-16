import UserProfilePage from "@/components/UserProfilePage/UserProfilePage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function profile() {
  return (
    <MainDashboardLayouts>
      <UserProfilePage />
    </MainDashboardLayouts>
  );
}
