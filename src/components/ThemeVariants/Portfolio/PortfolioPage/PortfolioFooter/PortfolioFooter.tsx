import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { lstPortfolioFooter } from "../../data/data";
export default function PortfolioFooter() {
  return (
    <>
      {lstPortfolioFooter.map((item, index: number) => (
        <Link
          key={index}
          href={item.link}
          className="flex justify-center items-center  flex-col site-link back_to_top text-center text-[#818181]"
          style={{
            transition: "all .3s linear",
            textDecoration: "none",
          }}
          onClick={() => {
            Utils.scrollToView(item.link);
            return null;
          }}
        >
          <FontAwesomeIcon
            className={`${item.color} text-[3.3rem] mb-4 opacity-50`}
            icon={item.icon}
            style={{
              transition: "all 0.3s linear",
            }}
          />
          <span className="block text-[1.7rem] c-text">{item.name}</span>
        </Link>
      ))}
    </>
  );
}
