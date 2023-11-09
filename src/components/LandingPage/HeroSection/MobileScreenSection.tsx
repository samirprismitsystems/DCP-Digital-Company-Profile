import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";
import { useState } from "react";

export default function MobileScreenSection(props: { homeImage: string }) {
  const [isHover, setIsHover] = useState(false);
  const [image, setImage] = useState(
    `${UPLOAD_IMAGE_URI}/landingpageoriginal/${props.homeImage}`
  );
  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        className={`mobile_mockup my-0 text-center relative table hover:cursor-pointer  mx-auto `}
      >
        <div
          className="digital_profile_theme absolute left-0 right-0 my-0 mx-auto w-[83%] h-[93%] z-[-1] top-[2rem] overflow-hidden  rounded-[3rem]"
          style={{
            borderRadius: "4rem",
          }}
        >
          <img
            src={`${image || "/assets/landingpage/landing/digital_profile.jpg"}`}
            alt="image.jpg"
            className={`block h-auto max-w-full align-middle transition-all duration-[12000ms] linear ${isHover ? "-translate-y-[77%]" : ""
              }`}
          />
        </div>
        <img
          className="block object-cover h-full w-full align-middle object-center"
          src="/assets/landingpage/landing/mobileScreen.webp"
          alt="mobile-screen"
        />
        <div></div>
      </div>
    </>
  );
}
