import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";

interface Props {
  children: React.ReactNode;
}

const VantaBackground: React.FC<Props> = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          baseColor: 0x000000,
          backgroundColor: 0x000000,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      {/* Vanta background layer (fixed behind all content) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div
          ref={vantaRef}
          className="w-full h-full"
        />
      </div>

      {/* Foreground scrollable content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default VantaBackground;
