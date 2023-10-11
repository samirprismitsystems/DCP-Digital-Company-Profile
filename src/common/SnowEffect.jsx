import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function SnowEffect() {
  const [count, setCount] = useState(30);

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
              value: { min: 0.3, max: 1 },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
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
