import { faCaretUp, faChevronUp } from "@fortawesome/free-solid-svg-icons";
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

    return (
        <>
            {showButton && (
                <button
                    className="w-[44px] h-[44px] fixed right-platinum8 bottom-[125px] text-[3rem] bg-gold-primary p-platinum4 rounded-md flex items-center justify-center text-white"
                    onClick={handleScrollToTop}
                >
                    <FontAwesomeIcon className="text-white" icon={faChevronUp} />
                </button>
            )}
        </>
    );
};

export default BottomToTop;
