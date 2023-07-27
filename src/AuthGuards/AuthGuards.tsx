import LoginPage from "@/components/LoginPage/LoginPage";
import AuthService from "@/services/AuthServices";
import { USER_TYPE } from "@/services/Enums";
import { useRouter } from "next/router";

export default function AuthGuard({ children }: { children: any }) {
  const router = useRouter();
  const { pathname } = router;

  if (AuthService.isUserLoggedIn() && pathname == "/login") {
    if (typeof window !== "undefined") {
      if (AuthService.getUserType() === USER_TYPE.ADMIN) {
        router.push("/admindashboard");
        return null;
      } else {
        router.push("/dashboard");
        return null;
      }
    }
  }

  // if (
  //   AuthService.getUserType() === USER_TYPE.ADMIN &&
  //   pathname.startsWith("/dashboard")
  // ) {
  //   router.push("/admindashboard");
  //   return null;
  // }

  // if (
  //   AuthService.getUserType() === USER_TYPE.USER &&
  //   pathname.startsWith("/admindashboard")
  // ) {
  //   router.push("/dashboard");
  //   return null;
  // }

  if (AuthService.isUserLoggedIn()) {
    return children;
  }

  return <LoginPage />;
}
