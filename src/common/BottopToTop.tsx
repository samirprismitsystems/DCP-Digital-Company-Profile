import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const BottomToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  };

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          className="fixed bottom-4 text-[3rem] right-4 bg-primary-main opacity-50 hover:opacity-100 px-6 py-2 rounded-md"
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon className="text-black" icon={faCaretUp} />
        </button>
      )}
    </>
  );
};

export default BottomToTop;
