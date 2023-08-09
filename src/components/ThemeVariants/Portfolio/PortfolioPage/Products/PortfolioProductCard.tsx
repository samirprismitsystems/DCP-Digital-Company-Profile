import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function PortfolioProductCard({
  id,
  path,
  index,
  name,
  description,
  price,
}: {
  id: string;
  path: string;
  index: number;
  name: string;
  description: string;
  price: string;
}) {
  return (
    <div key={index} className="w-[283.846px] px-4">
      <div className="product-box rounded-3xl border-[1px] border-solid border-portfolioTheme-primary mb-6 overflow-hidden">
        <div className="product-img text-center h-96 mb-4 min-h-[2.3rem] bg-[#f5f5f5]">
          <Image
            alt="product-img"
            title="product-img"
            width="156"
            height="190"
            className="w-full h-full object-cover align-middle text-center"
            src={`${UPLOAD_IMAGE_URI}/${id}/product/${path}`}
          />
        </div>
        <div className="product-info text-center pt-0 pb-4 px-4">
          <h4 className="product-title helvetica font-normal text-portfolioTheme-primary text-[2.2rem] my-2">
            {name || "N/A"}
          </h4>
          <p className="product-description text-3xl c-text mt-0 mb-4">
            {description || "N/A"}
          </p>
          <div className="product-action flex justify-between items-center w-full max-w-[37.5rem] mt-4">
            <span className="product-price text-black text-[2rem] font-semibold  text-center">
              Rs. {price || "N/A"}
            </span>
            <a
              href="#"
              className="site_btn text-3xl py-4 px-8 text-center text-white bg-portfolioTheme-primary rounded-2xl inline-block"
              style={{
                transition: "all .3s linear !important",
                textDecoration: "none !important",
              }}
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
