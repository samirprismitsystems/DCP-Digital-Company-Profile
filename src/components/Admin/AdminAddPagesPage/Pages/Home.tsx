import TextField from "@/common/TextFields/TextField";
import TemplateImageUploader from "../Templates/TemplateImageUploader";
import { useFormContext, useWatch } from "react-hook-form";

export default function Home() {
  
  return (
    <>
      <TextField
        name="homeTitle"
        isRequired={true}
        placeHolder="Enter Home Title"
        title="Title"
      />
      <TextField
        name="homeSubTitle"
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
        uploadPath="landingpageoriginal"
        title="Upload Main Image File"
        savePath="homeImage"
      />
      <TextField
        name="homeBtnTitle"
        isRequired={true}
        placeHolder="Enter Button Title"
        title="Button Title"
      />
      <TextField
        name="homeBtnLink"
        isRequired={true}
        placeHolder="Enter Button Link"
        title="Button Link"
      />
    </>
  );
}
