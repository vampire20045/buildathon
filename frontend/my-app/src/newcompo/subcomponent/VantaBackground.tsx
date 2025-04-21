import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VANTA: any;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      const effect = window.VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0x131a43,
        baseColor: 0x1a59,
        size: 1,
        amplitudeFactor: 1,
        xOffset: 0,
        yOffset: 0,
      });

      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="w-full h-screen flex items-center justify-center text-white"
    >
      <h1 className="text-4xl font-bold">Tea Time with Vanta ☕✨</h1>
    </div>
  );
};

export default VantaBackground;
