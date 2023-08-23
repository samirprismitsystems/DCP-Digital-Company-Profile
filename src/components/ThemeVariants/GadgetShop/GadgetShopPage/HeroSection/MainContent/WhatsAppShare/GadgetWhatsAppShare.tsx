import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GadgetWhatsAppShare() {
  return (
    <>
      <div className="whatsapp-share-form mt-6 gadgetfontfamily text-gadgetTheme-text">
        <form
          action="https://api.whatsapp.com/send"
          id="wtsp_share"
          target="_blank"
          className="h-[6rem] w-[600px] flex items-center  pl-6 overflow-hidden mx-auto my-0 max-w-full rounded-[1rem]"
          style={{
            backgroundColor: "rgb(232, 246, 243)",
          }}
        >
          <span className="border-0 bg-transparent py-6 px-2 gadgetfontfamily  text-[2rem] font-medium text-black">
            +91
          </span>
          <input
            type="number"
            className="focus-within:outline-none text-black font-medium border-0 bg-transparent w-full py-6 px-2 gadgetfontfamily text-[2rem]"
            value="8238255166"
          />
          <button
            type="submit"
            className="w-[10.5rem] h-[6rem] px-6 py-4 flex items-center text-white text-[1.8rem]  border-0 bg-[#25D366] wtsp_share_btn"
          >
            Share <FontAwesomeIcon className="text-white text-[2rem] mx-4" icon={faWhatsapp}/>
          </button>
        </form>
      </div>
    </>
  );
}
