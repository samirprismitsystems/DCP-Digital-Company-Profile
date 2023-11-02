import ProfileForm from "./ProfileForm";

export default function Profile() {
  return (
    <>
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Profile</div>
        <div className="h4 mt-1">Change Profile Details</div>
      </div>
      <div className="row flex flex-wrap justify-center mx-[-12px]">
        <div className="xs:w-full md:w-[80%] xl:w-[66%]  max-w-full px-3 pt-8 pb-0">
          <ProfileForm />
        </div>
      </div>
    </>
  );
}
