import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function RedThemeDetailsCard({
  name,
  icon,
  isMobile,
  link,
}: {
  name: any;
  icon: IconDefinition;
  isMobile?: boolean;
  link: string;
}) {
  return (
    <div className="col-12 w-full">
      <Link
        href={link}
        target="_blank"
        className="contact-link mb-8 rounded-xl bg-gray-100  items-center flex"
      >
        <span className="link-icon w-20 h-20 rounded-2xl mr-4 flex items-center justify-center bg-theme01">
          <FontAwesomeIcon icon={icon} className="text-[3rem] text-white" />
        </span>
        {isMobile ? (
          <span className="c-text ml-4 text-black text-[1.6rem]">
            {name.length > 10 ? name : `+91 ${name}`}
          </span>
        ) : (
          <span className="c-text ml-4 text-black text-[1.6rem]">{name}</span>
        )}
      </Link>
    </div>
  );
}
