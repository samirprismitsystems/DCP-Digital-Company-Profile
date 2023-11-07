import UserResetPasswordPage from "@/components/Common/ResetPassword/ResetPassword";
import { useRouter } from "next/router";

export default function Resetpassword() {
  const router = useRouter();

  return (
    <>
      <UserResetPasswordPage token={router.query.resetpassword} />
    </>
  );
}