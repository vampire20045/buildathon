import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
const questions = [
  "Explain the concept of closures in JavaScript with an example.",
  "What are the differences between var, let, and const in JavaScript?",
  "Describe how the Virtual DOM works in React.",
  "What is the difference between == and === in JavaScript?",
];

export const Test: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [timeLeft, setTimeLeft] = useState(60 * 25); // 25 minutes timer
  const [showWarning, setShowWarning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [autoSwitchMessage, setAutoSwitchMessage] = useState("");
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Auto switch questions every 90 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => {
        if (prev < questions.length - 1) {
          setAutoSwitchMessage("✅ Question switched automatically as 1.5 minutes were over!");
          setTimeout(() => setAutoSwitchMessage(""), 4000);
          return prev + 1;
        }
        return prev;
      });
    }, 90000); // 1.5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    alert("Thank you for taking the test, We'll get back to you shortly!");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-6">
      {/* Webcam at top-right */}
      <div className="absolute top-4 right-4 w-40 h-40 border-4 border-white rounded-lg overflow-hidden shadow-lg">
        <Webcam ref={webcamRef} audio={false} className="w-full h-full object-cover" />
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-4 text-lg font-medium bg-black/60 px-4 py-2 rounded-lg tracking-wide">
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* Warning */}
      {showWarning && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-xl shadow-xl">
          ⚠️ Don't switch tabs during the test!
        </div>
      )}

      {/* Auto Switch Notification */}
      {autoSwitchMessage && (
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-xl">
          {autoSwitchMessage}
        </div>
      )}

      {/* Question Section */}
      <div className="mt-32 mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Question {currentQuestionIndex + 1}:</h2>
        <p className="text-lg">{questions[currentQuestionIndex]}</p>
      </div>

      {/* Answer Section */}
      <div className="text-center">
        <textarea
          rows={10}
          className="w-full max-w-3xl bg-gray-800 text-white p-4 rounded-xl border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Write your answer here..."
        ></textarea>

        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            Next
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
