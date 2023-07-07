import { ILoginUser } from "@/types/commonTypes";
import { AES } from "crypto-js";
import Utils from "./Utils";

const LOGIN_USER_EMAIL_KEY = "loginUserEmail";
const LOGIN_USER_TYPE_KEY = "DIGITALCOMPANYPROFILE";

class AuthService {
  static setLoginUserData(data: ILoginUser) {
    const userEmail = AES.encrypt(data.email_id, LOGIN_USER_EMAIL_KEY);
    const userType = AES.encrypt(data.type, LOGIN_USER_TYPE_KEY);

    Utils.setItem("userType", userType.toString());
    Utils.setItem("userEmail", userEmail.toString());
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
    const userTypeCiphertext: any = Utils.getItem("userType");
    const userTypePlaintext = AES.decrypt(
      userTypeCiphertext,
      LOGIN_USER_TYPE_KEY
    );
    return userTypePlaintext.toString();
  }
}

export default AuthService;
