import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function RHFImageUploader({
  imagePath,
  savePath,
  label,
  companyID,
}: {
  imagePath: any;
  savePath: string;
  label: string;
  companyID: string;
}) {
  const [selectedImagePath, setSelectedImagePath] = useState(
    `http://localhost:8080/control/upload/${companyID}/product/${imagePath}`
  );

  const objForm = useFormContext();
  return (
    <>
      <div className="item_image mb-4 w-full h-[20rem] border-0 bg-primary-main">
        <img
          src={selectedImagePath}
          alt="image.png"
          className="w-full h-full object-cover object-center align-middle border-none"
        />
      </div>
      <div
        className="upload_btn btn_100 site_btn relative z-0 border-[1px] border-solid  border-secondary-main bg-secondary-main text-white no-underline rounded-xl min-w-[12rem] py-4 px-10 not-italic font-normal text-center capitalize"
        style={{
          transition: "all",
          transitionDuration: "0.3s",
          animation: "linear",
        }}
      >
        <input
          type="file"
          className="absolute w-full h-full top-0 left-0 z-[1] opacity-0 cursor-pointer not-italic font-light text-primary-light bg-transparent border-0"
          onChange={(event: any) => {
            const files = event.target.files[0];
            if (files) {
              setSelectedImagePath(URL.createObjectURL(files));
              objForm.setValue(savePath, files);
            }
          }}
        />
        <p className="text-2xl font-medium text-white">{label}</p>
      </div>
    </>
  );
}
