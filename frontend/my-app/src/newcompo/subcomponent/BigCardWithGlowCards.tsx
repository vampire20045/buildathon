import { GlowCard } from "./GlowCard";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const BigCardWithGlowCards = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return; // ✅ null check

    const bounds = card.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    x.set(mouseX - bounds.width / 2);
    y.set(mouseY - bounds.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center p-6">
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-7xl bg-black rounded-3xl overflow-hidden p-5
             transition-all duration-500 
             border border-white 
             hover:shadow-[0_0_50px_10px_rgba(255,255,255,0.15)]"
      >
         <h2 className="text-4xl font-bold text-white text-center mb-10">
        Corporate Offerings
      </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <GlowCard
            title="Power"
            description="Unleash the force within"
            glowColor="red"
            width="22rem"
            height="32rem"
          />
          <GlowCard
            title="Code"
            description="Crafting vibrant experiences"
            glowColor="blue"
             width="22rem"
            height="32rem"
          />
          <GlowCard
            title="Vibe"
            description="Styled for the digital age"
            glowColor="green"
             width="22rem"
            height="32rem"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BigCardWithGlowCards;
