import AuthGuard from "@/AuthGuards/AuthGuards";
import AdminAddPagesPage from "@/components/Admin/AdminAddPagesPage/AdminAddPagesPage";
import AdminNormalLayout from "@/layouts/AdminNormalLayout";

export default function EditAdminPages() {
  
  return (
    <AuthGuard>
      <AdminNormalLayout>
        <AdminAddPagesPage />
      </AdminNormalLayout>
    </AuthGuard>
  );
}
