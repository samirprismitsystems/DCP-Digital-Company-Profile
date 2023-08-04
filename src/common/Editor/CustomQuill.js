import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CustomToolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
];

const CustomQuill = (props) => {
  return (
    <ReactQuill
      {...props}
      placeholder="Enter Page Content"
      modules={{ toolbar: CustomToolbar }}
      style={{
        height: "200px",
      }}
    />
  );
};

export default CustomQuill;
