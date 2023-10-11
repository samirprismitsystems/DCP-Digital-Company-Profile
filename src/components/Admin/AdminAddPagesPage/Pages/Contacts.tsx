import TextField from "@/common/TextFields/TextField";

export default function Contacts() {
  return (
    <>
      <TextField
        name="contactTitle"
        title="Title"
        placeHolder="Enter Contact Title"
        isRequired={true}
      />
      <TextField
        name="contactDescription"
        title="Description"
        placeHolder="Enter Contact Description"
        isRequired={true}
        isTextArea={true}
      />
    </>
  );
}
