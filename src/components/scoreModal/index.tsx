import React, { useState } from "react";
import { X } from "lucide-react";

interface ResumeScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  score?: string;
}

const ResumeScoreModal: React.FC<ResumeScoreModalProps> = ({
  isOpen,
  onClose,
  score,
}) => {
  const parseScoreDetails = (scoreString: string | undefined) => {
    if (!scoreString) return null;

    try {
      const cleanedResponse = scoreString
        .replace(/```json/g, "")
        .replace(/```/g, "") // Remove closing ```
        .replace(/###/g, "") // Remove ###
        .replace(/\*/g, "") // Remove asterisks
        .trim();

      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Error parsing score details:", error);
      return null;
    }
  };

  const categoryLabels: { [key: string]: string } = {
    keyword_alignment: "Keyword Alignment",
    skill: "Skills",
    education: "Education",
    experience: "Experience",
    achievements: "Achievements",
    grammer_mistake: "Grammar Mistakes",
    completeness: "Resume Completeness",
    relevant_to_job_title: "Relevance to Job Title",
  };

  const scoreDetails = parseScoreDetails(score);

  if (!isOpen || !scoreDetails) return null;

  const totalScore = scoreDetails.score || 0;
  const categories = Object.keys(categoryLabels)
    .filter((key) => key !== "score")
    .map((key) => ({
      category: key,
      label: categoryLabels[key],
      score: scoreDetails[key],
    }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl mx-4 sm:mx-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg sm:text-2xl font-bold text-[#0F172A]">
            Resume Score Breakdown
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-[#6B84FE] to-[#A0C4FF] text-white p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-lg font-medium">Total Score</span>
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold">
                {totalScore}
              </span>
              <span className="text-xs sm:text-sm font-medium ml-2">/ 100</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Category Scores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-[#F9FAFB] border rounded-lg shadow-sm flex justify-between items-center"
              >
                <span className="text-sm sm:text-base text-[#0F172A] font-medium">
                  {item.label}
                </span>
                <span
                  className={`text-base sm:text-lg font-bold ${
                    item.category === "relevant_to_job_title"
                      ? item.score
                        ? "text-green-600"
                        : "text-red-600"
                      : "text-[#6B84FE]"
                  }`}
                >
                  {item.category === "relevant_to_job_title"
                    ? item.score
                      ? "Yes"
                      : "No"
                    : item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-[#6B84FE] text-white rounded-lg shadow-md hover:bg-[#5A74E6] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreModal;
