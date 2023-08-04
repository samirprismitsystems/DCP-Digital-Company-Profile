import TextField from "@/common/TextFields/TextField";
import TemplateImageUploader from "../Templates/TemplateImageUploader";

export default function FreeTrail() {
  return (
    <>
      <TextField
        name="freeTrailTitle"
        title="Title"
        placeHolder="Enter Free Trail Title"
        isRequired={true}
      />
      <TextField
        name="freeTrailDesc"
        title="Description"
        placeHolder="Enter Free Trail Description"
        isRequired={true}
      />
      <TemplateImageUploader
        savePath="freeTrailImage"
        title="Upload Image"
      />
      <TextField
        name="freeTrailBtnTitle"
        title="Button Title"
        placeHolder="Enter Button Title"
        isRequired={true}
      />
      <TextField
        name="freeTrailBtnLink"
        title="Button Link"
        placeHolder="Enter Button Link"
        isRequired={true}
      />
    </>
  );
}
