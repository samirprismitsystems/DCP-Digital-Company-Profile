import GadgetShopPage from '@/components/ThemeVariants/GadgetShop/GadgetShopPage/GadgetShopPage';
import HomeCarePage from '@/components/ThemeVariants/HomeCare/HomeCarePage/HomeCarePage';
import PortfolioPage from '@/components/ThemeVariants/Portfolio/PortfolioPage/PortfolioPage';
import React from 'react'

export default function UserViewSection() {
  return (
    <div>
      {/* <PortfolioPage /> */}
      <GadgetShopPage />
      {/* <HomeCarePage /> */}
    </div>
  );
}
