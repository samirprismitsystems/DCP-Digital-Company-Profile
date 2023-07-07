import AuthGuard from "@/AuthGuards/AuthGuards";
import EnquiryPage from "@/components/EnquiryPage/EnquiryPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function enquiry() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <EnquiryPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
