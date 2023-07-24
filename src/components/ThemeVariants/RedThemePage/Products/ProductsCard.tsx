import { UPLOAD_IMAGE_URI } from "@/services/config";

export default function ProductsCard({ path, id, price }: any) {
  return (
    <>
      <div className="product-box border m-[1.5rem 1rem] min-h-[31.32rem] overflow-hidden rounded-[1.5rem] border-[1px solid #8d1c9a] shadow shadow-[0px 0px 20px 0px rgba(128, 128, 128, 0.3)] p-8 bg-white rounded-[2rem]">
        <div className="product_image h-[19rem] text-center mb-4 min-h-[2.3rem] bg-white">
          <img
            rel="preload"
            width="156"
            height="190"
            alt="product-img"
            title="product-img"
            className="w-full h-full object-center object-cover text-center"
            src={`${UPLOAD_IMAGE_URI}/${id}/product/${path}`}
          ></img>
        </div>
        <div className="product_info text-center p-[0 15px 15px] ">
          <h4 className="product_title text-theme01 font-normal">{price}</h4>
          <p className="product_description text-black">{price}</p>
          <div className="product_action flex justify-between items-center w-full max-w-[37rem] mt-4 text-center">
            <span className="font-semibold text-black text-[2rem]">
              Rs.{price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
