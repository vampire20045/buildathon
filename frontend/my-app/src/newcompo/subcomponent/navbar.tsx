import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const NavItem = ({ title, items }: { title: string; items: string[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-black">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-white hover:text-blue-500 transition"
      >
        {title}
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-40 text-white bg-white shadow-lg rounded-md z-10">
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 text-black"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-black shadow flex items-center justify-between">
      {/* Left - Company Name */}
      <div className="text-3xl font-bold text-blue-800">Xyc hshsh</div>

      {/* Center - Dropdowns */}
      <div className="flex gap-6 text-sm text-white">
        <NavItem title="Learn" items={['Blog', 'Tutorials', 'Guides']} />
        <NavItem title="Portfolio" items={['Stocks', 'Crypto', 'Real Estate']} />
        <NavItem title="SIP" items={['Create SIP', 'Track SIP']} />
        <NavItem title="Invest" items={['Mutual Funds', 'ETFs', 'Bonds']} />
      </div>

      {/* Right - Auth */}
      <div className="flex gap-4">
        <button className="px-4 py-2 text-sm text-white rounded hover:bg-[#1e293b] transition">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition">
          Startup
        </button>
      </div>
    </nav>
  );
}
