import BackButton from "@/common/BackButton";
import { useEffect, useState } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Utils from "@/services/Utils";
import ApiService from "@/services/ApiServices";
import { IImageGallery } from "@/types/commonTypes";

export default function ImageGalleryPage() {
  const [lstImageGallery, setLstImageGallery] = useState<IImageGallery[]>();

  const loadData = async () => {
    try {
      const res = await ApiService.getImageGalleryDetails();
      if (!res.error) {
        setLstImageGallery(res.portfolio);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  const onComplete = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add company portfolios</div>
        <div className="h4 mt-1">Upload up to 10 Images</div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          {lstImageGallery && (
            <ImageGalleryItem
              lstImageGallery={lstImageGallery}
              onComplete={onComplete}
            />
          )}
        </div>
      </div>
    </>
  );
}
