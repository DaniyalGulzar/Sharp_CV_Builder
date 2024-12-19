import React from "react";
import { ProfessionalTitleSection } from "./ProfessionalTitleSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { WorkExperienceSection } from "./WorkExperienceSection";
import { EducationSection } from "./EducationSection";
import { PortfolioSection } from "./Portfolio";
import { InterestsSection } from "./Interests";
import { SoftwareSection } from "./SoftwareSection";
import { AccomplishmentSection } from "./AccomplishmentSection";
import { LanguageSection } from "./LanguageSection";
import { CertificationSection } from "./CertificationSection";
import { SkillSection } from "./SkillSection";

// Mapping of section names to their respective components
const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  Skill: SkillSection,
  WorkExperience: WorkExperienceSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Accomplishment: AccomplishmentSection,
  Portfolio: PortfolioSection,
  Interest: InterestsSection,
  Software: SoftwareSection,
  Language: LanguageSection,
};

// Function to get the component by its name
const getComponentByName = (name: any) => {
  return SECTIONS[name] || null; // Return the component or null if not found
};

const Template8sm = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div className="resume-container " style={{ padding: 15 }}>
      {cvInfo?.length &&
        cvInfo.map((sect: any) => {
          const Component = getComponentByName(sect.name); // Get component by name

          return (
            Component && (
              <div key={sect.name} className="section">
                <Component
                  name={sect.name || "Unnamed"}
                  resume={resumeData}
                  bgColor={bgColor}
                />
              </div>
            )
          );
        })}
    </div>
  );
};

export default Template8sm;
