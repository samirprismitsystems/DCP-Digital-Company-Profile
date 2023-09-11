const templateTabList = [
  {
    id: 1,
    title: "Home",
    component: <Home />,
  },
  {
    id: 2,
    title: "Steps",
    component: <TemplatePageSteps />,
  },
  {
    id: 3,
    title: "Card",
    component: <Cards />,
  },
  {
    id: 4,
    title: "Feature",
    component: <TemplateFeatures />,
  },
  {
    id: 5,
    title: "FAQ",
    component: <FAQs />,
  },
  {
    id: 6,
    title: "Free Trail",
    component: <FreeTrail />,
  },
  {
    id: 7,
    title: "Review",
    component: <Review />,
  },
  {
    id: 8,
    title: "Contact",
    component: <Contacts />,
  },
  {
    id: 9,
    title: "Pages",
    component: <Pages />,
  },
  {
    id: 10,
    title: "SEO",
    component: <SEO />,
  },
];
import { useState } from "react";
import Cards from "../Pages/Cards";
import Contacts from "../Pages/Contacts";
import FAQs from "../Pages/FAQ";
import FreeTrail from "../Pages/FreeTrail";
import Home from "../Pages/Home";
import Pages from "../Pages/Pages";
import Review from "../Pages/Review";
import SEO from "../Pages/SEO";
import TemplateFeatures from "../Pages/TemplateFeatures";
import TemplatePageSteps from "../Pages/TemplatePageSteps";

export default function LandingPageTemplate() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedTab: any = templateTabList.find(
    (tab) => tab.id === selectedIndex
  );

  const handleTabClick = (tabId: number) => {
    setSelectedIndex(tabId);
  };

  
  return (
    <>
      <ul
        className={`tabs text-base pt-4 list-none  m-0 flex border-b border-solid border-secondary-main flex-wrap`}
      >
        {templateTabList.map((tab, index) => (
          <li
            key={index}
            className="nav_item text-base  list-none p-0 m-0"
            onClick={() => handleTabClick(tab.id)}
          >
            <button
              type="button"
              className={`ml-0 outline-none py-6 px-8 text-2xl font-medium border border-l-white font-['Montserrat'] border-b-0 block   ${
                index === templateTabList.length - 1 && "rounded-tr-[1rem]"
              } ${index === 0 && "rounded-tl-[1rem]"} ${
                tab.id !== selectedIndex
                  ? "bg-primary-main text-secondary-greyDark"
                  : "text-primary-main bg-secondary-main "
              }`}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mt-6 py-4">{`${selectedTab.title} Section`}</h3>
      {selectedTab.component}
    </>
  );
}
