import { useEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function MainScrollAnimation(props: any) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setScrollDirection(currentPosition > scrollPosition ? "down" : "up");
      setScrollPosition(currentPosition);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollPosition]);

  return (
    <AnimationOnScroll
      animateIn={scrollDirection === "down" ? "animate__fadeInUp" : "none"}
    >
      {props.children}
    </AnimationOnScroll>
  );
}
