import Utils from "@/services/Utils";
import { useContext } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";
import GetGadgetHeader from "./GetGadgetHeader";

export default function GadgetAboutUs() {
  const objCompany = useContext(GadgetShopContextApi).company;

  return (
    <>
      <div className="about-block " id="about">
        <GetGadgetHeader title="About" />
        <div
          className="content-box rounded-[2rem] text-center bg-white p-8 overflow-hidden gadgetfontfamily"
          style={{
            boxShadow: "0px 0px 20px 0px rgba(128, 128, 128, 0.3)",
          }}
        >
          <p className="xs:text-[2rem] md:text-[1.6rem] text-center gadgetfontfamily">
            <strong>Since {Utils.getYear(objCompany.established_in)}</strong>
          </p>
          <p className="xs:text-[2rem] md:text-[1.6rem] mt-6 text-center gadgetfontfamily">
            {objCompany.company_desc}
          </p>
        </div>
      </div>
    </>
  );
}
