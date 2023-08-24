import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function PortfolioCards({ path, id, index }: any) {
  return (
    <>
      <div className="xs:w-full h-[300px] xlOne:w-[309px] mr-auto mb-6" key={index}>
        <div className="xs:min-h-full h-full xlOne:min-h-[3.4rem] mb-5 px-2  py-0 ">
          <Image
            width={800}
            height={800}
            alt="gallery-img"
            title="gallery-img"
            id="upload-image"
            className="w-full max-w-full h-full block object-cover object-center align-middle"
            src={`${UPLOAD_IMAGE_URI}/${id}/portfolio/${path}`}
          />
        </div>
      </div>
    </>
  );
}
