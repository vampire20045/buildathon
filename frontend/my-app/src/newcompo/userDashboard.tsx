import React from "react";
import {
    Line,
    Bar,
    Pie,
    Radar,
    Doughnut,
    PolarArea,
  } from "react-chartjs-2";
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const chartContainer = "w-full h-64 md:h-56 lg:h-48 xl:h-44 2xl:h-40";

export  function UserDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center  py-4 px-6 rounded-xl shadow-md">
        <h1 className="text-white text-2xl font-bold">User Dashboard</h1>
        <div className="text-gray-300">Welcome, <span className="text-green-400">John Doe</span></div>
      </nav>

      {/* User Info */}
      <div className="flex justify-between items-center bg-black rounded-xl p-4 shadow-md">
        <div>
          <h2 className="text-xl font-semibold">👤 John Doe</h2>
          <p className="text-gray-400">📧 john@example.com</p>
        </div>
        <div className="text-right">
          <p>🧠 Skills:</p>
          <p className="text-green-400">💻 JavaScript, 🧪 React, 🎨 CSS, 🔧 Node.js</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="min-h-screen bg-black px-4 py-10 text-white flex justify-center items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
    {/* Line Chart */}
    <div className="bg-black border border-gray-200 p-4 rounded-2xl shadow-lg w-64 h-64">
      <Line
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "📈 Skill Growth",
              data: [3, 6, 4, 8, 7],
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              tension: 0.3,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>

    {/* Bar Chart */}
    <div className="bg-black p-4 border border-gray-200 rounded-2xl shadow-lg w-64 h-64">
      <Bar
        data={{
          labels: ["React", "Node", "CSS", "JS"],
          datasets: [
            {
              label: "🧠 Proficiency",
              data: [9, 8, 7, 10],
              backgroundColor: "#0ea5e9",
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>

    {/* Pie Chart */}
    <div className="bg-black p-4  border border-gray-200 rounded-2xl shadow-lg w-64 h-64">
      <Pie
        data={{
          labels: ["Frontend", "Backend", "Design"],
          datasets: [
            {
              data: [60, 25, 15],
              backgroundColor: ["#22c55e", "#0ea5e9", "#eab308"],
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>

    {/* Radar Chart */}
    <div className="bg-black p-4  border border-gray-200 rounded-2xl shadow-lg w-64 h-64">
      <Radar
        data={{
          labels: ["Speed", "Accuracy", "Focus", "Learning"],
          datasets: [
            {
              label: "🎯 Performance",
              data: [8, 7, 9, 6],
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "#3b82f6",
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>

    {/* Doughnut Chart */}
    <div className="bg-black p-4 border border-gray-200 rounded-2xl shadow-lg w-64 h-64">
      <Doughnut
        data={{
          labels: ["HTML", "CSS", "JS"],
          datasets: [
            {
              data: [40, 35, 25],
              backgroundColor: ["#14b8a6", "#eab308", "#8b5cf6"],
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>

    {/* Polar Area Chart */}
    <div className="bg-black p-4  rounded-2xl border border-gray-200 shadow-lg w-64 h-64">
      <PolarArea
        data={{
          labels: ["Teamwork", "Creativity", "Discipline", "Speed"],
          datasets: [
            {
              data: [5, 7, 6, 9],
              backgroundColor: ["#f97316", "#0ea5e9", "#10b981", "#a855f7"],
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "white" } } } }}
      />
    </div>
  </div>
</div>


      {/* Summary Input */}
      <div className="mt-6 bg-black text-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">📝 Interview Summary</h2>
        <textarea
          className="w-full h-32 p-2 rounded border border-gray-300"
          value="This user has shown consistent improvement in JavaScript and React, demonstrating good growth in recent months."
          readOnly
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 py-6 h-screen bg-black text-white">
  {/* Main Container */}
  <div className="flex flex-col md:flex-row w-full gap-6">

    {/* Radar Chart: You vs Average User */}
    <div className="bg-black rounded-xl shadow-md flex-1 md:w-1/2 h-80 overflow-hidden">
      <h2 className="text-center font-semibold text-lg text-white mb-4">Your Performance vs Average</h2>
      <Radar
        data={{
          labels: ["Communication", "Tech Skills", "Problem Solving", "Speed"],
          datasets: [
            {
              label: "You",
              data: [8, 9, 7, 6],
              backgroundColor: "rgba(34,197,94,0.4)", // Greenish for the user
              borderColor: "#22c55e",
              borderWidth: 2,
            },
            {
              label: "Average User",
              data: [6, 7, 6, 5],
              backgroundColor: "rgba(59,130,246,0.3)", // Blue for the average
              borderColor: "#3b82f6",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#fff", // White text for the legend
              },
            },
          },
          scales: {
            r: {
              angleLines: { color: "#555" },
              grid: { color: "#444" },
              pointLabels: { color: "#fff" },
              ticks: { color: "#fff", backdropColor: "transparent" },
            },
          },
        }}
      />
    </div>

    {/* Comments and Analytics Section */}
    <div className="flex-1 md:w-1/2">
      {/* Stats Row: User Strengths and Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Stat Card 1 */}
        <div className=" p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-white">Top 10% in Communication</h3>
          <p className="text-sm text-gray-400">You're in the top 10% compared to others in communication skills.</p>
        </div>

        {/* Stat Card 2 */}
        <div className=" p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-white">Problem Solving: 90%</h3>
          <p className="text-sm text-gray-400">You scored 90% of the top candidates in problem-solving skills.</p>
        </div>

        {/* Stat Card 3 */}
        <div className=" p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-white">Top Speed: 85%</h3>
          <p className="text-sm text-gray-400">You're faster than 85% of candidates in completing the tasks.</p>
        </div>
      </div>

      {/* User Comparison Analytics */}
      <div className=" p-6 rounded-xl shadow-md w-full mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Your Analytics Summary</h3>
        <p className="text-gray-400 mb-2">You are in the **top 15%** overall among all candidates.</p>
        <p className="text-green-400 font-bold">Great job! You're improving at an impressive rate.</p>
        <p className="text-gray-400 mt-2">Compare your performance with others in the interview pool below.</p>
      </div>
    </div>

  </div>
</div>

    </div>
  );
}