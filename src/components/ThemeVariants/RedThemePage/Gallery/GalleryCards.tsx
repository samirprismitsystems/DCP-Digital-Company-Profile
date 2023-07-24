import { UPLOAD_IMAGE_URI } from "@/services/config";

export default function GalleryCards({ path, id }: any) {
  return (
    <>
      <div className="content-box w-full flex justify-center shadow shadow-[0px 0px 20px 0px rgba(128, 128, 128, 0.3)] ">
        <img
          width="335"
          height="335"
          alt="gallery-img"
          title="gallery-img"
          className="img-fluid w-[95%] gallery-box overflow-hidden bg-[rgb(255, 255, 255)]  min-h-[3.5rem] h-2/4 mb-9 rounded-[2rem] p-8text-center flex justify-center  border border-solid border-grey-500 "
          src={`${UPLOAD_IMAGE_URI}/${id}/portfolio/${path}`}
        />
      </div>
    </>
  );
}
