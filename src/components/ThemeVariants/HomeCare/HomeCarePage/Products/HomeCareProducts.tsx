import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext } from "react";

export default function HomeCareProducts() {
  const lstProduct = useContext(ThemeContextApi).product;

  return (
    <>
      <div
        id="products"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Our Products
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lstProduct.map((item: any) => (
            <div
              key={item.product_id}
              className="mb-4 text-center p-0 homecarefont "
            >
              <div className="product-image w-full h-auto  mb-1 bg-homeCareTheme-primary text-center min-h-[243px]">
                <img
                  alt="image.png"
                  src={`${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/product/${
                    item.product_image
                  }`}
                  className="min-h-[243px] img-fluid w-full h-full text-center align-middle "
                />
              </div>
              <p className="para-1 homecarefont text-black font-bold mb-2">
                {item.product_name || "N/A"}
              </p>
              <p className="para-2 homecarefont font-bold">
                ₹{item.product_price || "N/A"} 
                {/* /
                <span className="font-normal homecarefont text-homeCareTheme-textColor ml-1 line-through">
                  1800
                </span> */}
              </p>
              <div className="open text-center">
                <div className="xs:flex xs:flex-col sm:flex-row -mx-1 mb-4 justify-center items-center ">
                  <button
                    onClick={() => {
                      Utils.scrollToView("enquiry");
                    }}
                    className="border border-solid border-homeCareTheme-opacityBorder text-white
                bg-homeCareTheme-primary py-3 px-8 rounded-[6px] inline-block m-1 whitespace-nowrap w-auto font-medium text-center   max-h-[40px] homecarefont text-[1.6rem] hover:text-homeCareTheme-primary hover:bg-white"
                  >
                    Quick Enquiry
                  </button>
                  {/* <a
                    className="border border-solid border-homeCareTheme-opacityBorder text-homeCareTheme-primary py-3 px-8 rounded-[6px] inline-block m-1 whitespace-nowrap w-auto font-medium text-center bg-transparent  max-h-[40px] homecarefont text-[1.6rem] hover:text-white hover:bg-homeCareTheme-primary"
                    href="#!"
                    target="_blank"
                  >
                    Shop Now
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
