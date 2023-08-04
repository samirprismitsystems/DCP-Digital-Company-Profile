import TextField from "@/common/TextFields/TextField";
import TemplateImageUploader from "../Templates/TemplateImageUploader";

export default function Home() {
  return (
    <>
      <TextField
        name="homeTitle"
        isRequired={true}
        placeHolder="Enter Home Title"
        title="Home Title"
      />
      <TextField
        name="subTitle"
        isRequired={true}
        placeHolder="Enter Home Sub Title"
        title="Sub Title"
      />
      <TextField
        name="homeDesc"
        isRequired={true}
        placeHolder="Enter Home Description"
        title="Description"
        isTextArea={true}
      />
      <TemplateImageUploader
        title="Upload Main Image File"
        savePath="homeMainImage"
      />
      <TextField
        name="btnTitle"
        isRequired={true}
        placeHolder="Enter Button Title"
        title="Button Title"
      />
      <TextField
        name="btnLink"
        isRequired={true}
        placeHolder="Enter Button Link"
        title="Button Link"
      />
    </>
  );
}
