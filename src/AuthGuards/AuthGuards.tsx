import { useEffect } from "react";
import LoginPage from "@/components/LoginPage/LoginPage";
import AuthService from "@/services/AuthServices";
import { USER_TYPE } from "@/services/Enums";
import { useRouter } from "next/router";

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
  }, [pathname]);

  if (AuthService.isUserLoggedIn()) {
    return children;
  }

  return <LoginPage />;
}
