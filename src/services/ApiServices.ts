import { IUser } from "@/types/commonTypes";
import axios from "axios";

const ApiService = {
  async getLandingPageResource() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/pages/getsinglepage/landing-page",
    );

    if (res) {
      return res.data;
    }

    return res;
  },

  async getReviewData() {
    const res = await axios.get(
      "http://localhost/digital-company-profile/control/api/user/getuserreview/active",
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
    );
  },
};

export default ApiService;
