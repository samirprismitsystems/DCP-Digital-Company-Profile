import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";

export const lstDashboardPanels = [
  {
    id: 1,
    name: "Company Details",
    icon: "/assets/landingpage/dashboard/company_details.png",
    link: "company",
  },
  {
    id: 2,
    name: "Social Links",
    icon: "/assets/landingpage/dashboard/social_links.png",
    link: "sociallinks",
  },
  {
    id: 3,
    name: "Product",
    icon: "/assets/landingpage/dashboard/product.png",
    link: "product",
  },
  {
    id: 4,
    name: "Services",
    icon: "/assets/landingpage/dashboard/services.png",
    link: "service",
  },
  {
    id: 5,
    name: "Clients",
    icon: "/assets/landingpage/dashboard/clients.webp",
    link: "client",
  },
  {
    id: 6,
    name: "Image Gallery",
    icon: "/assets/landingpage/dashboard/image_gallery.png",
    link: "portfolio",
  },
  {
    id: 7,
    name: "Testimonial",
    icon: "/assets/landingpage/dashboard/testimonial.png",
    link: "testimonial",
  },
  {
    id: 8,
    name: "Enquiry",
    icon: "/assets/landingpage/dashboard/inquiry.webp",
    link: "enquiry",
  },
  {
    id: 9,
    name: "Payment Options",
    icon: "/assets/landingpage/dashboard/payment_options.png",
    link: "paymentoptions",
  },
  {
    id: 10,
    name: "Themes",
    icon: "/assets/landingpage/dashboard/theme.png",
    link: "themes",
  },
];

export const lstAdminDashboardPanels = [
  {
    id: 1,
    name: "Company List",
    icon: "/assets/landingpage/dashboard/company_details.png",
    link: "companylist",
  },
  {
    id: 2,
    name: "Social Media",
    icon: "/assets/landingpage/dashboard/social_links.png",
    link: "socialmedia",
  },
  {
    id: 3,
    name: "Pages",
    icon: "/assets/landingpage/pages.png",
    link: "pages",
  },
  {
    id: 4,
    name: "User Review",
    icon: "/assets/landingpage/clientreview.webp",
    link: "userreview",
  },
  {
    id: 5,
    name: "Add Theme",
    icon: "/assets/landingpage/theme.png",
    link: "addtheme",
  },
  {
    id: 6,
    name: "Setting",
    icon: "/assets/landingpage/setting.webp",
    link: "setting",
  },
];

export const lstUserResponsiveNavbar = [
  {
    id: 1,
    name: "Visit Site",
    link: `/${Utils.getItem("slug")}`,
    isNewTab: true,
  },
  {
    id: 2,
    name: `Hi, ${AuthService.getUserName() || "N/A"}`,
    link: `profile`,
    isUseIndex: true,
  },
  {
    id: 3,
    name: "Logout",
    isLogout: true,
    link: "/login",
  },
];

export const privacyPolicyNavList = [
  {
    id: 1,
    name: "Home",
    link: `/`,
  },
];
