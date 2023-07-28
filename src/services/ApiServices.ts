import { IUser } from "@/types/commonTypes";
import axios from "axios";
import AuthService from "./AuthServices";
import Utils from "./Utils";
import { BASE_URI } from "./config";

const ApiService = {
  async getLandingPageResource() {
    const res = await axios.get(
      `${BASE_URI}api/pages/getsinglepage/landing-page`
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async getReviewData() {
    console.log(process.env.NEXT_PUBLIC_API_URI);
    const res = await axios.get(`${BASE_URI}api/user/getuserreview/active`);

    if (res) {
      return res.data;
    }

    return res;
  },

  async sendEmail(data: IUser) {
    const res = await axios.post(`${BASE_URI}api/pages/sendemail`, data);

    return res.data;
  },

  async loginUser(data: { email: string; password: string }) {
    const res = await axios.post(`${BASE_URI}api/user/loginuser`, data);

    return res.data;
  },

  async forgotPassword(data: any) {
    const res = await axios.post(`${BASE_URI}api/user/forgetpassword`, data);
    return res.data;
  },

  async userRegistration(data: any) {
    const res = await axios.post(`${BASE_URI}api/user/registeruser`, data);
    return res.data;
  },

  async getStates() {
    const res = await axios.get(`${BASE_URI}api/company/getstatesdata/IN`);
    return res.data;
  },

  async getCities(stateName: string) {
    const res = await axios.get(
      `${BASE_URI}api/company/getcitiesdata/${stateName}`
    );
    return res.data;
  },

  async getMapLocation(mapAddress: string) {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${mapAddress}&limit=2&format=json`
    );
    return res.data;
  },

  async saveSocialLinks(io: any) {
    const res = await axios.post(`${BASE_URI}api/company/savesocial`, io);
    return res.data;
  },

  async getSocialLinksData() {
    const res = await axios.get(
      `${BASE_URI}api/company/fetchsocial/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getProductPageDetails() {
    const res = await axios.get(
      `${BASE_URI}api/product/getproducts/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async saveProductPageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/product/createproduct`, io);
    return res.data;
  },

  async saveClientPageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/client/createclient`, io);
    return res.data;
  },

  async getServicePageDetails() {
    const res = await axios.get(
      `${BASE_URI}api/service/getservice/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getDashboardCounts() {
    const res = await axios.get(
      `${BASE_URI}api/user/getcompanydashdata/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getClientsPageDetails() {
    const res = await axios.get(
      `${BASE_URI}api/client/getclients/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async saveServicePageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/service/createservice`, io);
    return res.data;
  },

  async getImageGalleryDetails() {
    const res = await axios.get(
      `${BASE_URI}api/portfolio/getportfolio/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getTestimonialList() {
    const res = await axios.get(
      `${BASE_URI}api/testimonial/gettestimonial/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getEnquiryPageDetails() {
    const res = await axios.get(
      `${BASE_URI}api/inquiry/getinquiry/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getCompanyDetailsPageData() {
    const res = await axios.get(
      `${BASE_URI}api/company/getcompany/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async getPaymentOptionDetails() {
    const res = await axios.get(
      `${BASE_URI}api/company/fetchpaymentoptions/${AuthService.getUserEmail()}`
    );
    return res.data;
  },

  async saveImageGalleryDetails(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/portfolio/createportfolio`,
      io
    );
    return res.data;
  },

  async saveCompanyDetailsPageData(io: any) {
    const res = await axios.post(`${BASE_URI}api/company/createcompany`, io);
    return res.data;
  },

  async activeDeactiveTestimonialStatus(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/testimonial/updatetestimonialstatus`,
      io
    );
    return res.data;
  },

  async activeDeactiveEnquiryStatus(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/inquiry/updateinquirystatus`,
      io
    );
    return res.data;
  },

  async savePaymentOptionDetails(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/company/savepaymentoptions`,
      io
    );
    return res.data;
  },

  async deleteProductItem(productID: any) {
    const res = await axios.get(
      `${BASE_URI}api/product/deleteproduct/${productID}`
    );
    return res.data;
  },

  async deleteServiceItem(serviceID: any) {
    const res = await axios.get(
      `${BASE_URI}api/service/deleteservice/${serviceID}`
    );
    return res.data;
  },

  async deleteClientItem(clientID: any) {
    const res = await axios.get(
      `${BASE_URI}api/client/deleteclient/${clientID}`
    );
    return res.data;
  },

  async deletePortfolio(portfolioID: any) {
    const res = await axios.get(
      `${BASE_URI}api/portfolio/deleteportfolio/${portfolioID}`
    );
    return res.data;
  },

  async getThemes() {
    const res = await axios.get(`${BASE_URI}api/theme/getthemes`);
    return res.data;
  },

  async saveThemes(io: any) {
    const res = await axios.post(`${BASE_URI}api/theme/savecompanytheme`, io);
    return res.data;
  },

  async getWebsiteDetails() {
    const res = await axios.get(
      `${BASE_URI}api/company/fetchcompanyfront/${Utils.getItem("slug")}`
    );
    return res.data;
  },

  async getAdminDashboardData() {
    const res = await axios.get(`${BASE_URI}api/user/getadmindashdata`);
    return res.data;
  },

  async getAllCompanies() {
    const res = await axios.get(`${BASE_URI}api/company/fetchallcompany`);
    return res.data;
  },

  async updateCompanyStatus(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/company/updatecompanystatus`,
      io
    );
    return res.data;
  },

  async getAdminSocialMediaInfo() {
    const res = await axios.get(`${BASE_URI}api/company/fetchallsocial`);
    return res.data;
  },

  async getAdminSocialMediaColors() {
    const res = await axios.get(`${BASE_URI}/api/company/fetchsocialcolor`);
    return res.data;
  },

  async deleteAdminSocialMediaItem(socialMediaItemID: any) {
    const res = await axios.get(
      `${BASE_URI}api/company/deletesocial/${socialMediaItemID}`
    );
    return res.data;
  },

  async saveAdminSocialMediaInfo(io: any) {
    const res = await axios.post(`${BASE_URI}api/company/createsocial`, io);
    return res.data;
  },
};

export default ApiService;
