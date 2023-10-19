import AuthGuard from "@/AuthGuards/AuthGuards";
import PaymentOptionPage from "@/components/Dashboard/PaymentOptionPage/PaymentOptionPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";

export default function paymentoptions() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <PaymentOptionPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
