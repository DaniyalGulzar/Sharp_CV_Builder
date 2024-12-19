import React, { useState } from "react";

interface TabsProps {
  textEditorContent: React.ReactNode;
  skillsRatingContent: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ textEditorContent, skillsRatingContent }) => {
  const [activeTab, setActiveTab] = useState("Text Editor");

  const renderContent = () => {
    switch (activeTab) {
      case "Text Editor":
        return textEditorContent;
      case "Skills Rating":
        return skillsRatingContent;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 w-full bg-white p-5 rounded-xl">
      <div className="flex bg-[#F3F3F3] rounded-xl border-b-[1px] mb-4">
        <button
          type="button"
          className={`py-5 px-4 mx-[24px] text-sm font-medium focus:outline-none ${
            activeTab === "Text Editor" ? "border-b-2 border-blue-600 text-6B84FE" : "text-666666"
          }`}
          onClick={() => setActiveTab("Text Editor")}
        >
          Text Editor
        </button>
        <button
          type="button" 
          className={`py-2 px-4 text-sm font-medium focus:outline-none ${
            activeTab === "Skills Rating" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("Skills Rating")}
        >
          Skills Rating
        </button>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
