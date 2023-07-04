import DashboardPage from "@/components/DashboardPage/DashboardPage";
import SocialLinksPage from "@/components/SocialLinksPage/SocialLinksPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";
import React from "react";

export default function sociallinks() {
  return (
    <>
      <MainDashboardLayouts>
        <SocialLinksPage />
      </MainDashboardLayouts>
    </>
  );
}
