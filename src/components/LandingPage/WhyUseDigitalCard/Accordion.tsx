import { useContext, useState } from "react";
import { LandingPageContextApi } from "../LandingPage";
import FaqsList from "./FaqsList";

const Accordion = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const data = useContext(LandingPageContextApi);
  const lstAccordion = JSON.parse(data.pageDetails.accordian || "{}");
  const description = data.pageDetails.featuredesc;

  const handleToggle = (title: string) => {
    if (openItem === title) {
      setOpenItem(null);
    } else {
      setOpenItem(title);
    }
  };

  console.log(lstAccordion);
  return (
    <>
      <div className="mb-[3rem]">
        <h3 className="text-[3.0rem]  md:leading-0 text-white font-600 font-semibold">
          {data.pageDetails.faqtitle || "Why Use Digital Business Card?"}
        </h3>
      </div>
      <p className="xs:mb-10 mb-5 scroll-element js-scroll fade-in-bottom xs:text-left sm:text-left text-white ">
        {description || "N/A"}
      </p>
      {lstAccordion &&
        lstAccordion.length > 0 &&
        lstAccordion.map((item: any, index: number) => (
          <FaqsList
            key={index}
            title={item.faqtitle || item.title}
            desc={item.faqdesc || item.desc}
            openItem={openItem}
            onToggle={handleToggle}
          />
        ))}
    </>
  );
};

export default Accordion;
