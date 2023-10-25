import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";

export default function PortfolioCards({ path, id }: any) {
  return (
    <>
      <div className="item xs:w-full h-[280px] xlOne:w-[280px] mr-auto mb-6">
        <div className="xs:min-h-full h-full xlOne:min-h-[3.4rem] mb-5 px-2  py-0 ">
          <img
            alt="gallery-img"
            title="gallery-img"
            id="upload-image"
            className="w-full max-w-full h-full block object-cover object-center align-middle"
            src={`${UPLOAD_IMAGE_URI}/${
              id || Utils.getCompanyID()
            }/portfolio/${path}`}
          />
        </div>
      </div>
    </>
  );
}
