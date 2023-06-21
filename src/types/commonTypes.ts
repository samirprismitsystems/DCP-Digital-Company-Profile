export interface ILandingPageData {
  metaData: IMeta;
  pageDetails: ILandingPageDetails;
}

export interface IMeta {
  meta_description: string;
  meta_image: string;
  meta_keywords: string;
  meta_title: string;
  page_content: string;
  page_id: string;
  page_name: string;
  page_slug: string;
  template_name: string;
  updated_at: string;
}

export interface ILandingPageDetails {
  accordian: string;
  carddesc2: string;
  carddesc1: string;
  cardimg1: string;
  cardimg2: string;
  cardtitle1: string;
  cardtitle2: string;
  contactdesc: string;
  contacttitle: string;
  faqdesc: string;
  faqimg: string;
  faqtitle: string;
  featurebtnlink: string;
  featuredesc: string;
  featuresubtitle: string;
  featurebtntitle: string;
  featuretitle: string;
  footerpages: string;
  ftbtnlink: string;
  ftdesc: string;
  ftimg: string;
  fttitle: string;
  homebtnlink: string;
  homebtntitle: string;
  homedesc: string;
  homeimg: string;
  homesubtitle: string;
  hometitle: string;
  logoandtext: string;
  reviewsubtitle: string;
  reviewtitle: string;
  reviewdesc: string;
  steps: string;
}

export interface ILandingPageCardSteps {
  stepstitle: string;
  stepsdesc: string;
}

export interface ILandingPageReview {
  created_at: string;
  review_id: string;
  status: string;
  updated_at: string;
  user_message: string;
  user_name: string;
}

export interface IUser {
  email: string;
  contactemail:string;
  name:string;
  message:string;
}

export interface INavigationMenu{
  id:number;
  name:string;
  link:string;
}
