import { ICompanyDetails } from "./companyTypes";

export interface IUser {
  email: string;
  contactemail: string;
  name: string;
  message: string;
}

export interface INavigationMenu {
  id: number;
  name: string;
  link: string;
  isNavigate?: boolean;
  target?: boolean;
}

export interface ILoginScreenPrivacyPolicy {
  id: number;
  name: string;
  link: string;
}

export interface IUserRegistration {
  first_name: string;
  last_name: string;
  email_id: string;
  password: string;
  contact_no: number;
  profile_photo: string;
  isupdate: boolean;
}

export interface ILoginUser {
  contact_no: string;
  created_on: string;
  email_id: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_photo: string;
  status: string;
  type: string;
  updated_on: string;
  user_id: string;
}

export interface IMap {
  lat: number;
  lon: number;
  displayname: string;
}

export interface IDashboardCounts {
  clients: number;
  error: number;
  inquiry: number;
  portfolio: number;
  product: number;
  service: number;
  testimonials: number;
}

export interface IAdminDashboardCounts {
  clients: number;
  company: ICompanyDetails[];
  error: boolean;
  inquiry: number;
  orders: number;
  portfolio: number;
  product: number;
  service: number;
  testimonials: number;
  users: number;
}

export interface IServicePageData {
  company_id: string;
  created_on: string;
  service_desc: string;
  service_id: string;
  service_image: string;
  service_name: string;
  service_price: string;
  updated_on: string;
}

export interface IClients {
  client_id: string;
  client_logo: string;
  client_name: string;
  company_id: string;
  created_on: string;
  updated_on: string;
}

export interface IImageGallery {
  company_id: string;
  created_at: string;
  portfolio_desc: string;
  portfolio_id: string;
  portfolio_image: string;
  portfolio_name: string;
  updated_at: string;
}

export interface ITestimonial {
  client_name: string;
  comment: string;
  company_id: string;
  created_on: string;
  email_address: string;
  ratting: string;
  status: string;
  testimonial_id: string;
  updated_on: string;
}

export interface IEnquiry {
  client_name: string;
  company_id: string;
  created_on: string;
  email_address: string;
  inquiry_id: string;
  message: string;
  phone_number: string;
  status: string;
  updated_on: string;
}

export interface IPaymentOptions {
  account_holder_name: string;
  account_type: string;
  bank_account_number: string;
  bank_ifsc_code: string;
  bank_name: string;
  company_id: string;
  created_at: string;
  googlepay_number: string;
  option_id: string;
  paytm_number: string;
  phonepay_number: string;
  qrcode: string;
  razorpay_key_id: string;
  razorpay_key_secret: string;
  updated_at: string;
}

export interface ITheme {
  created_at: string;
  theme_id: string;
  theme_image: string;
  theme_name: string;
  updated_at: string;
}

export interface ISocialMediaColors {
  created_at: string;
  socialmedia_color_id: string;
  socialmedia_color_name: string;
  updated_at: string;
}

export interface IPagesInfo {
  meta_description: string;
  meta_image: string;
  meta_keywords: string;
  page_id: string;
  meta_title: string;
  page_content: any;
  page_name: string;
  page_slug: string;
  template_name: string;
}

export interface IAdminUserReview {
  created_at: string;
  review_id: string;
  status: string;
  updated_at: string;
  user_message: string;
  user_name: string;
}
