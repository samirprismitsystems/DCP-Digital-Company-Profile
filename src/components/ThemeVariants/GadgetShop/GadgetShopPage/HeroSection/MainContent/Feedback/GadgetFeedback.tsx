import GetPortfolioFeedBackReview from "@/components/ThemeVariants/Portfolio/PortfolioPage/Feedback/GetPortfolioFeedBackReview";
import { useContext } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "../AboutUs/GetGadgetHeader";
import GadgetGiveFeedback from "./GadgetGiveFeedback";
import { ThemeContextApi } from "@/pages/[slug]";

export default function GadgetFeedback() {
  const lstTestimonial = useContext(ThemeContextApi).testimonial;

  return (
    <>
      <div className="about-block " id="feedback">
        <GetGadgetHeader title="Feedback" />
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-16">
          <div className=" h-[550px] overflow-auto">
            <GetPortfolioFeedBackReview lstTestimonial={lstTestimonial} />
          </div>
          <GadgetGiveFeedback />
        </div>
      </div>
    </>
  );
}
