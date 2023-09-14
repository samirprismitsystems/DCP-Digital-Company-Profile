import AdminCommonButton from "@/common/AdminCommonButton";
import RHFImageUploader from "@/common/RHFImageUploader";
import TextField from "@/common/TextFields/TextField";
import { TemplateContextApi } from "@/pages/admindashboard/editpage/[slug]";
import dynamic from "next/dynamic";
import { useContext } from "react";
const Editor = dynamic(() => import("@/common/Editor/Editor"), {
  ssr: false,
});

export default function DefaultTemplate() {
  const metaImage = useContext(TemplateContextApi)?.meta_image;
  return (
    <>
      <TextField
        name="pageTitle"
        isRequired={true}
        placeHolder="Enter Page Title"
        title="Page Title"
      />
      <Editor savePath="pageContent" />
      <div className="pt-32">
        <h2 className="pb-8">SEO Section</h2>
        <div className="form_field xs:w-full  sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 pb-3 mb-16 transition-all duration-300 ease-linear">
          <div
            className="upload_private_img_box logo_img_box bg-white rounded-2xl p-6"
            style={{
              boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
            }}
          >
            <RHFImageUploader
              srcPath={metaImage}
              isIDNotAvailable={true}
              savePath={`metaImage`}
              isRounded={true}
              label="Select Meta Image"
              folderPath="metaimgoriginal"
              showImageRequiredMessage={true}
              imgPlaceholder={
                <div className="placeholder_tex text-center select-none opacity-30">
                  <h3>Please Upload Meta Image</h3>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <TextField
        name="metaTitle"
        isRequired={true}
        placeHolder="Enter Meta Title"
        title="Meta Title"
      />
      <TextField
        name="metaDesc"
        isRequired={true}
        placeHolder="Enter Meta Description"
        title="Meta Description"
        isTextArea={true}
      />
      <TextField
        name="metaKeywords"
        isRequired={true}
        placeHolder="Enter Meta Keywords"
        title="Meta Keywords"
        isTextArea={true}
      />

      <AdminCommonButton
        hideNextButton={true}
        isLeft={true}
        saveBtnTitle="Save"
      />
    </>
  );
}
