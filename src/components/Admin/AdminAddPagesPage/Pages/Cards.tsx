import TextField from "@/common/TextFields/TextField";
import dynamic from "next/dynamic";
import TemplateImageUploader from "../Templates/TemplateImageUploader";
const Editor = dynamic(() => import("@/common/Editor/Editor"), {
  ssr: false,
});

export default function Cards() {
  return (
    <>
      <h4 className="pb-5">Card 1</h4>
      <TextField
        name={"cardTitle1"}
        isRequired={true}
        title="Title"
        placeHolder="Enter Card Title"
      />
      <TemplateImageUploader
        uploadPath="landingpageoriginal"
        savePath="cardImage1"
        title="Upload Card Image"
      />
      <Editor savePath="cardContent1" />

      <h4 className="py-5 pt-16">Card 2</h4>
      <TextField
        name={"cardTitle2"}
        isRequired={true}
        title="Title"
        placeHolder="Enter Card Title"
      />
      <TemplateImageUploader
        uploadPath="landingpageoriginal"
        savePath="cardImage2"
        title="Upload Card Image"
      />
      <div className="pb-16">
        <Editor savePath="cardContent2" />
      </div>
    </>
  );
}
