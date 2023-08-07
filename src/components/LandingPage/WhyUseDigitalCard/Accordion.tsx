import { useContext } from "react";
import { LandingPageContextApi } from "../LandingPage";
import FaqsList from "./FaqsList";

const Accordion = () => {
  const data = useContext(LandingPageContextApi);
  const lstAccordion = JSON.parse(data.pageDetails.accordian || "{}");
  return (
    <>
      <div className="mb-[3rem]">
        <h3 className="text-[3.0rem]  md:leading-0 text-white font-600 font-semibold">
          Why Use Digital Business Card ?
        </h3>
      </div>
      <p className="xs:mb-10 mb-5 scroll-element js-scroll fade-in-bottom xs:text-left sm:text-left text-white ">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a making it over 2000 years old. Richard McClintock, a
        Latin professor at Hampden-Sydney College in Virginia, looked up one of
        the more obscure Latin words, consectetur.
      </p>
      {lstAccordion &&
        lstAccordion.map(
          (item: { title: string; desc: string }, index: number) => (
            <FaqsList key={index} title={item.title} desc={item.desc} />
          )
        )}
    </>
  );
};

export default Accordion;
