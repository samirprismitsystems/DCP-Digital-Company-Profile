export default function HomeCareAboutUs() {
  return (
    <>
      <div
        className=" bg-white rounded-3xl p-5 mb-5"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          About Us
        </h4>
        <p className="text-justify homecarefont pt-4 pb-8 px-4 text-homeCareTheme-textColor">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          <br />
        </p>
        <p className="gst-text py-8 mb-0  border-t-[1px] border-solid border-[#efefef] pt-6 text-center text-black font-bold text-4xl">
          GST: 29XXXXXXXXX1006
        </p>
      </div>
    </>
  );
}
