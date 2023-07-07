import { ILoginUser } from "@/types/commonTypes";
import Utils from "./Utils";

const LOGIN_USER_EMAIL_KEY = "loginUserEmail";
const LOGIN_USER_TYPE_KEY = "DIGITALCOMPANYPROFILE";

class AuthService {
  static setLoginUserData(data: ILoginUser) {
    Utils.setItem("userType", data.type);
    Utils.setItem("userEmail", data.email_id);
    Utils.setItem("userName", data.first_name);
    Utils.setItem("siteTitle", "Admin Dashboard");
    Utils.setItem("isUserLoggedIn", true);

    return true;
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

  static getUserEmail() {
    if (typeof window !== "undefined") {
      return Utils.getItem("userEmail");
    }
    return null;
  }
}

export default AuthService;
