import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminAddUserReviewPage from "@/components/Admin/AdminAddUserReviewPage/AdminAddUserReviewPage";
import AdminDashboardLayout from "@/layouts/DashboardLayouts/AdminDashboardLayouts";

export default function AddUserReview() {
  return (
    <AuthGuard>
      <AdminDashboardLayout>
        <AdminAddUserReviewPage />
      </AdminDashboardLayout>
    </AuthGuard>
  );
}
