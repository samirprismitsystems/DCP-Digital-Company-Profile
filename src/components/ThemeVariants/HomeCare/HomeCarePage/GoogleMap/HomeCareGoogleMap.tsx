import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";

export default function HomeCareGoogleMap() {
  const objCompany = useContext(ThemeContextApi).company;
  return (
    <>
      <div
        id="location"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Google Map
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4">
          <div className="max-w-full">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                objCompany.address
              )}&z=15&output=embed`}
              width="100%"
              height="450"
              frameBorder={0}
              className="border-0"
              allowFullScreen={true}
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
