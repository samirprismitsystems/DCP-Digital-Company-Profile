import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function PortfolioCards({ path, id }: any) {
  return (
    <>
      <div className="xs:w-full xlOne:w-[309px] mr-auto">
        <div className="xs:min-h-full xlOne:min-h-[3.4rem] mb-5 px-2  py-0 ">
          <Image
            width={800}
            height={800}
            alt="gallery-img"
            title="gallery-img"
            id="upload-image"
            className="w-full max-w-full h-auto align-middle"
            src={`${UPLOAD_IMAGE_URI}/${id}/portfolio/${path}`}
          />
        </div>
      </div>
    </>
  );
}
