import Image from "next/image";
import { useState } from "react";

export default function MobileScreenSection() {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        className={`mt-[2rem] text-center  relative table hover:cursor-pointer overflow-hidden m-auto `}
      >
        <div
          className="mobileImage absolute left-1 right-0 m-auto w-[83%] h-[93%] -z-10 top-[3rem] overflow-hidden"
          style={{
            borderRadius: "4rem",
          }}
        >
          <Image
            width={800}
            height={800}
            src="/assets/landing/digital_profile.jpg"
            alt="image.jpg"
            className={`transition-all duration-[12000ms] linear ${
              isHover ? "-translate-y-[77%]" : ""
            }`}
          />
        </div>
        <Image
          width={800}
          height={800}
          className="block object-cover sm:w-auto sm:h-auto  object-center md:w-[408px] md:h-[772px]"
          src="/assets/landing/mobileScreen.webp"
          alt="mobile-screen"
        />
      </div>
    </>
  );
}
