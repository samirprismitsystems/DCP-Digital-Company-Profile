import GetPortfolioFeedBackReview from "@/components/ThemeVariants/Portfolio/PortfolioPage/Feedback/GetPortfolioFeedBackReview";
import { useContext } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
import GadgetGiveFeedback from "./GadgetGiveFeedback";

export default function GadgetFeedback() {
  const lstTestimonial = useContext(GadgetShopContextApi).testimonial;

  return (
    <>
      <div className="about-block " id="about-us">
        <GetGadgetHeader title="Feedback" />
        <div className="grid grid-cols-2 gap-16">
          <div className=" h-[550px] overflow-auto">
            <GetPortfolioFeedBackReview lstTestimonial={lstTestimonial} />
          </div>
          <GadgetGiveFeedback />
        </div>
      </div>
    </>
  );
}
