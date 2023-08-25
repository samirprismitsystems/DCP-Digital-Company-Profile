import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import { ThemeContextApi } from "@/pages/[slug]";

export default function PortfolioProfile() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <>
      <section
        id="profile"
        className="profile-section text-white bg-portfolioTheme-primary relative h-[250px]"
        style={{
          backgroundImage:
            "-webkit-linear-gradient( 90deg, rgb(141,28,154) 50%, rgb(212,0,0) 150%)",
          borderRadius: "0 0 180px 180px",
        }}
      >
        <div className="container-portfolio h-full  pt-24 pb-12 ">
          <div className="row profile-row flex flex-wrap -mx-3">
            <div className="col-12 profile-name text-center w-full  shrink-0 mt-4 max-w-full">
              <h1 className="store-name portfolio-h1 mb-2 text-white">
                {objCompany.company_name || "N/A"}
              </h1>
              <h4 className="store-tagline portfolio-h4 text-white">
                {objCompany.business_segment || "N/A"}
              </h4>
            </div>

            <div className="col-12 text-center w-full shrink-0 max-w-full">
              <div className="profile-img w-72 h-72 rounded-50 bg-white flex justify-center items-center mx-auto overflow-hidden border-[1rem] border-solid border-white absolute top-[70%] transform transform-[translateY(-20%)] left-0 right-0 shadow-md">
                {" "}
                <img
                  src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id}/logo/${objCompany.company_logo}`}
                  alt="logo"
                  title="logo-img"
                  className="img-fit w-full h-full object-cover object-center align-middle"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
