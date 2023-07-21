import RedThemeDetailsCardSection from "./Cards/DetailsCards/DetailsCardSection";
import RedThemeAboutUs from "./RedThemeAboutUs";
import RedThemeFollowUs from "./RedThemeFollowUs";
import RedThemeHeader from "./RedThemeHeader";

export default function RedTheme() {
  return (
    <div className="bg-white container_fluid w-[575px] h-full m-auto max-w-full">
      <RedThemeHeader />
      <div
        className="profile_body pt-16"
        style={{
          border: "4rem 4rem 0 0",
        }}
      >
        <div className="container contact-section mt-20">
          <RedThemeDetailsCardSection />
          <div className="mt-16">
            <RedThemeFollowUs />
            <RedThemeAboutUs />
          </div>
        </div>
      </div>
    </div>
  );
}
