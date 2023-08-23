import AuthGuard from "@/AuthGuards/AuthGuards";
import GadgetShopPage from "@/components/ThemeVariants/GadgetShop/GadgetShopPage/GadgetShopPage";

export default function UserVisitTheme() {
  return (
    <AuthGuard>
      {/* <PortfolioPage /> */}
      {/* <HomeCarePage /> */}
      <GadgetShopPage />
    </AuthGuard>
  );
}
