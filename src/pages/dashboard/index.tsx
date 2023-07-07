import AuthGuard from "@/AuthGuards/AuthGuards";
import DashboardPage from "@/components/DashboardPage/DashboardPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";
import React from "react";

export default function dashboard() {
  return (
    <AuthGuard>
      <MainDashboardLayouts>
        <DashboardPage />
      </MainDashboardLayouts>
    </AuthGuard>
  );
}
