import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function RedThemeShareCardSection({
  icon,
  title,
  desc,
  link,
}: {
  icon: IconDefinition;
  title: string;
  desc: any;
  link?: string;
}) {
  return (
    <div className="share_links">
      {link ? (
        <Link
          href={link}
          className="rounded-2xl bg-white mb-8 flex flex-col p-6 "
          style={{
            boxShadow: "0px 0.5rem 1rem 0px rgba(102, 27, 109, 0.1)",
          }}
        >
          <span className="link-icon bg-whiteSmoke  mr-0 mb-8  w-20 h-20 rounded-2xl flex justify-center items-center">
            <FontAwesomeIcon
              icon={icon}
              className="text-theme01 text-5xl font-normal"
            />
          </span>
          <div className="share_links pt-2">
            <span
              className="block text-black text-3xl"
              style={{
                lineHeight: "3rem",
              }}
            >
              {title}
            </span>
            <span
              className="block  text-grey mt-1 text-[1.6rem]"
              style={{
                letterSpacing: "1px",
                marginTop: "5px",
              }}
            >
              {desc}
            </span>
          </div>
        </Link>
      ) : (
        <a
          className="rounded-2xl bg-white mb-8 flex flex-col p-6 "
          style={{
            boxShadow: "0px 0.5rem 1rem 0px rgba(102, 27, 109, 0.1)",
          }}
        >
          <span className="link-icon bg-whiteSmoke  mr-0 mb-8  w-20 h-20 rounded-2xl flex justify-center items-center">
            <FontAwesomeIcon
              icon={icon}
              className="text-theme01 text-5xl font-normal"
            />
          </span>
          <div className="share_links pt-2">
            <span
              className="block text-black text-3xl"
              style={{
                lineHeight: "3rem",
              }}
            >
              {title}
            </span>
            <span
              className="block  text-grey mt-1 text-[1.6rem]"
              style={{
                letterSpacing: "1px",
                marginTop: "5px",
              }}
            >
              {desc}
            </span>
          </div>
        </a>
      )}
    </div>
  );
}
