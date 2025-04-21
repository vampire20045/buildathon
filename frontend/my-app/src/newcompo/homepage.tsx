import { Heading } from "./subcomponent/Heading";
import Navbar from "./subcomponent/navbar";

export const Homepage = () => {
  return (
    <div className="bg-black text-white">
      {/* Full-screen container with column layout */}
      <div className="h-screen w-full flex flex-col">
        
        {/* Navbar */}
        <div className="h-18 w-full">
          <Navbar />
        </div>

        {/* Main content takes remaining height */}
        <div className="flex-1 w-full bg-black text-white flex items-center justify-center">
          <div className="flex flex-col items-center text-center space-y-4">
            <Heading heading="THE new Ai flex" />
            <p className="text-lg text-white">
              Welcome to the future of AI-powered experiences.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Get Started
              </button>
              <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
