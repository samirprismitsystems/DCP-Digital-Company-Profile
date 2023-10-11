import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminReviewPage from "@/components/Admin/AdminReviewPage/AdminReviewPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function UserReview() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminReviewPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
