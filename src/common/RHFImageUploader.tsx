import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function RHFImageUploader({
  srcPath,
  savePath,
  label,
  folderPath,
  isIDNotAvailable,
  showImageRequiredMessage,
  isRounded,
  imgPlaceholder,
}: {
  imgPlaceholder?: Node | any;
  srcPath?: any;
  savePath: string;
  label: string;
  folderPath?: string;
  isIDNotAvailable?: boolean;
  isRounded?: boolean;
  showImageRequiredMessage?: boolean;
}) {
  const objForm = useFormContext();
  const [selectedImagePath, setSelectedImagePath] = useState(
    Utils.getCompanyID()
      ? !isIDNotAvailable
        ? srcPath
          ? `${UPLOAD_IMAGE_URI}/${Utils.getItem(
              "IMAGE_UPLOAD_ID"
            )}/${folderPath}/${srcPath}`
          : ""
        : srcPath
        ? `${UPLOAD_IMAGE_URI}/${folderPath}/${srcPath}`
        : ""
      : AuthService.isUserAdmin()
      ? srcPath
        ? `${UPLOAD_IMAGE_URI}/${folderPath}/${srcPath}`
        : ""
      : ""
  );

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <>
      <div
        className={`${
          isRounded
            ? "upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] items-center justify-center flex relative"
            : "item_image mb-4 w-full h-[20rem] border-0 bg-primary-main"
        }`}
      >
        {imgPlaceholder && !selectedImagePath && imgPlaceholder}
        {selectedImagePath && (
          <img
            suppressHydrationWarning
            src={`${selectedImagePath}`}
            alt="image.png"
            className={`${
              isRounded
                ? "w-[80%] h-[80%] object-cover object-center align-middle border-none"
                : "w-full h-full object-cover object-center align-middle border-none"
            }`}
          />
        )}
      </div>
      {showImageRequiredMessage && (
        <p className="text-red-600 my-3  mx-auto text-center">
          Image Required* 250KB max size
        </p>
      )}
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
