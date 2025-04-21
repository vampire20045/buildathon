import VantaBackground from "../newcompo/subcomponent/VantaBackground";
import { GlowCard } from "./subcomponent/GlowCard";
import { Navbar } from "./subcomponent/Navbar1";
import DualPortalCard from "./subcomponent/DualPortalCard";

export const Homepage = () => {
  return (
    <>
      <VantaBackground>
        <Navbar />

        {/* Hero Section (Full Screen Intro) */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-6 pt-24 text-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-pink-400">HireVerse</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
          Step into a world of seamless connections, innovative hiring, and career advancement. Scroll down to explore your next opportunity ✨
          </p>
          <div className="flex justify-center gap-6 mt-8">
          <div className="flex justify-center gap-6 mt-8">
  <button className="w-36 h-12 border-2 border-white rounded-lg text-white font-semibold shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-black transition-all duration-500">
    Hire
  </button>
  <button className="w-36 h-12 border-2 border-white rounded-lg text-white font-semibold shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-500 hover:text-black transition-all duration-500">
    Get Hired
  </button>
</div>

</div>

        </section>
        

        {/* Cards Section (below the fold) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-6">
          <h2 className="text-4xl font-bold text-white">Corporate Offerings</h2>

          <div className="flex flex-wrap gap-6 justify-center">
            <GlowCard title="Mass Screening" description="" glowColor="red">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-xl">🚀</span>
                  <span className="ml-2">
                    <strong> Streamline Your Hiring:</strong> AI-powered system
                    handles resume filtering, saving you time.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">🧠</span>
                  <span className="ml-2">
                    <strong> Smart Filtering:</strong> Evaluates resumes and
                    profiles to present only the most relevant candidates.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">🏆</span>
                  <span className="ml-2">
                    <strong> Quality First:</strong> Ensures top talent with
                    minimal effort by filtering out irrelevant applications.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">⏰</span>
                  <span className="ml-2">
                    <strong> Save Time:</strong> No more manual sifting, focus
                    on connecting with candidates instead.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">⚡</span>
                  <span className="ml-2">
                    <strong>Effortless Efficiency:</strong> Let AI do the work,
                    while you focus on hiring the perfect candidate!
                  </span>
                </li>
              </ul>
            </GlowCard>
            <GlowCard
              title="Detailed DashBoard"
              description=""
              glowColor="blue"
            >
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-xl">📊</span>
                  <span className="ml-2">
                    <strong>Real-Time Overview:</strong> Get an up-to-date view
                    of your hiring pipeline.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">📈</span>
                  <span className="ml-2">
                    <strong>Track Candidate Progress:</strong> Easily monitor
                    candidate movement through the stages.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">⚙️</span>
                  <span className="ml-2">
                    <strong>Screening Effectiveness:</strong> Measure the
                    performance of your hiring processes with metrics and
                    analytics.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">📊</span>
                  <span className="ml-2">
                    <strong>Data-Driven Decisions:</strong> Use key performance
                    indicators (KPIs) to make better recruitment choices.
                  </span>
                </li>

                <li className="flex items-center">
                  <span className="text-xl">🚀</span>
                  <span className="ml-2">
                    <strong>Optimize Your Hiring:</strong> Identify bottlenecks
                    and improve recruitment efficiency with ease.
                  </span>
                </li>
              </ul>
            </GlowCard>
            <GlowCard
              title="Employee Recommendation"
              description=""
              glowColor="green"
            >
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-xl">🤖</span>
                  <span className="ml-2">
                    <strong>AI-Powered Insights:</strong> Analyze your company's
                    hiring needs and past employee performance.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">🔍</span>
                  <span className="ml-2">
                    <strong>Smart Candidate Suggestions:</strong> Get
                    recommendations for candidates most likely to excel in your
                    organization.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">💡</span>
                  <span className="ml-2">
                    <strong>Informed Decisions:</strong> Make quick, data-driven
                    hiring decisions based on AI-generated insights.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">👥</span>
                  <span className="ml-2">
                    <strong>Perfect Fit:</strong> Ensure your hires align with
                    both the role and company culture.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-xl">⚡</span>
                  <span className="ml-2">
                    <strong>Faster Hiring Process:</strong> Reduce time spent on
                    finding the right candidate by utilizing AI-driven
                    recommendations.
                  </span>
                </li>
              </ul>
            </GlowCard>
          </div>
        </section>
        <section>
          <DualPortalCard />
        </section>
        <footer className="bg-black text-white text-center py-6 mt-10">
  <p className="text-sm">© {new Date().getFullYear()} SaneCoders. All Rights Reserved.</p>
</footer>
      </VantaBackground>
    </>
  );
};
