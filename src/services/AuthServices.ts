import { ILoginUser } from "@/types/commonTypes";
import { ICompanyDetails } from "@/types/companyTypes";
import { USER_TYPE } from "./Enums";
import Utils from "./Utils";

const LOGIN_USER_EMAIL_KEY = "loginUserEmail";
const LOGIN_USER_TYPE_KEY = "DIGITALCOMPANYPROFILE";

class AuthService {
  static setLoginUserData(data: ILoginUser, token: string) {
    if (data) {
      Utils.setItem("siteTitle", "Admin Dashboard");
      let userData = {
        userType: data.type,
        userEmail: data.email_id,
        userName: data.first_name,
        digimenToken: token
      }
      Utils.setItem('digimen_data', userData);
      return true;
    } else {
      return false;
    }
  }

  static setLocalUserInformation(data: ICompanyDetails) {
    Utils.setItem("localUserEmail", data.email_id);
    Utils.setItem("IMAGE_UPLOAD_ID", data.company_id);

    return true;
  }

  static setUserName(userName: string) {
    Utils.setItem("userName", userName);
  }

  static getUserName() {
    const data = Utils.getItem("digimen_data");
    if (data && data.userName) {
      return data.userName;
    }

    return null;
  }

  static isUserLoggedIn() {
    const res = Utils.getItem("isUserLoggedIn");
    if (res && typeof JSON.parse(res) === "boolean") {
      return res;
    }

    return false;
  }

  static getUserType() {
    const data = Utils.getItem("digimen_data");
    if (data && data.userType) {
      return data.userType;
    }
    return null;
  }

  static getLocalUserEmail() {
    if (typeof window !== "undefined") {
      return Utils.getItem("localUserEmail");
    }
    return null;
  }

  static setUserEmail(userEmail: string) {
    Utils.setItem("userEmail", userEmail);
  }

  static getUserEmail() {
    // if (typeof window !== "undefined") {
    //   return this.getLocalUserEmail() || Utils.getItem("userEmail");
    // }
    const data = Utils.getItem("digimen_data");
    if (data && data.userEmail) {
      return data.userEmail;
    }
    return null;
  }

  static isUserAdmin() {
    const user = this.getUserType();
    if (user === USER_TYPE.ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  static getToken() {
    const data = Utils.getItem("digimen_data");
    if (data && data.digimenToken) {
      return data.digimenToken;
    } else {
      return false;
    }
  }

}

export default AuthService;
