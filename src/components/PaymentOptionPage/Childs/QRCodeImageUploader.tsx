import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function QRCodeImageUploader({ imagePath }: { imagePath: any }) {
  const objForm = useFormContext();
  const [selectedImage, setSelectedImage] = useState(
    `${UPLOAD_IMAGE_URI}/${Utils.getItem(
      "IMAGE_UPLOAD_ID"
    )}/${"qrcode"}/${imagePath}`
  );

  return (
    <>
      <div className="lg:mb-8 xs:mb-0  rightSide text-black text-3xl h-[95%] xs:flex xs:flex-wrap xs:justify-center lg:justify-evenly xl:flex-nowrap">
        <div
          className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
          style={{
            boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
          }}
        >
          <div className="upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] flex items-center justify-center relative">
            <img
              id="get_img"
              src={selectedImage}
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
              name="file"
              onChange={(event: any) => {
                const files = event.target.files[0];
                if (files) {
                  setSelectedImage(URL.createObjectURL(files));
                  objForm.setValue("QRCodeImage", files);
                }
              }}
              className="choose cursor-pointer opacity-0 z-[1] absolute  top-0 left-0  w-full h-full"
            />
            Upload Logo File
          </div>
        </div>
      </div>
    </>
  );
}
