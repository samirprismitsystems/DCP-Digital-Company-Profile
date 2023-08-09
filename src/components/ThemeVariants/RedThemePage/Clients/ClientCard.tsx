import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function ClientCard({ path, id, name }: any) {
  return (
    <>
      <div className="product-box m-[1.5rem 1rem] border min-h-[31.32rem] overflow-hidden rounded-[1.5rem] border-[1px solid #8d1c9a] shadow shadow-[0px 0px 20px 0px rgba(128, 128, 128, 0.3)] p-8 bg-white rounded-[2rem]">
        <div className="product_image h-[19rem] text-center mb-4 min-h-[2.3rem] bg-white">
          <Image
            width={156}
            height={190}
            rel="preload"
            alt="product-img"
            title="product-img"
            className="w-full h-full object-center object-cover text-center"
            src={`${UPLOAD_IMAGE_URI}/${id}/client/${path}`}
          ></Image>
        </div>
        <div className="product_info text-center p-[0 15px 15px] ">
          <h4 className="product_title text-theme01 font-normal">{name}</h4>
        </div>
      </div>
    </>
  );
}
