import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { IHomeCareInfo } from "@/types/themes/portfolio";
import Head from "next/head";
import { createContext } from "react";
import GadgetHeroSection from "./HeroSection/GadgetHeroSection";
import GadgetMainContent from "./HeroSection/MainContent/GadgetMainContent";

export default function GadgetShopPage(props: any) {
  return (
    <>
      <Head>
        <link
          id="favicon"
          rel="shortcut icon"
          href={`${UPLOAD_IMAGE_URI}/${props.result.company.company_id ||Utils.getCompanyID()}/logo/${
            props.result.company.company_logo
          }`}
          sizes="any"
        />
        <title>Gadget Shop</title>
      </Head>
      <div className="p-0 gadgetfontfamily gadgetShop_theme" id="home">
        <GadgetHeroSection />
        <GadgetMainContent />
      </div>
    </>
  );
}
