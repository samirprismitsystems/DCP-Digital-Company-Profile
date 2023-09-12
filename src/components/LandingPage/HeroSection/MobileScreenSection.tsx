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
        className={`mt-[5rem] text-center relative table hover:cursor-pointer overflow-hidden m-auto  `}
      >
        <div
          className="mobileImage absolute left-1 right-0 m-auto xs:w-[84%] xl:w-[88%] h-[93%] -z-10 xs:top-[3rem] xl:top-[1.3rem] overflow-hidden"
          style={{
            borderRadius: "4rem",
          }}
        >
          <img
            src={`${image || "/assets/landing/digital_profile.jpg"}`}
            alt="image.jpg"
            className={`transition-all duration-[12000ms] linear ${
              isHover ? "-translate-y-[77%]" : ""
            }`}
          />
        </div>
        <Image
          width={800}
          height={800}
          className="block object-cover h-auto object-center xs:w-[326px] lg:m-auto md:w-full md:h-[772px] xl:h-[520px]"
          src="/assets/landing/mobileScreen.webp"
          alt="mobile-screen"
        />
      </div>
    </>
  );
}
