import { IUser } from "@/types/commonTypes";
import axios from "axios";
import AuthService from "./AuthServices";
import { BASE_URI } from "./config";
import Utils from "./Utils";

const ApiService = {

  async checkUser(userData: any){
    const res = await axios.post(
      `${BASE_URI}api/user/checkuser`,userData
    );

    if (res) {
      return res.data;
    }

    return res;
  },

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
    const res = await axios.get(`${BASE_URI}api/user/getuserreview/active`);

    if (res) {
      return res.data;
    }

    return res;
  },

  async sendEmail(data: IUser) {
    const res = await axios.post(
      `${BASE_URI}api/pages/sendemailgetintouch`,
      data
    );

    return res.data;
  },

  async loginUser(data: any) {
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
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}/api/company/fetchsocial/${AuthService.getUserEmail()}?token=${token}`);
    return res.data;
  },

  async getAdminSiteSettingInfo() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/sitesetting/getsetting?token=${token}`);
    return res.data;
  },

  async getPublicSiteSettingInfo() {
    const res = await axios.get(`${BASE_URI}api/sitesetting/getpublicsetting`);
    return res.data;
  },

  async saveAdminSiteSetting(io: any) {
    const res = await axios.post(`${BASE_URI}api/sitesetting/savesetting`, io);
    return res.data;
  },

  async getProductPageDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}/api/product/getproducts/${AuthService.getUserEmail()}?token=${token}`);
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

  async saveAdminThemeInfo(io: any) {
    const res = await axios.post(`${BASE_URI}api/theme/createtheme`, io);
    return res.data;
  },

  async getServicePageDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/service/getservice/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async getDashboardCounts() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/user/getcompanydashdata/${AuthService.getUserEmail()}?token=${token}`);
    return res.data;
  },

  async getClientsPageDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/client/getclients/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async getAdminThemes() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/theme/getthemes?token=${token}`);
    return res.data;
  },

  async saveServicePageDetails(io: any) {
    const res = await axios.post(`${BASE_URI}api/service/createservice`, io);
    return res.data;
  },

  async getImageGalleryDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/portfolio/getportfolio/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async getTestimonialList() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/testimonial/gettestimonial/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async getEnquiryPageDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/inquiry/getinquiry/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async getCompanyDetailsPageData() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/company/getcompany/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  // async getCompanyDetailsPageData() {
  //   let token = AuthService.getToken();
  //   const res = await axios.get(`/api/company/getcompany?user=${AuthService.getUserEmail()}`,{
  //     headers:{
  //       token: token
  //     }
  //   });
  //   return res.data;
  // },

  async getPaymentOptionDetails() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/company/fetchpaymentoptions/${AuthService.getUserEmail()}?token=${token}`
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

  async createTestimonial(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/testimonial/createtestimonial`,
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
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/client/deleteclient/${clientID}?token=${token}`
    );
    return res.data;
  },

  async deleteAdminTheme(themeID: any) {
    const res = await axios.get(`${BASE_URI}api/theme/deletetheme/${themeID}`);
    return res.data;
  },

  async deletePortfolio(portfolioID: any) {
    const res = await axios.get(
      `${BASE_URI}api/portfolio/deleteportfolio/${portfolioID}`
    );
    return res.data;
  },

  async getThemes() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/theme/getthemes?token=${token}`);
    return res.data;
  },

  async saveThemes(io: any) {
    const res = await axios.post(`${BASE_URI}api/theme/savecompanytheme`, io);
    return res.data;
  },

  async getWebsiteDetails(slug: any) {
    const res = await axios.get(
      `${BASE_URI}api/company/fetchcompanyfront/${slug}`
    );
    return res.data;
  },

  async getAdminDashboardData() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/user/getadmindashdata?token=${token}`);
    return res.data;
  },

  async getAllCompanies() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/company/fetchallcompany?token=${token}`);
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
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/company/fetchallsocial?token=${token}`);
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

  async getAllPagesInfo() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/pages/getpages?token=${token}`);
    return res.data;
  },

  async deletePageItem(pageID: number) {
    const res = await axios.get(`${BASE_URI}api/pages/deletepage/${pageID}`);
    return res.data;
  },

  async saveAdminSocialMediaInfo(io: any) {
    const res = await axios.post(`${BASE_URI}api/company/createsocial`, io);
    return res.data;
  },

  async getAllAdminUserReview() {
    let token = AuthService.getToken();
    const res = await axios.get(`${BASE_URI}api/user/getuserreview/all?token=${token}`);
    return res.data;
  },

  async updateUserReviewStatus(io: any) {
    const res = await axios.post(`${BASE_URI}api/user/updatereviewstatus`, io);
    return res.data;
  },

  async saveAdminGoogleAnalyticsInfo(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/sitesetting/savegoogleanalytics`,
      io
    );
    return res.data;
  },

  async getUserProfileInfo() {
    let token = AuthService.getToken();
    const res = await axios.get(
      `${BASE_URI}api/user/getuser/${AuthService.getUserEmail()}?token=${token}`
    );
    return res.data;
  },

  async saveUserProfileInfo(io: any) {
    const res = await axios.post(`${BASE_URI}api/user/registeruser`, io);
    return res.data;
  },

  async changeUserPassword(io: any) {
    const res = await axios.post(`${BASE_URI}/api/user/changepassword`, io);
    return res.data;
  },

  async resetUserPassword(io: any) {
    const res = await axios.post(`${BASE_URI}/api/user/resetpass`, io);
    return res.data;
  },

  async registerUserAdmin(io: any) {
    const res = await axios.post(`${BASE_URI}api/user/registeruseradmin`, io);
    return res.data;
  },

  async getUserByCompanyID(companyID: string) {
    const res = await axios.get(
      `${BASE_URI}api/user/getcompanyuser/${companyID}`
    );
    return res.data;
  },

  async getAdminSocialColors() {
    const res = await axios.get(`${BASE_URI}api/company/fetchsocialcolor`);
    return res.data;
  },

  async saveAdminSocialMediaColorInfo(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/company/createsocialmediacolor`,
      io
    );
    return res.data;
  },

  async deleteAdminSocialMediaClass(deleteID: string) {
    const res = await axios.get(
      `${BASE_URI}api/company/deletesocialcolor/${deleteID}`
    );
    return res.data;
  },

  async updateAdminSocialClass(io: any) {
    const res = await axios.post(
      `${BASE_URI}api/company/updatesocialmediacolor`,
      io
    );
    return res.data;
  },

  async addAdminUserReview(io: any) {
    const res = await axios.post(`${BASE_URI}api/user/addreview`, io);
    return res.data;
  },

  async createCompanyPage(io: any) {
    const res = await axios.post(`${BASE_URI}api/pages/createpage`, io);
    return res.data;
  },

  async createEnquiry(io: any) {
    const res = await axios.post(`${BASE_URI}api/inquiry/createinquiry`, io);
    return res.data;
  },

  async getSomePageData(io: any) {
    const res = await axios.post(`${BASE_URI}api/pages/getsomepagedata`, io);
    return res.data;
  },

  async getPrivacyPolicy() {
    const res = await axios.get(
      `${BASE_URI}api/pages/getsinglepage/privacy-policy`
    );
    return res.data;
  },

  async getCookiePolicy() {
    const res = await axios.get(
      `${BASE_URI}api/pages/getsinglepage/cookie-policy`
    );
    return res.data;
  },
};

export default ApiService;
