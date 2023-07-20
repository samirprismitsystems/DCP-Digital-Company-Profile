import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CompanyImageUploader({
  companyLogo,
  companyBanner,
  companyID,
}: any) {
  const { setValue } = useFormContext();
  const [logoPath, setLogoPath] = useState<string>(
    `http://localhost:8080/control/upload/${companyID}/logo/${companyLogo}`
  );
  const [bannerPath, setBannerPath] = useState<string>(
    `http://localhost:8080/control/upload/${companyID}/banner/${companyBanner}`
  );

  const handleBannerChange = (event: any) => {
    const files = event.target.files[0];
    setValue("bannerPath", event.target.files[0].name);
    setValue("company_banner", files);
    setBannerPath(URL.createObjectURL(files));
  };

  const handleLogoPathChange = (event: any) => {
    const files = event.target.files[0];
    setValue("logoPath", event.target.files[0].name);
    setValue("company_logo", files);
    setLogoPath(URL.createObjectURL(files));
  };

  return (
    <>
      <div className="lg:mb-8 xs:mb-0  rightSide text-black text-3xl xl:grid xl:grid-cols-2 xl:gap-8 h-[90%] xs:flex xs:flex-wrap xs:justify-center lg:justify-evenly xl:flex-nowrap">
        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <div className="upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] flex items-center justify-center relative">
            <img
              src={logoPath}
              alt="logo image"
              className="upload_img w-[80%] h-[80%] object-contain object-center absolute top-[50%] left-[50%] align-middle"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <p className="text-red-600 my-3  mx-auto text-center">
            Image Required* 250KB max size
          </p>
          <div className="upload_btn relative z-0 border-[1px] border-solid border-secondary-main bg-secondary-main text-white text-2xl transition-all duration-300 ease-linear rounded-2xl min-w-[12rem] py-4 px-10 font-normal text-center capitalize font-['GothamRoundedBook']">
            <input
              type="file"
              onChange={handleLogoPathChange}
              className="choose cursor-pointer opacity-0 z-[1] absolute  top-0 left-0  w-full h-full"
            />
            Upload Logo File
          </div>
        </div>

        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <div className="upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] flex items-center justify-center relative">
            <img
              src={bannerPath}
              alt="logo image"
              className="upload_img w-[80%] h-[80%] object-contain object-center absolute top-[50%] left-[50%] align-middle"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <p className="text-red-600 my-3  mx-auto text-center">
            Image Required* 250KB max size
          </p>
          <div className="upload_btn relative z-0 border-[1px] border-solid border-secondary-main bg-secondary-main text-white text-2xl transition-all duration-300 ease-linear rounded-2xl min-w-[12rem] py-4 px-10 font-normal text-center capitalize font-['GothamRoundedBook']">
            <input
              type="file"
              onChange={handleBannerChange}
              className="choose cursor-pointer opacity-0 z-[1] absolute  top-0 left-0  w-full h-full"
            />
            Upload Banner Image
          </div>
        </div>
      </div>
    </>
  );
}
