import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lstGadgetFooter } from "../../Portfolio/data/data";

export default function GadgetFooter() {
  return (
    <>
      {lstGadgetFooter.map((item, index: number) => (
        <a
          key={index}
          href={`${item.link ? item.link : "#"}`}
          className="flex justify-center items-center  flex-col site-link back_to_top text-center text-[#818181]"
          style={{
            transition: "all .3s linear",
            textDecoration: "none",
          }}
          onClick={() => {
            Utils.scrollToView(item.link);
          }}
        >
          <FontAwesomeIcon
            className={`${item.color} text-[2.7rem] mb-4 opacity-50`}
            icon={item.icon}
            style={{
              transition: "all 0.3s linear",
            }}
          />
          <span className="block text-[1.7rem] c-text">{item.name}</span>
        </a>
      ))}
    </>
  );
}
