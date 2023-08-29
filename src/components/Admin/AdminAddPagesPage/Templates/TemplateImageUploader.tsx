import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ITemplateImageUploaderProps {
  savePath: string;
  title: string;
}
export default function TemplateImageUploader(
  props: ITemplateImageUploaderProps
) {
  const objForm = useFormContext();
  const [selectedImagePath, setSelectedImagePath] = useState(
    `${UPLOAD_IMAGE_URI}/landingpageoriginal/${objForm.getValues(
      props.savePath
    )}` || ""
  );

  useEffect(() => {
    if (objForm.getValues(props.savePath)) {
      let img = `${UPLOAD_IMAGE_URI}/landingpageoriginal/${objForm.getValues(
        props.savePath
      )}`;

      setSelectedImagePath(img)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.savePath]);

  return (
    <div className="form_field xs:w-full  sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 pb-3 mb-16 transition-all duration-300 ease-linear">
      <div
        className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="upload_here bg-primary-main rounded-2xl p-4  w-full h-[27.5rem] items-center justify-center relative">
          <img
            src={selectedImagePath}
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
            onChange={(event: any) => {
              const files = event.target.files[0];
              if (files) {
                setSelectedImagePath(URL.createObjectURL(files));
                objForm.setValue(props.savePath, files);
              }
            }}
            className="choose cursor-pointer opacity-0 z-[1] absolute  top-0 left-0  w-full h-full"
          />
          {props.title}
        </div>
      </div>
    </div>
  );
}
