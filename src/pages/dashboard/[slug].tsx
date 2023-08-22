import AuthGuard from "@/AuthGuards/AuthGuards";
import HomeCarePage from "@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage";
import PortfolioPage from "@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage";

export default function UserVisitTheme() {
  return (
    <AuthGuard>
      {/* <PortfolioPage /> */}
      <HomeCarePage />
    </AuthGuard>
  );
}
