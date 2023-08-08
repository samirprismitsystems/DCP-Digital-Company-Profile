import Utils from "@/services/Utils";
import { useContext } from "react";
import { PortfolioContextApi } from "../PortfolioPage";
import GetHeader from "../common/GetHeader";

export default function PortfolioAboutUs() {
  const objCompany = useContext(PortfolioContextApi).company;

  return (
    <div className="about-block" id="aboutus">
      <GetHeader title="About" />
      <div className="pt-8">
        <p className="text-[2rem] c-text text-portfolioTheme-textColor">
          <strong>Since {Utils.getYear(objCompany.established_in)}</strong>
        </p>
        <p
          style={{
            lineHeight: "1.6",
          }}
          className="pt-4 text-3xl c-text text-portfolioTheme-textColor"
        >
          {objCompany.company_desc}
        </p>
      </div>
    </div>
  );
}
