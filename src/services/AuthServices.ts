import { ILoginUser } from "@/types/commonTypes";
import { ICompanyDetails } from "@/types/companyTypes";
import { USER_TYPE } from "./Enums";
import Utils from "./Utils";

const LOGIN_USER_EMAIL_KEY = "loginUserEmail";
const LOGIN_USER_TYPE_KEY = "DIGITALCOMPANYPROFILE";

class AuthService {
  static setLoginUserData(data: ILoginUser) {
    if (data) {
      Utils.setItem("userType", data.type);
      Utils.setItem("userEmail", data.email_id);
      Utils.setItem("userName", data.first_name);
      Utils.setItem("siteTitle", "Admin Dashboard");
      Utils.setItem("isUserLoggedIn", true);

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
    const userName = Utils.getItem("userName");
    if (userName) {
      return userName;
    }

    return null;
  }

  static isUserLoggedIn() {
    const res = Utils.getItem("isUserLoggedIn");
    if (res && typeof res === "boolean") {
      return res;
    }

    return false;
  }

  static getUserType() {
    if (typeof window !== "undefined") {
      return Utils.getItem("userType");
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
    if (typeof window !== "undefined") {
      return this.getLocalUserEmail() || Utils.getItem("userEmail");
    }
    return null;
  }

  static isUserAdmin() {
    if (typeof window !== "undefined") {
      const user = this.getUserType();
      if (user === USER_TYPE.ADMIN) {
        return true;
      } else {
        return false;
      }
    }
    return null;
  }
}

export default AuthService;
