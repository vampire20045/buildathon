import React, { useState } from "react";
import { UserCard } from "./subcomponent/UserCard";

const jobData = [
  {
    date: "April 22, 2025",
    companyName: "Amazon",
    jobTitle: "Senior UI/UX Designer",
    logoUrl: "/amazonLogo.jpg",
    parameters: ["Part time", "Senior level", "Remote", "Project based"],
    salary: "₹18 LPA",
    location: "Remote",
    details:
      "Looking for a designer with 5+ years of experience. Must be proficient in Figma, have a great design sense, and work well in distributed teams.",
  },
  {
    date: "April 20, 2025",
    companyName: "Netflix",
    jobTitle: "Frontend Developer",
    logoUrl: "/netflixLogo.jpg",
    parameters: ["Full time", "Mid level", "On-site", "Entertainment"],
    salary: "₹25 LPA",
    location: "Bangalore, India",
    details:
      "Join our core UI team working on the Netflix web platform. Strong React experience is a must. Experience with accessibility and animations is a big plus.",
  },
  {
    date: "April 18, 2025",
    companyName: "YouTube",
    jobTitle: "Video Algorithm Analyst",
    logoUrl: "/youtubeLogo.jpg",
    parameters: ["Internship", "Entry level", "Remote", "AI Focused"],
    salary: "₹50,000/month",
    location: "Remote",
    details:
      "Work with the algorithm research team to evaluate engagement patterns and support video trend predictions. Python + data visualization skills required.",
  },
  {
    date: "April 16, 2025",
    companyName: "Snapchat",
    jobTitle: "Augmented Reality Engineer",
    logoUrl: "/snapchatLogo.jpg",
    parameters: ["Full time", "Senior level", "On-site", "R&D"],
    salary: "₹32 LPA",
    location: "Mumbai, India",
    details:
      "Looking for someone to push the boundaries of AR on mobile devices. C++, Unity3D or Lens Studio experience preferred. Must love experimenting!",
  },
  {
    date: "April 14, 2025",
    companyName: "Google",
    jobTitle: "Cloud DevOps Engineer",
    logoUrl: "/googleLogo.jpg",
    parameters: ["Contract", "Mid level", "Hybrid", "Cloud"],
    salary: "₹28 LPA",
    location: "Hyderabad, India",
    details:
      "Manage GCP-based infrastructure, build CI/CD pipelines and help teams scale apps smoothly. Must be experienced in Docker, Kubernetes and Terraform.",
  },
  {
    date: "April 12, 2025",
    companyName: "Spotify",
    jobTitle: "Data Storytelling Specialist",
    logoUrl: "/spotifyLogo.jpg",
    parameters: ["Part time", "Creative", "Remote", "Music"],
    salary: "₹12 LPA",
    location: "Remote",
    details:
      "Tell stories through numbers! Turn data into insights for listener habits, playlists, and artist trends. Must know SQL, Tableau, and love music 🎶.",
  },
  {
    date: "April 10, 2025",
    companyName: "Twitter",
    jobTitle: "Security Research Engineer",
    logoUrl: "/twitterLogo.jpg",
    parameters: ["Full time", "Senior level", "Remote", "Cybersecurity"],
    salary: "₹30 LPA",
    location: "Delhi, India",
    details:
      "Lead proactive threat hunting and create automation tools to identify platform abuse. Experience with Python, security protocols, and incident response required.",
  },
];

export const Dashboard: React.FC = () => {
    const [jobTitleFilter, setJobTitleFilter] = useState("");
    const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  
    const uniqueParameters = Array.from(
      new Set(jobData.flatMap((job) => job.parameters))
    );
  
    const handleParameterChange = (param: string) => {
      setSelectedParameters((prev) =>
        prev.includes(param)
          ? prev.filter((p) => p !== param)
          : [...prev, param]
      );
    };
  
    const filteredJobs = jobData.filter((job) => {
      const jobTitleMatch = job.jobTitle
        .toLowerCase()
        .includes(jobTitleFilter.toLowerCase());
  
      const parameterMatch =
        selectedParameters.length === 0 ||
        selectedParameters.every((param) => job.parameters.includes(param));
  
      return jobTitleMatch && parameterMatch;
    });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-black-900 to-red-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-gradient-to-b from-black-900 to-black shadow-md border-r border-black-700">
        <h2 className="text-xl font-bold mb-6 text-white-400">Filter Jobs</h2>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-red-800">Job Title</label>
          <input
            type="text"
            value={jobTitleFilter}
            onChange={(e) => setJobTitleFilter(e.target.value)}
            placeholder="Search job title..."
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <p className="font-medium mb-2 text-red-800">Parameters</p>
          <div className="space-y-2">
            {uniqueParameters.map((param, index) => (
              <label key={index} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={param}
                  checked={selectedParameters.includes(param)}
                  onChange={() => handleParameterChange(param)}
                  className="accent-green-500"
                />
                <span>{param}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <UserCard key={index} {...job} />
        ))}
      </main>
    </div>
  );
};
