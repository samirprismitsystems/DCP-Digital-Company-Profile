import { IUser, IUserRegistration } from "@/types/commonTypes";
import axios from "axios";

const ApiService = {
  async getLandingPageResource() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/pages/getsinglepage/landing-page"
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async getReviewData() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/user/getuserreview/active"
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async sendEmail(data: IUser) {
    const res = await axios.post(
      "http://localhost/digital-company-profile/control/api/pages/sendemail",
      data
    );

    return res.data;
  },

  async loginUser(data: { email: string; password: string }) {
    const res = await axios.post(
      "http://localhost/digital-company-profile/control/api/user/loginuser",
      data
    );

    return res.data;
  },

  async forgotPassword(data: { email: string }) {
    const res = await axios.post(
      "http://localhost/digital-company-profile/control/api/user/forgetpassword",
      data
    );

    return res.data;
  },

  async userRegistration(data: IUserRegistration) {
    const res = await axios.post(
      "http://localhost/digital-company-profile/control/api/user/registeruser",
      data
    );

    return res.data;
  },
};

export default ApiService;
