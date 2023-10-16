import ImageGalleryPage from "@/components/ImageGalleryPage/ImageGalleryPage";
import MainDashboardLayouts from "@/layouts/DashboardLayouts/MainDashboardLayouts";
import React from "react";

export default function portfolio() {
  return (
    <MainDashboardLayouts>
      <ImageGalleryPage />
    </MainDashboardLayouts>
  );
}
