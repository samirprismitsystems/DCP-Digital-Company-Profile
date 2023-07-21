import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RedThemeDetailsCard() {
  return (
    <div className="col-12 w-full">
      <a
        href="/"
        className="contact-link mb-8 rounded-xl bg-gray-100  items-center flex"
      >
        <span className="link-icon w-20 h-20 rounded-2xl mr-4 flex items-center justify-center bg-theme01">
          <FontAwesomeIcon icon={faPhone} className="text-5xl text-white" />
        </span>
        <span className="c-text ml-4 text-black text-2xl">+918238255166</span>
      </a>
    </div>
  );
}
