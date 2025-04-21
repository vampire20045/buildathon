// components/Navbar.tsx
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent shadow-lg backdrop-blur-md py-4 px-8 z-10">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Left: Company Name */}
      <div className="text-3xl font-bold text-white tracking-wide">
        HireVerse
      </div>

      {/* Right: Navbar Links */}
      <div className="space-x-8 text-white text-lg font-semibold">
        <Link to="/" className="hover:text-pink-400 transition duration-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-pink-400 transition duration-300">
          About
        </Link>
        <Link to="/contact" className="hover:text-pink-400 transition duration-300">
          Contact
        </Link>
      
    
      </div>
    </div>
  </nav>
  );
};
