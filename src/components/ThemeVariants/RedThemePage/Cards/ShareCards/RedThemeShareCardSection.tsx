import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RedThemeShareCardSection() {
  return (
    <div className="share_links">
      <a
        href="/"
        className="rounded-2xl bg-white mb-8 flex flex-col p-6 "
        style={{
          boxShadow: "0px 0.5rem 1rem 0px rgba(102, 27, 109, 0.1)",
        }}
      >
        <span className="link-icon bg-whiteSmoke  mr-0 mb-0  w-20 h-20 rounded-2xl flex justify-center items-center">
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="text-theme01 text-5xl font-normal"
          />
        </span>
        <div className="share_links pt-2">
          <span className="block text-black text-3xl">whatsApp</span>
          <span
            className="block pt-1 text-grey mt-1 text-2xl"
            style={{
              letterSpacing: "1px",
            }}
          >
            +9182382551
          </span>
        </div>
      </a>
    </div>
  );
}
