import AuthGuard from "@/AuthGuards/AuthGuards";
import TestimonialPage from "@/components/Dashboard/TestimonialPage/TestimonialPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function testimonial() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <TestimonialPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
