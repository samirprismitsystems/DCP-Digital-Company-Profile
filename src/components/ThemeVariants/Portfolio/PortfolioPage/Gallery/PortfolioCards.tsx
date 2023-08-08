import { UPLOAD_IMAGE_URI } from "@/services/config";

export default function PortfolioCards({ path, id }: any) {
  return (
    <>
      <div className="w-[351px] mr-3">
        <div className="min-h-[3.4rem] mb-5 p-0 ">
          <img
            width="335"
            height="335"
            alt="gallery-img"
            title="gallery-img"
            className="w-full max-w-full h-auto align-middle"
            src={`${UPLOAD_IMAGE_URI}/${id}/portfolio/${path}`}
          />
        </div>
      </div>
    </>
  );
}
