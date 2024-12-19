import { Document, Page } from "@react-pdf/renderer";
import { ProfessionalTitleSection } from "./ProfessionalTitleSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { WorkExperienceSection } from "./WorkExperienceSection";
import { EducationSection } from "./EducationSection";
import { CertificationSection } from "./CertificationSection";
import { InterestSection } from "./InterestSection";
import { LanguageSection } from "./LanguageSection";
import { AccomplishmentSection } from "./Accomplishment";
import { PortfolioSection } from "./Portfolio";
import { SoftwareSection } from "./SoftwareSection";
import { SkillSection } from "./SkillSection";

// Mapping of section names to their respective components
const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience:WorkExperienceSection,
  Skill:SkillSection,
  Education:EducationSection,
  Certification:CertificationSection,
  Accomplishment:AccomplishmentSection,
  Portfolio:PortfolioSection,
  Interest:InterestSection,
  Software:SoftwareSection,
  Language:LanguageSection,
};

// Function to get the component by its name
const getComponentByName = (name: string) => {
  return SECTIONS[name] || null; // Return the component or null if not found
};

const Template8 = ({
  resumeData,
  bgColor,
  cvInfo,
}: {
  resumeData: any;
  bgColor: any;
  cvInfo?: { name: string }[]; // Assuming cvInfo now has `name` instead of `index`
}) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: "20px" }}>
        {cvInfo?.length &&
          cvInfo.map((sect: { name: string }) => {
            const Component = getComponentByName(sect.name); // Get component by name
            return (
              Component && (
                <Component
                  key={sect.name}
                  name={sect.name || "Unnamed"}
                  resume={resumeData}
                  bgColor={bgColor}
                  style={{ wordWrap: "break-word" }}
                />
              )
            );
          })}
      </Page>
    </Document>
  );
};

export default Template8;
