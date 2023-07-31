import BackButton from "@/common/BackButton";

export default function AdminSettingPage() {
  return (
    <>
      <BackButton />
      <div className="tab_titles mb-8 -mt-4">
        <div className="h2">Website Setting</div>
        <div className="h4 mt-1">Change Website Settings</div>
      </div>
      <div
        className="digital_profile_form form_shadow bg-white rounded-2xl p-10 pb-0 block"
        style={{
          boxShadow: "0rem 0rem 1rem 0px rgb(28 66 77 / 15%)",
        }}
      >
        <div className="row -mr-3 -ml-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
          beatae vitae adipisci asperiores harum consectetur, vero aut minus
          provident? Eaque deserunt expedita quia veritatis. Ut voluptatem
          obcaecati voluptates sequi libero.
        </div>
      </div>
    </>
  );
}
