export interface ICompanyCityList {
  id: string;
  name: string;
  state_id: string;
}

export interface IStates {
  country_id: string;
  id: string;
  name: string;
}

export interface ICompanyDetails {
  address: string;
  area: string;
  business_segment: string;
  city: string;
  company_alternate_contact: string;
  company_banner: string;
  company_contact: string;
  company_email: string;
  company_id: string;
  company_logo: string;
  company_name: string;
  company_slug: string;
  country: string;
  created_on: string;
  established_in: string;
  map_lat: string;
  map_lng: string;
  post_code: string;
  state: string;
  status: string;
  theme_id: string;
  updated_on: string;
  user_id: string;
  working_hours_day: string;
  working_hours_from: string;
  working_hours_to: string;
}

export interface IAPICompanyDetailsPage {
  user_id: string;
  company_name: string;
  company_slug: string;
  company_desc: string;
  established_in: string;
  business_segment: string;
  area: string;
  city: string;
  state: string;
  country: string;
  post_code: number;
  company_email: string;
  company_contact: number;
  company_alternate_contact: number;
  working_hours_day: string;
  working_hours_from: string;
  working_hours_to: string;
  map_lat: string;
  map_lng: string;
  isupdate: boolean;
  company_id: number;
  logo: string;
  banner: string;
}
