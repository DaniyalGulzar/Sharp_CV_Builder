import React from "react";
import { ProfessionalTitleSection } from "./ProfessionalTitleSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { WorkExperienceSection } from "./WorkExperienceSection";
import { EducationSection } from "./EducationSection";
import { AccomplishmentSection } from "./Accomplishment";
import { PortfolioSection } from "./Portfolio";
import { InterestSection } from "./InterestSection";
import { LanguageSection } from "./LanguageSection";
import { SoftwareSection } from "./SoftwareSection";
import { SkillSection } from "./SkillsSection";
import { CertificationSection } from "./CertificationSection";

const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience: WorkExperienceSection,
  Skill: SkillSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Accomplishment: AccomplishmentSection,
  Portfolio: PortfolioSection,
  Interest: InterestSection,
  Software: SoftwareSection,
  Language: LanguageSection,
};

const getComponentByName = (name: any) => {
  return SECTIONS[name] || null; // Return the component or null if not found
};

const Template8lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div className="resume-container p-4" style={{ padding: 15 }}>
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

export default Template8lg;
