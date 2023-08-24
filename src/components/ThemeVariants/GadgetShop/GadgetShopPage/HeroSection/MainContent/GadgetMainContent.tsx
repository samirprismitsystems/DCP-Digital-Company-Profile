import GadgetAboutUs from "./AboutUs/GadgetAboutUs";
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
        <GadgetPaymentInfo/>
        <GadgetFeedback/>
      </div>
    </div>
  );
}
