import DashboardPage from "@/components/DashboardPage/DashboardPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";
import React from "react";

export default function company() {
  return (
    <>
      <MainDashboardLayouts>
        <DashboardPage />
      </MainDashboardLayouts>
    </>
  );
}
