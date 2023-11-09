import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const BottomToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [isFired, setIsFired] = useState(false);
  const [value, setValue] = useState<number | null>(null);

  const handleScroll = () => {
    if (typeof window !== "undefined") {

      // const windowHeight = window?.innerHeight;
      // const footerPosition: any = document.querySelector("footer")?.getBoundingClientRect().top;

      // if (footerPosition+300 < windowHeight) {
      //   setIsFired(true)
      // } else {
      //   setIsFired(false)
      // }

      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  // useEffect(() => {
  //   const configureValue = () => {
  //     setValue(window.scrollY)
  //   }

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", configureValue);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("scroll", configureValue);
  //     }
  //   };
  // }, []);

  // useEffect(() => {

  // }, [value])

  return (
    <>
      {showButton && (
        <button
          className={`h-[60px] fixed bottom-[13rem] text-[3rem] right-[3rem] bg-primary-main opacity-50 hover:opacity-100 px-6 py-2 rounded-md transition-all duration-500 ease-out`}
          onClick={handleScrollToTop}
        >
          <FontAwesomeIcon className="w-[30px] h-[30px] text-black" icon={faCaretUp} />
        </button>
      )}
    </>
  );
};

export default BottomToTop;
