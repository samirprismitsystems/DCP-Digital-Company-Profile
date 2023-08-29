import GadgetFooter from "../../GadgetFooter";
import GadgetAboutUs from "./AboutUs/GadgetAboutUs";
import GadgetEnquiry from "./EnquiryForm/GadgetEnquiry";
import GadgetFeedback from "./Feedback/GadgetFeedback";
import GadgetFollowUs from "./FollowUs/GadgetFollowUs";
import GadgetGallery from "./Gallery/GadgetGallery";
import GadgetPaymentInfo from "./PaymentInfo/GadgetPaymentInfo";
import GadgetProducts from "./Products/GadgetProducts";
import GadgetServices from "./Service/GadgetServices";
import StoreContactsInfo from "./StoreContactInformation/StoreContactsInfo";
import GadgetWhatsAppShare from "./WhatsAppShare/GadgetWhatsAppShare";

export default function GadgetMainContent() {
  return (
    <div
      className="profile-body pt-30 bg-gadgetTheme-secondary rounded-tr-[4rem] rounded-tl-[4rem] rounded-bl-none rounded-br-none pt-16 text-gadgetTheme-text min-h-full h-auto"
      id="top"
    >
      <StoreContactsInfo />
      <div className="container">
        <GadgetWhatsAppShare />
        <GadgetFollowUs />
        <GadgetAboutUs />
        <GadgetProducts />
        <GadgetServices />
        <GadgetGallery />
        <GadgetPaymentInfo />
        <GadgetFeedback />
        <GadgetEnquiry />
      </div>
      <div
        className="list-none rounded-tl-[3rem] rounded-tr-[3rem] bg-white pt-8 pb-4 px-6 overflow-hidden flex items-center xs:flex justify-between m-0 sticky z-10 bottom-0 space-x-6"
        style={{
          boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
        }}
      >
        <GadgetFooter />
      </div>
    </div>
  );
}
