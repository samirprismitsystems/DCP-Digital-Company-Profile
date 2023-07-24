import { UPLOAD_IMAGE_URI } from "@/services/config";

export default function ServiceCard({ path, id, price }: any) {
  return (
    <div className="service_box pt-0 mb-12 overflow-hidden relative rounded-[1.5rem]">
      <div className="service_image bg-theme01 ">
        <img
          rel="preload"
          width="298"
          height="199"
          alt="services-img"
          title="services-img"
          className="img-fluid opacity-[0.5] blur-[2px] w-full m-w-ful h-auto"
          src={`${UPLOAD_IMAGE_URI}/${id}/service/${path}`}
        ></img>
      </div>
      <div className="service_info  absolute top-0 flex  items-center justify-center p-[15px]  flex-col text-white w-full h-full">
        <h4 className="service-title text-white text-[2.2rem] ">{price}</h4>
        <h4 className="service-description mb-0 text-[1.6rem]  text-white">
          {price}
        </h4>
        <div className="product_action flex justify-center items-center w-full max-w-[37rem] mt-4 text-center">
          <span className="font-semibold text-white text-[2rem]">
            Rs.{price}
          </span>
        </div>
      </div>
    </div>
  );
}
