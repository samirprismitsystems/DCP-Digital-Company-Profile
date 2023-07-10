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
