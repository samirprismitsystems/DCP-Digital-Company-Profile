import BackButton from "@/common/BackButton";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

export default function ImageGalleryPage() {
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Add company portfolios</div>
        <div className="h4 mt-1">Upload up to 10 Images</div>
      </div>
      <div
        className="digital_profile_form  form_shadow bg-white min-h-[50%] rounded-2xl p-10 pb-0 block relative_box_for_loading"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          <ImageGalleryItem />
        </div>
      </div>
    </>
  );
}
