import RedThemeHeading from "../common/RedThemeHeading";
import FeedBackReview from "./FeedBackReview";

export default function RedThemeFeedBack({ lstTestimonial }: any) {
  if (!lstTestimonial) return null;
  return (
    <>
      <RedThemeHeading title="Feedback" />
      <FeedBackReview lstTestimonial={lstTestimonial} />
    </>
  );
}
