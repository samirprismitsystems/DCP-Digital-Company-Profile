import Utils from "@/services/Utils";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

export default function GadgetWhatsAppShare() {
  const [mobile, setMobile] = useState<any>();
  const router = useRouter();

  return (
    <>
      <div className="whatsapp-share-form xs:mt-0 md:mt-6 lg:mt-0 gadgetfontfamily text-gadgetTheme-text">
        <form
          target="_blank"
          className="xs:h-[7rem] md:h-[8rem]  xs:w-[600px] sm:w-[515px] md:w-[600px] xl:h-[9.5rem] flex items-center pl-6 overflow-hidden mx-auto my-0 max-w-full rounded-[1rem] xlTwo:h-[6rem]"
          style={{
            backgroundColor: "rgb(232, 246, 243)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (mobile && mobile?.length === 10) {
              window.open(
                `https://api.whatsapp.com/send/?phone=+91${mobile}&text=Hi`,
                "_blank"
              );

              setMobile(undefined);
            }else{
              Utils.showErrorMessage("Mobile number must be 10 digit!")
              return null;
            }
          }}
        >
          <span className="border-0 bg-transparent py-6 px-2 gadgetfontfamily  xs:text-[2rem] xl:text-[2.7rem] font-medium text-black xlTwo:text-[2rem]">
            +91
          </span>
          <input
            type="number"
            required={true}
            className="focus-within:outline-none text-black font-medium border-0 bg-transparent w-full py-6 px-2 gadgetfontfamily xs:text-[2rem] xl:text-[2.7rem] xlTwo:text-[2rem]"
            value={mobile || ""}
            onChange={(e: any) => {
              const userInput = e.target.value;
              if (userInput.length <= 10) {
                setMobile(e.target.value);
              }
            }}
          />
          <button
            type="submit"
            className="xs:w-[11.5rem] xl:w-[13rem] xlTwo:w-[11.5rem] xs:h-[8rem] xl:h-[9.5rem] xl:pl-3 xlTwo:px-6 xs:px-6 py-4 flex items-center text-white 
            xs:text-[2.3rem] xl:text-[2.8rem]  border-0 bg-[#25D366] wtsp_share_btn xlTwo:text-[2rem]"
          >
            Share{" "}
            <FontAwesomeIcon
              className="text-white xs:text-[2.5rem] xl:text-[3rem] mx-4 xlTwo:text-[2.5rem]"
              icon={faWhatsapp}
            />
          </button>
        </form>
      </div>
    </>
  );
}
