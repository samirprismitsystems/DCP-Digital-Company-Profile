import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePassword() {
  return (
    <>
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Change Password</div>
      </div>
      <div className="row flex flex-wrap justify-center mx-[-12px]">
        <div className="w-[66%]  max-w-full px-3 pt-8 pb-0">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
}
