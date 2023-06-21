// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function MobileScreenSection() {
//   const [isHover, setIsHover] = useState(false);
//   return (
//     <>
//       <div
//         onMouseEnter={() => {
//           setIsHover(true);
//         }}
//         onMouseLeave={() => {
//           setIsHover(false);
//         }}
//         style={{
//           borderRadius: "6rem",
//         }}
//         className={`table hover:cursor-pointer w-[408px] h-[745px] relative text-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-48 overflow-hidden rounded-3xl`}
//       >
//         <div
//           className={`transition-transform duration-[15000ms] ease-out ${
//             isHover ? "-translate-y-full" : ""
//           } m-auto absolute left-0 right-0 -z-10 w-[83%] top-3 overflow-hidden rounded-3xl`}
//           style={{
//             borderRadius: "3rem",
//           }}
//         >
//           <img
//             src="/assets/landing/digital_profile.jpg"
//             alt="image.jpg"
//             className="w-full h-auto align-middle -z-10"
//           />
//         </div>
//         <img
//           className="absolute w-full object-cover object-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 block"
//           src="/assets/landing/mobileScreen.webp"
//           alt="mobile-screen"
//         />
//       </div>
//       <Link
//         href="#"
//         className="text-xl btnHoverEffect w-72 text-white block m-auto text-center py-2 mt-32"
//       >
//         <button className="text-center rounded text-white">
//           Create Your Profile
//         </button>
//       </Link>
//     </>
//   );
// }

import Image from "next/image";
import Link from "next/link";
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
          <img
            src="/assets/landing/digital_profile.jpg"
            alt="image.jpg"
            className={`transition-all duration-[12000ms] linear ${
              isHover ? "-translate-y-[77%]" : ""
            }`}
          />
        </div>
        <img
          className="block object-cover sm:w-auto sm:h-auto  object-center md:w-[408px] md:h-[772px] sm:w-full sm:h-full"
          src="/assets/landing/mobileScreen.webp"
          alt="mobile-screen"
        />
      </div>
    </>
  );
}
