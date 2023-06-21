import React, { ReactNode, useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function MainScrollAnimation(props: any) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setScrollDirection(currentPosition > scrollPosition ? "down" : "up");
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <ScrollAnimation
      animateIn={scrollDirection === "down" ? "animate__fadeInUp" : "none"}
    >
      {props.children}
    </ScrollAnimation>
  );
}
