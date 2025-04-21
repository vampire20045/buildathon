import { GlowCard } from "./GlowCard"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";

const HRSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-6 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-10">
        HR Registration Portal
      </h2>

      <div className="flex justify-center gap-8 flex-wrap md:flex-nowrap items-center w-full max-w-6xl">
        {/* Card with Image */}
        <GlowCard
          title="Tired of Mass Screening?"
          description="Say no more! We offer a personalized and intuitive experience tailored for you, minimizing the hassle of endless applications and maximizing your potential. Let’s make things simple."
          glowColor="purple"
          width="18rem"
          height="24rem"
        >
          <img
            src="/hrimage.jpg"
            alt="HR Team"
            className="rounded-xl w-full h-full object-cover mt-4"
          />
        </GlowCard>

        {/* Card with Content + Button inside */}
        <GlowCard
          title="Why Join Us?"
          description=""
          glowColor="yellow"
          width="18rem"
          height="24rem"
        >
          <div className="mt-6 flex flex-col justify-between h-full">
            <p className="text-white/100 text-sm mb-2">
              By leveraging our
              cutting-edge system, HR teams can:
            </p>

            <ul className="list-disc pl-5 mt-1 text-sm text-white/100">
              <li>Streamline screenings and cut hiring time.</li>
              <li>Eliminate ATS barriers, ensuring every candidate is seen.</li>
              <li>Connect with top talent, not resumes.</li>
            </ul>
            <p className="text-white/100 text-sm mb-1 mt-3">
            Unlock endless opportunities with HaloVerse!
            </p>

            <div className="flex justify-center mt-auto">
              <button
                onClick={() => navigate("/hr-register")}
                className="mt-2 bg-white text-black font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-pink-400 hover:text-white transition duration-300"
              >
                HR Register
              </button>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
};

export default HRSection;
