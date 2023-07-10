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
