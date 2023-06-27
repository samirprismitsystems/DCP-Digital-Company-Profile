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

    return true;
  }

  getLoginUserData() {}
}

export default AuthService;
