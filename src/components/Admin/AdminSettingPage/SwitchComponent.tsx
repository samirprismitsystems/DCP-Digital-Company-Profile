import AdminCommonButton from "@/common/AdminCommonButton";
import GoogleAnalytics from "./GoogleAnalytics/GoogleAnalytics";
import SiteSetting from "./SiteSetting/SiteSetting";

export interface ISiteSettingState {
  siteTitle: string;
  siteDescription: string;
  facebook: string;
  linkedIn: string;
  instagram: string;
  siteEmail: string;
  siteLogo: string;
  footer_pages: any;
}

export default function SwitchComponent({ isSwitch }: { isSwitch: boolean }) {
  return <div className="row -mr-3 -ml-3"></div>;
}
