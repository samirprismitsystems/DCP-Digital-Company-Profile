import PageCircularLoading from "@/common/PageCircularLoading";
import LoginPage from "@/components/LoginPage/LoginPage";
import AuthService from "@/services/AuthServices";
import { USER_TYPE } from "@/services/Enums";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: any }) {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (AuthService.isUserLoggedIn() && pathname === "/login") {
      if (AuthService.getUserType() === USER_TYPE.ADMIN) {
        router.push("/admindashboard");
      } else {
        router.push("/dashboard");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (
    AuthService.getUserType() == USER_TYPE.ADMIN &&
    pathname.startsWith("/dashboard")
  ) {
    return <PageCircularLoading />;
  }

  if (
    AuthService.getUserType() == USER_TYPE.USER &&
   pathname.startsWith("/admindashboard")
  ) {
    return <PageCircularLoading />;
  }

  if (AuthService.isUserLoggedIn()) {
    return children;
  }

  return <LoginPage />;
}
