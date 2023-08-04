import TextField from "@/common/TextFields/TextField";

export default function Review() {
  return (
    <>
      <TextField
        name="reviewTitle"
        title="Title"
        placeHolder="Enter Review Title"
        isRequired={true}
      />
      <TextField
        name="reviewSubTitle"
        title="Sub Title"
        placeHolder="Enter Review Sub Title"
        isRequired={true}
      />
      <TextField
        name="reviewDescription"
        title="Description"
        placeHolder="Enter Review Description"
        isRequired={true}
        isTextArea={true}
      />
    </>
  );
}
