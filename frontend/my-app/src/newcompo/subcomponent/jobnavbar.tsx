import React from "react";

export const JobNavbar = () => {
  return (
    <nav className="flex justify-between items-center transparent p-4">
      {/* Left Section - Company Name */}
      <div className="text-white text-3xl font-bold ml-4">
        HireVerse
      </div>

      {/* Middle Section - Additional Buttons */}
      <div className="flex space-x-4 mx-auto">
        <a
          href="#"
          className=" text-white text-lg px-4 py-2 hover:border rounded hover:border-gray-200"
        >
          Applicants
        </a>
        <a
          href="#"
          className=" text-white text-lg px-4 py-2 hover:border rounded hover:border-gray-200"
        >
          Top Performers
        </a>
        <a
          href="#"
          className=" text-white text-lg px-4 py-2  hover:border rounded hover:border-gray-200"
        >
          Dashboard
        </a>
      </div>

      {/* Right Section - Links (styled as buttons) */}
      <div className="flex items-center mr-4">
       
        <a
          href="#"
          className="b text-white text-lg px-6 py-2 rounded hover:bg-white hover:text-black"
        >
          Listing.
        </a>
      </div>
    </nav>
  );
};

export default JobNavbar;
