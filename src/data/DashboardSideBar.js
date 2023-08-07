import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";

export const lstDashboardPanels = [
  {
    id: 1,
    name: "Company Details",
    icon: "/assets/dashboard/company_details.png",
    link: "company",
  },
  {
    id: 2,
    name: "Social Links",
    icon: "/assets/dashboard/social_links.png",
    link: "sociallinks",
  },
  {
    id: 3,
    name: "Product",
    icon: "/assets/dashboard/product.png",
    link: "product",
  },
  {
    id: 4,
    name: "Services",
    icon: "/assets/dashboard/services.png",
    link: "service",
  },
  {
    id: 5,
    name: "Clients",
    icon: "/assets/dashboard/clients.webp",
    link: "client",
  },
  {
    id: 6,
    name: "Image Gallery",
    icon: "/assets/dashboard/image_gallery.png",
    link: "portfolio",
  },
  {
    id: 7,
    name: "Testimonial",
    icon: "/assets/dashboard/testimonial.png",
    link: "testimonial",
  },
  {
    id: 8,
    name: "Enquiry",
    icon: "/assets/dashboard/inquiry.webp",
    link: "enquiry",
  },
  {
    id: 9,
    name: "Payment Options",
    icon: "/assets/dashboard/payment_options.png",
    link: "paymentoptions",
  },
  {
    id: 10,
    name: "Themes",
    icon: "/assets/dashboard/theme.png",
    link: "themes",
  },
];

export const lstAdminDashboardPanels = [
  {
    id: 1,
    name: "Company List",
    icon: "/assets/dashboard/company_details.png",
    link: "companylist",
  },
  {
    id: 2,
    name: "Social Media",
    icon: "/assets/dashboard/social_links.png",
    link: "socialmediaadd",
  },
  {
    id: 3,
    name: "Pages",
    icon: "/assets/pages.png",
    link: "pages",
  },
  {
    id: 4,
    name: "User Review",
    icon: "/assets/clientreview.webp",
    link: "userreview",
  },
  {
    id: 5,
    name: "Add Theme",
    icon: "/assets/theme.png",
    link: "addtheme",
  },
  {
    id: 6,
    name: "Setting",
    icon: "/assets/setting.webp",
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
