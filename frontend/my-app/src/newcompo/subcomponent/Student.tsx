import { GlowCard } from "./GlowCard"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-6 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-10">
        Student Registration Portal
      </h2>

      <div className="flex gap-4 justify-center flex-wrap md:flex-nowrap items-center w-full max-w-6xl">
        {/* Card with Image */}
        <GlowCard
          title="Fed up with the silence?"
          description="Say no more! Experience a personalized journey—focus on skills, ace AI-powered tests, and land your dream job. Simplify your career path with us."
          glowColor="purple"
          width="18rem"
          height="24rem"
        >
          <img
            src="/studentimage.jpg"
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
              With our futuristic platform,
              students can:
            </p>

            <ul className="list-disc pl-5 mt-1 text-sm text-white/100">
              <li>Apply to top companies from one place.</li>
              <li>
              Take AI assessments directly from the portal.
              </li>
              <li>
              Quickly review performance and track progress.
              </li>
            </ul>
            <p className="text-white/100 text-sm mb-4 mt-3">
            Level up with HaloVerse—where students thrive, not just apply.
            </p>

            <div className="flex justify-center mt-auto">
              <button
                onClick={() => navigate("/hr-register")}
                className="mt-2 bg-white text-black font-semibold py-2 px-3 rounded-xl shadow-md hover:bg-pink-400 hover:text-white transition duration-300"
              >
                Student Register
              </button>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
};

export default Student;
