import { UPLOAD_IMAGE_URI } from "@/services/config";
import Link from "next/link";

export default function PortfolioProductCard(objData: {
  id: string;
  path: string;
  name: string;
  description: string;
  price: string;
}) {

  return (
    <div className="xs:w-full xlOne:w-[270.5px] px-4">
      <div className="product-box rounded-3xl border-[1px] border-solid border-portfolioTheme-primary mb-6 overflow-hidden">
        <div className="product-img text-center h-96 mb-4 min-h-[2.3rem] bg-[#f5f5f5]">
          <img
            alt="product-img"
            title="product-img"
            width="156"
            height="190"
            className="w-full h-full object-cover align-middle text-center"
            src={`${UPLOAD_IMAGE_URI}/${objData.id}/product/${objData.path}`}
          />
        </div>
        <div className="product-info text-center py-4 px-4">
          <h4 className="product-title helvetica font-semibold text-portfolioTheme-primary text-[2.8rem] my-2">
            {objData.name || "N/A"}
          </h4>
          <p className="product-description text-3xl font-medium c-text mt-0 mb-4">
            {objData.description || "N/A"}
          </p>
          <div className="product-action flex justify-between items-center w-full max-w-full mt-4">
            <span className="product-price text-black text-[2rem] font-semibold  text-center">
              Rs. {objData.price || "N/A"}
            </span>
            <Link
              href="#"
              className="site_btn text-3xl py-4 px-8 text-center text-white bg-portfolioTheme-primary rounded-2xl inline-block"
              style={{
                transition: "all .3s linear !important",
                textDecoration: "none !important",
              }}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
