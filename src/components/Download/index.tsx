import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import Template9 from "../Templates/Template9";
import Template8 from "../Templates/Template8";
import Template7 from "../Templates/Template7";
import Template6 from "../Templates/Template6";
import Template5 from "../Templates/Template5";
import Template4 from "../Templates/Template4";
import Template3 from "../Templates/Template3";
import Template2 from "../Templates/Template2";
import Template1 from "../Templates/Template1";

// Define the interface for props
interface DownloadProps {
  text: string;
  icon: any;
}

const Download: React.FC<DownloadProps> = ({ text, icon }) => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("#6b84fe");

  useEffect(() => {
    // Simulate fetching resume data
    const fetchResumeData = async () => {
      const mockData = {
        template: { title: "tempate a" },
      };
      setResumeData(mockData);
    };

    fetchResumeData();
  }, []);

  const cvvinfo = [
    { id: "1", name: "PersonalInfo" },
    { id: "2", name: "ProfessionalTitle" },
    { id: "3", name: "WorkExperience" },
    { id: "4", name: "Education" },
    { id: "5", name: "Skill" },
    { id: "6", name: "Certification" },
    { id: "7", name: "Interest" },
    { id: "8", name: "Software" },
    { id: "9", name: "Language" },
    { id: "10", name: "Accomplishment" },
    { id: "11", name: "Portfolio" },
  ];

  const getTemplateComponent = () => {
    if (!resumeData) return null;

    switch (resumeData.template.title) {
      case "tempate a":
        return (
          <Template1
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate b":
        return (
          <Template2
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate c":
        return (
          <Template3
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate d":
        return (
          <Template4
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate e":
        return (
          <Template5
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate f":
        return (
          <Template6
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate g":
        return (
          <Template7
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate h":
        return (
          <Template8
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      case "tempate i":
        return (
          <Template9
            resumeData={resumeData}
            cvInfo={cvvinfo}
            bgColor={selectedColor}
          />
        );
      default:
        return null;
    }
  };

  const templateComponent = getTemplateComponent();

  return (
    templateComponent && (
      <PDFDownloadLink
        document={templateComponent}
        fileName="resume.pdf"
        className="flex items-center"
      >
        <div className="ml-3 h-12 w-12 cursor-pointer border rounded-3xl flex items-center justify-center transition-transform duration-300 transform hover:scale-105 bg-gray-100">
          <span className="flex items-center">{icon}</span>
        </div>
        <div className="mx-3 text-[16px] text-[#666666] cursor-pointer">
          {text}
        </div>
      </PDFDownloadLink>
    )
  );
};

export default Download;
