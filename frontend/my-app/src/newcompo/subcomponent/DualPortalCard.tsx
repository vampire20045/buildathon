import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import HRSection from "./HRSection";
import Student from "./Student";

const DualPortalCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
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
    <section className="w-full min-h-[80vh] flex justify-center items-center p-6">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="w-10xl max-w-8xl bg-black rounded-3xl p-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_10px_rgba(255,255,255,0.15)] transition-all duration-500 h-[80vh]"
      >
         <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-r from-blue-00 via-black to-blue-600 opacity-40 animate-pulse"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 h-full">
          <HRSection />
          <Student />
        </div>
      </motion.div>
    </section>
  );
};

export default DualPortalCard;
