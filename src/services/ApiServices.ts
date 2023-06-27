import { IUser, IUserRegistration } from "@/types/commonTypes";
import axios from "axios";
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

  async forgotPassword(data: { email: string }) {
    const res = await axios.post(`${BASE_URI}api/user/forgetpassword`, data);

    return res.data;
  },

  async userRegistration(data: IUserRegistration) {
    const res = await axios.post(`${BASE_URI}api/user/registeruser`, data);

    return res.data;
  },
};

export default ApiService;
