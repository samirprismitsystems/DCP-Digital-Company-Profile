import AuthGuard from "@/AuthGuards/AuthGuards";
import PortfolioPage from "@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage";

export default function UserVisitTheme() {
  return (
    <AuthGuard>
      <PortfolioPage />
    </AuthGuard>
  );
}
