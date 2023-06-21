import { IUser } from "@/types/commonTypes";
import axios from "axios";

const ApiService = {
  async getLandingPageResource() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/pages/getsinglepage/landing-page",
      {
        withCredentials: false,
      }
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async getReviewData() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/user/getuserreview/active",
      {
        withCredentials: false,
      }
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async sendEmail(data: IUser) {
    const res = await axios.post(
      "http://localhost/digital-company-profile/control/api/pages/sendemail",
      data,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  },
};

export default ApiService;
