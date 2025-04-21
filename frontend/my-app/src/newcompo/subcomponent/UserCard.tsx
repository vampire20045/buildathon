import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  date: string;
  companyName: string;
  jobTitle: string;
  logoUrl: string;
  parameters: string[];
  salary: string;
  location: string;
  details: string;
}

const bgColors = [
  "bg-gradient-to-r from-blue-700 via-gray-900 to-black",
  "bg-gradient-to-r from-violet-700 via-gray-900 to-black",
  "bg-gradient-to-r from-red-700 via-gray-900 to-black",
  "bg-gradient-to-r from-orange-700 via-gray-900 to-black",
  "bg-gradient-to-r from-gray-800 via-gray-900 to-black",
  "bg-gradient-to-r from-yellow-800 via-gray-900 to-black",
  "bg-gradient-to-r from-green-800 via-gray-900 to-black",
  "bg-gradient-to-r from-purple-800 via-gray-900 to-black",
];

export const UserCard: React.FC<UserCardProps> = ({
  date,
  companyName,
  jobTitle,
  logoUrl,
  parameters,
  salary,
  location,
  details,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [randomBg, setRandomBg] = useState(bgColors[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    setRandomBg(bgColors[randomIndex]);
  }, []);
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/Interview");
  };

  return (
    <Card className="w-[350px] h-auto rounded-2xl shadow-lg overflow-hidden m-4">
      <CardContent className="p-4 space-y-4">
        <div className={`rounded-lg p-4 text-white ${randomBg}`}>
          <p className="text-xs">{date}</p>
          <h3 className="text-xl font-semibold">{companyName}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-md">{jobTitle}</p>
            <img
              src={logoUrl}
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {parameters.map((param, index) => (
              <span
                key={index}
                className="bg-black/20 border border-white text-xs px-2 py-1 rounded-full"
              >
                {param}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <div>
            <p className="text-sm  text-gray-900 font-semibold">💸 {salary}</p>
            <p className="text-sm text-gray-900">📍 {location}</p>
          </div>
          <div className="flex gap-2">
          <Button
            onClick={() => setShowDetails((prev) => !prev)}
            className=" text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 p-2 rounded-2xl hover:bg-gray-300"
          >
            {showDetails ? "Hide" : "Details"}
          </Button>
          <Button
            onClick={handleApply}
            className=" text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 p-2 rounded-2xl hover:bg-gray-300"
          >
            Apply
          </Button>
        </div>
        </div>

        {showDetails && (
          <div className="mt-2 text-sm text-gray-600 border-t pt-2">
            {details}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
