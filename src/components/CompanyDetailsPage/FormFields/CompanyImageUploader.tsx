import React from "react";

export default function CompanyImageUploader(props: {
  logoPath: string;
  bannerPath: string;
  setLogoPath: (path: string) => void;
  setBannerPath: (path: string) => void;
}) {
  return (
    <>
      <div className="rightSide text-black text-3xl grid grid-cols-2 gap-8 h-[90%]">
        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <div className="upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] flex items-center justify-center relative">
            <img
              id="get_img"
              src={props.logoPath || ""}
              alt="logo image"
              className="upload_img w-[80%] h-[80%] object-contain object-center absolute top-[50%] left-[50%] align-middle"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <p className="text-red-600 my-5  mx-auto text-center">
            Image Required* 250KB max size
          </p>
          <div className="upload_btn relative z-0 border-[1px] border-solid border-secondary-main bg-secondary-main text-white text-3xl transition-all duration-300 ease-linear rounded-2xl min-w-[12rem] py-4 px-10 font-normal text-center capitalize font-['GothamRoundedBook']">
            <input
              type="file"
              name="file"
              onChange={(event: any) => {
                const files = event.target.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                  props.setLogoPath(reader.result as any);
                };

                if (files) {
                  reader.readAsDataURL(files);
                }
              }}
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
              id="get_img"
              src={props.bannerPath || ""}
              alt="logo image"
              className="upload_img w-[80%] h-[80%] object-contain object-center absolute top-[50%] left-[50%] align-middle"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <p className="text-red-600 my-5  mx-auto text-center">
            Image Required* 250KB max size
          </p>
          <div className="upload_btn relative z-0 border-[1px] border-solid border-secondary-main bg-secondary-main text-white text-3xl transition-all duration-300 ease-linear rounded-2xl min-w-[12rem] py-4 px-10 font-normal text-center capitalize font-['GothamRoundedBook']">
            <input
              type="file"
              name="file"
              onChange={(event: any) => {
                const files = event.target.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                  props.setBannerPath(reader.result as any);
                };

                if (files) {
                  reader.readAsDataURL(files);
                }
              }}
              className="choose cursor-pointer opacity-0 z-[1] absolute  top-0 left-0  w-full h-full"
            />
            Upload Banner Image
          </div>
        </div>
      </div>
    </>
  );
}
