import AuthGuard from "@/AuthGuards/AuthGuards";
import HomeCarePage from "@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage";

export default function UserVisitTheme() {
  return (
    <AuthGuard>
      {/* <PortfolioPage /> */}
      <HomeCarePage />
    </AuthGuard>
  );
}
