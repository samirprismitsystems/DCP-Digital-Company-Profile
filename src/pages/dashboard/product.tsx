import AuthGuard from "@/AuthGuards/AuthGuards";
import ProductPage from "@/components/Dashboard/ProductPage/ProductPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";
import React from "react";

export default function product() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <ProductPage />
      </MainDashboardLayouts>
      ;
    </AuthGuard>
  );
}
