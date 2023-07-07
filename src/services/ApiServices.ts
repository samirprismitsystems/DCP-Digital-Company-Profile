import { IUser } from "@/types/commonTypes";
import axios from "axios";
import AuthService from "./AuthServices";
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
};

export default ApiService;
