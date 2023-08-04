import AdminCommonButton from "@/common/AdminCommonButton";
import TextField from "@/common/TextFields/TextField";
import TemplateImageUploader from "../Templates/TemplateImageUploader";

export default function SEO() {
  return (
    <>
      <TemplateImageUploader savePath="metaImage" title="Upload Meta Image" />
      <TextField
        name={"metaTitle"}
        title="Title"
        placeHolder="Enter Meta Title"
        isRequired={true}
      />
      <TextField
        name={"metaDesc"}
        title="Description"
        placeHolder="Enter Meta Description"
        isRequired={true}
      />
      <TextField
        name={"metaKeywords"}
        title="Keywords"
        placeHolder="Enter Meta Keywords"
        isRequired={true}
      />
      <AdminCommonButton
        isLeft={true}
        hideNextButton={true}
        saveBtnTitle="Save"
      />
    </>
  );
}
