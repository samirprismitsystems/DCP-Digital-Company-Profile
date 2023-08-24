import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
import GadgetGiveFeedback from "../Feedback/GadgetGiveFeedback";

export default function GadgetEnquiry() {
  return (
    <div className="about-block pb-16" id="about-us">
      <GetGadgetHeader title="Enquiry Form" />
      <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-16">
        <GadgetGiveFeedback
          addEmailMobile={true}
          title="Get In Touch"
          buttonTitle="Send"
          isAnotherSubmit={true}
        />
        <div
          style={{
            boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
          }}
          className="content-box gallery-box xs:min-h-[300px] md:min-h-full p-0 overflow-hidden mx-4 rounded-[2rem]"
        >
          <iframe
            src="https://maps.google.com/maps?q=41.8781136,-87.6297982&amp;z=15&amp;output=embed"
            width="100%"
            frameBorder={0}
            className="border-0 h-full"
            allowFullScreen={true}
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  );
}
