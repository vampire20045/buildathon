import { useState } from "react";

interface GlowCardProps {
  title: string;
  description: string;
  glowColor: "red" | "blue" | "green" | "purple" | "yellow";
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

const glowColors = {
  red: "from-black to-red-600",
  blue: "from-black to-blue-600",
  green: "from-black to-green-600",
  purple: "from-black to-purple-600",
  yellow: "from-black to-yellow-500",
};

const getRandomColor = (): "red" | "blue" | "green" | "purple" | "yellow" => {
  const colors: ("red" | "blue" | "green" | "purple" | "yellow")[] = [
    "red",
    "blue",
    "green",
    "purple",
    "yellow",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const GlowCard = ({
  title,
  description,
  glowColor,
  children,
  width,
  height,
}: GlowCardProps) => {
  const [randomGlow, setRandomGlow] = useState<
    "red" | "blue" | "green" | "purple" | "yellow"
  >(glowColor);

  // Random color change on hover
  const handleHover = () => {
    setRandomGlow(getRandomColor()); // Ensures only valid colors are used
  };

  return (
    <div
    className={`group relative bg-black border border-neutral-700 rounded-2xl p-6 overflow-hidden transition-all duration-300
        hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-md`}
      style={{
        width: width || "24rem",
        height: height || "32rem",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setRandomGlow(glowColor)} // Reset to initial color after hover
    >
      <div className="z-10 relative text-white space-y-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition duration-500 pointer-events-none">
        <div
          className={`w-full h-full rounded-xl blur-xs scale-105 bg-gradient-to-br ${glowColors[randomGlow]}`}
        />
      </div>
    </div>
  );
};
