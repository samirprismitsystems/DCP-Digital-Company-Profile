import RHFImageUploader from "@/common/RHFImageUploader";

export default function CompanyImageUploader(props: {
  logoPath: string;
  bannerPath: string;
}) {
  return (
    <>
      <div className="lg:mb-8 xs:mb-0  rightSide text-black text-3xl xl:grid xl:grid-cols-2 xl:gap-8 h-[90%] xs:flex xs:flex-wrap xs:justify-center lg:justify-evenly xl:flex-nowrap">
        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <RHFImageUploader
            srcPath={props.logoPath}
            folderPath="logo"
            savePath="company_logo"
            showImageRequiredMessage={true}
            isRounded={true}
            label="Please Select Logo Image"
            imgPlaceholder={
              <div className="placeholder_tex text-center select-none opacity-30">
                <h3>Please Upload Here Your Company</h3>
                <h2>LOGO</h2>
              </div>
            }
          />
        </div>
        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <RHFImageUploader
            srcPath={props.bannerPath}
            savePath="company_banner"
            folderPath="banner"
            showImageRequiredMessage={true}
            isRounded={true}
            label="Please Select Banner Image"
            imgPlaceholder={
              <div className="placeholder_tex text-center select-none opacity-30">
                <h3>Please Upload Company Background</h3>
                <h2>BANNER</h2>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
