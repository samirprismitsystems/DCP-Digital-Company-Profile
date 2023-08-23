import GetGadgetHeader from "./GetGadgetHeader";

export default function GadgetAboutUs() {
  return (
    <>
      <div className="about-block " id="about-us">
        <GetGadgetHeader title="About" />
        <div
          className="content-box rounded-[2rem] text-center bg-white p-8 overflow-hidden gadgetfontfamily"
          style={{
            boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
          }}
        >
          <p className="xs:text-[2rem] md:text-[1.6rem] text-center gadgetfontfamily">
            <strong>Since 2005</strong>
          </p>
          <p className="xs:text-[2rem] md:text-[1.6rem] mt-6 text-center gadgetfontfamily">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
