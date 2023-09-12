import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IFaqsListProps {
  title: string;
  desc: string;
  openItem: string | null; // Track the currently open item
  onToggle: (title: string) => void; // Function to handle toggling
}

export default function FaqsList(props: IFaqsListProps) {
  const isOpen = props.openItem === props.title;

  return (
    <>
      <div className="p-0 mb-[10px] ">
        <div
          className={`p-0 mb-1 rounded-xl`}
          style={{
            backgroundImage:
              "-webkit-linear-gradient(90deg, rgb(19, 44, 51) 0%, rgb(18, 110, 131) 100%)",
          }}
        >
          <button
            className="flex items-center justify-start hover:cursor-pointer text-[2.3rem] bg-transparent text-white font-Montserrat relative w-full text-left font-medium p-4"
            onClick={() => {
              if (props.onToggle) {
                props.onToggle(props.title);
              }
            }}
          >
            {isOpen ? (
              <FontAwesomeIcon
                className="text-[2.5rem] p-4 bg-transparent font-semibold text-white"
                icon={faMinus}
                style={{
                  transform: "rotate(180deg)",
                  transition: "all 0.5s",
                  fontWeight: "bold",
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="text-[2.5rem] p-4 bg-transparent font-semibold text-white"
                icon={faAdd}
                style={{
                  transform: "rotate(-180deg)",
                  transition: "all 0.5s",
                }}
              />
            )}
            {props.title || "N/A"}
          </button>
          <div
            className={`p-4 pb-0 ${
              isOpen ? "max-h-[250px]" : "max-h-0"
            } overflow-hidden`}
            style={{
              transition: "max-height 0.5s ease-out",
            }}
          >
            <p className={`text-[1.8rem] text-white`}>{props.desc || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
