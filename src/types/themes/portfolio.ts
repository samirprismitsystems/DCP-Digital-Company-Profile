import {
  IClients,
  IEnquiry,
  IImageGallery,
  IPaymentOptions,
  IServicePageData,
  ITestimonial,
  ITheme
} from "../commonTypes";
import { ICompanyCityList, ICompanyDetails } from "../companyTypes";
import { IProduct } from "../products";
import { ISocialLinks } from "../sociallinks";

export interface IPortfolioInfo {
  client: IClients[];
  company: ICompanyDetails;
  companycities: ICompanyCityList[];
  error: string;
  message: string;
  inquiry: IEnquiry[];
  paymentinfo: IPaymentOptions;
  portfolio: IImageGallery[];
  product: IProduct[];
  service: IServicePageData[];
  social: ISocialLinks[];
  testimonial: ITestimonial[];
  theme: ITheme;
}

export interface IHomeCareInfo {
  client: IClients[];
  company: ICompanyDetails;
  companycities: ICompanyCityList[];
  error: string;
  message: string;
  inquiry: IEnquiry[];
  paymentinfo: IPaymentOptions;
  portfolio: IImageGallery[];
  product: IProduct[];
  service: IServicePageData[];
  social: ISocialLinks[];
  testimonial: ITestimonial[];
}
