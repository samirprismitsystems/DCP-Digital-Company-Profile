import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import dynamic from "next/dynamic";
import TemplateImageUploader from "./TemplateImageUploader";
const Editor = dynamic(() => import("@/common/Editor/Editor"), {
  ssr: false,
});

export default function DefaultTemplate() {
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
        <TemplateImageUploader
          uploadPath="metaimgoriginal"
          title="Select Meta Image"
          savePath="metaImage"
        />
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
