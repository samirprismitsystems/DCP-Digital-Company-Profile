import RedThemeShareCardSection from "../ShareCards/RedThemeShareCardSection";
import RedThemeDetailsCard from "./RedThemeDetailsCard";

export default function RedThemeDetailsCardSection() {
  return (
    <>
      <div className="row justify-content-center justify-center flex flex-wrap m-auto">
        <RedThemeDetailsCard />
        <RedThemeDetailsCard />
        <RedThemeDetailsCard />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <RedThemeShareCardSection />
        <RedThemeShareCardSection />
        <RedThemeShareCardSection />
        <RedThemeShareCardSection />
      </div>
    </>
  );
}
