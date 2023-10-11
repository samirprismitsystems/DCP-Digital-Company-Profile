import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";

export const landingPageNavigationMenuList = [
  {
    id: 0,
    name: "Home",
    link: "heroSection",
  },
  {
    id: 1,
    name: "Feature",
    link: "digitalFeatures",
  },
  {
    id: 2,
    name: "Contact",
    link: "getInTouch",
  },
];

export const loginPageNavigationMenuList = [
  {
    id: 0,
    name: "Home",
    link: "/",
    isNavigate: true,
  },
];

export const lstAdminResNavbar = [
  {
    id: 0,
    name: `Hi, ${AuthService.getUserName()}`,
    link: "profile",
    isUseIndex: true,
  },
  {
    id: 1,
    name: `Logout`,
    isLogout: true,
    link: "/login",
  },
];

export const loginScreenPrivacyPolicyList = [
  {
    id: 0,
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    id: 1,
    name: "Cookie Policy",
    link: "/Cookie-policy",
  },
  {
    id: 2,
    name: "Terms",
    link: "/Terms",
  },
];

export const lstDashboardNavigationMenu = [
  {
    id: 0,
    name: "Visit Site",
    link: `/${Utils.getItem("slug")}`,
    target: true,
  },
  {
    id: 1,
    name: `Hi, ${AuthService.getUserName()}`,
    link: "profile",
  },
];
