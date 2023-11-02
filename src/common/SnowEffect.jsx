import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function SnowEffect() {
  const [count, setCount] = useState(120);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Particles
        options={{
          particles: {
            color: {
              value: "#fff",
            },
            number: {
              value: count,
            },
            opacity: {
              value: { min: 0.3, max: 0.6 },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 0.5, max: 3 },
            },
            move: {
              direction: "none",
              enable: true,
              speed: { min: 1, max: 3 },
              straight: true,
            },
          },
        }}
        init={init}
      />
    </>
  );
}

export default SnowEffect;
