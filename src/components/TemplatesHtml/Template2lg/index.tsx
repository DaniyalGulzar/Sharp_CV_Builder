import { Page, Text, View, Document, Image, Link } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import moment from "moment";

const stripHtmlTags = (html: any): string => {
  if (typeof html !== "string") return ""; // Return empty string if html is not a string
  return html.replace(/<[^>]+>/g, "");
};
// const historyText = stripHtmlTags(
//   resumeData?.data?.workHistory?.data[0]?.description
// );
// const EducationText = stripHtmlTags(
//   resumeData?.data?.education?.data[0]?.description
// );

const PersonalInfoSection = ({ resumeData }: any) => (
  <div>
    {resumeData && (
      <>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>
          {resumeData?.data?.heading?.firstName &&
            resumeData?.data?.heading?.firstName}{" "}
          {resumeData?.data.heading?.lastName &&
            resumeData?.data?.heading?.lastName}
        </p>

        <p style={{ fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
          {resumeData?.data?.heading?.profession &&
            resumeData?.data?.heading?.profession}
        </p>

        <div
          style={{
            marginTop: "3px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {resumeData?.data?.portfolio?.data?.length > 0
            ? resumeData.data.portfolio.data.map(
                (portfolio: any, index: number) => (
                  <span
                    key={index}
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      paddingBottom: "5px",
                      marginRight: "5px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {"• "}
                    {portfolio.portfolio}
                  </span>
                )
              )
            : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "30%",
            }}
          >
            <img
              src="/images/pngs/linkedin-2.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[5px]" // Adjust width and height, and margin right
            />
            <span style={{ fontSize: 12 }}>
              {resumeData?.data?.heading?.linkedin || "No LinkedIn URL"}
            </span>
          </div>

          {/* Phone */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
            }}
          >
            <img
              src="/images/pngs/linkedin-2.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[5px]"
            />
            {resumeData.data.heading?.phone && (
              <span style={{ fontSize: 12 }}>
                {resumeData.data.heading?.phone}
              </span>
            )}
          </div>

          {/* Email */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "40%",
              overflow: "hidden",
            }}
          >
            <img
              src="/images/pngs/linkedin-2.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[5px]"
            />
            {resumeData.data.heading?.email && (
              <a
                href={`mailto:${resumeData.data.heading?.email}`}
                style={{
                  textDecoration: "none",
                  whiteSpace: "nowrap", // Prevent wrapping
                  overflow: "hidden", // Ensure truncated text is hidden
                  textOverflow: "ellipsis", // Add ellipsis for overflowed text
                  color: "#1E90FF",
                  flex: 1,
                  fontSize: 12,
                }}
                title={resumeData.data.heading?.email}
              >
                {resumeData.data.heading?.email}
              </a>
            )}
          </div>
        </div>
      </>
    )}
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <div
    style={{
      marginTop: "2px",
      marginBottom: "2px",
      paddingLeft: "1px",
      paddingRight: "1px",
    }}
  >
    {resumeData?.data?.summary?.value ? (
      <>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "2px", // Updated from marginVertical
            marginBottom: "2px",
            textAlign: "justify", // Justifies the title
          }}
        >
          Professional Summary
        </p>
        <p style={{ fontSize: "10px", textAlign: "justify", flexWrap: "wrap" }}>
          {stripHtmlTags(resumeData?.data?.summary?.value)}
        </p>
      </>
    ) : null}
  </div>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <div style={{ marginTop: 0, marginBottom: 0, flexWrap: "wrap" }}>
    {resumeData?.data?.workHistory?.data?.length > 0 && (
      <>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "1px", // Updated from marginVertical
            marginBottom: "1px",
            marginLeft: "32%",
          }}
        >
          Experience
        </p>
        {resumeData.data.workHistory.data.map((data: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex", // Ensure the container uses flex layout
              flexDirection: "row", // Arrange children horizontally
              alignItems: "flex-start",
              marginBottom: "10px",
              paddingLeft: "5px",
              paddingRight: "5px",
              width: "100%", // Full width container
            }}
          >
            {/* Left Section (30%) */}
            <div style={{ width: "30%", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "12px",
                  flexWrap: "wrap",
                  fontWeight: "bold",
                }}
              >
                {moment(
                  `${data.startYear}-${data.startMonth}`,
                  "YYYY-MM"
                ).format("MMM")}{" "}
                {data.startYear} -{" "}
                {data.isCurrent
                  ? "Present"
                  : `${moment(
                      `${data.endYear}-${data.endMonth}`,
                      "YYYY-MM"
                    ).format("MMM")} ${data.endYear}`}
              </span>
            </div>

            {/* Right Section (70%) */}
            <div style={{ width: "70%", paddingLeft: "10px" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "3px",
                }}
              >
                {data.jobTitle}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "3px",
                }}
              >
                {data.employer}, {data.location}
              </p>
              <span
                style={{
                  fontSize: "10px",
                  flexWrap: "wrap",
                  textAlign: "justify",
                }}
              >
                {stripHtmlTags(data?.description)}
              </span>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);

const SkillSection = ({ resumeData }: any) => (
  <div style={{ marginTop: 0, marginBottom: 0, flexWrap: "wrap" }}>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "1px", // Updated from marginVertical
            marginBottom: "1px",
            marginLeft: "32%",
          }}
        >
          Skills
        </p>
        {resumeData.data.skill.data.map((skill: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <div
              style={{ width: "30%", marginBottom: "3px", marginTop: "3px" }}
            ></div>

            <div style={{ width: "70%", marginLeft: "20px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "3px",
                  marginTop: "3px",
                }}
              >
                {"• "} {skill?.title}&nbsp;{" "}
                {skill.rating !== 0 && <>({skill.rating})</>}
              </p>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);

const EducationSection = ({ resumeData }: any) => (
  <div
    style={{
      marginTop: "0",
      marginBottom: "0",
      paddingLeft: "10px",
      paddingRight: "10px",
    }}
  >
    {resumeData?.data?.education?.data?.length > 0 && (
      <>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "1px",
            marginBottom: "1px",
            marginLeft: "32%",
          }}
        >
          Education
        </p>
        {resumeData?.data?.education.data.map((data: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <div style={{ width: "30%" }}>
              <p
                style={{
                  fontSize: "12px",
                  flexWrap: "wrap",
                  fontWeight: "bold",
                }}
              >
                {moment(`${data.endYear}-${data.endMonth}`, "YYYY-MM").format(
                  "MMM YYYY"
                )}
              </p>
            </div>
            <div style={{ width: "70%", paddingLeft: "10px" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "3px",
                }}
              >
                {data.degree}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  marginBottom: "3px",
                }}
              >
                {data.schoolName}, {data.location}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  flexWrap: "wrap",
                  textAlign: "justify",
                }}
              >
                {stripHtmlTags(data?.description)}
              </p>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);

const CertificationSection = ({ resumeData }: any) => (
  <div style={{ marginTop: 0, marginBottom: 0, flexWrap: "wrap" }}>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "1px",
            marginBottom: "1px",
            marginLeft: "32%",
          }}
        >
          Certificates
        </p>
        {resumeData.data.certificate.data.map(
          (certification: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              {/* Date Section */}
              <div
                style={{ width: "30%", marginBottom: "3px", marginTop: "3px" }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    flexWrap: "wrap",
                    fontWeight: "bold",
                  }}
                >
                  {moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")}
                </p>
              </div>

              {/* Content Section */}
              <div style={{ width: "70%", marginLeft: "20px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    marginBottom: "3px",
                    marginTop: "3px",
                  }}
                >
                  {"• "} {certification.name}
                </p>
              </div>
            </div>
          )
        )}
      </>
    )}
  </div>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "34%" }}>
    {resumeData.data.accomplishment.data?.length > 0 && (
      <>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Accomplishment</p>
        {resumeData?.data?.accomplishment?.data.map(
          (accomplishment: any, index: number) => (
            <div key={index} style={styles.skillItem}>
              <p
                key={index}
                style={{
                  marginBottom: "2px",
                  display: "flex",
                  color: "black",
                  marginTop: "3px",
                  paddingTop: "3px",
                  fontSize: "12px",
                }}
              >
                {"• "} {accomplishment}
              </p>
            </div>
          )
        )}
      </>
    )}
  </div>
);

const PortfolioSection = ({ resumeData }: any) => {
  return <></>;
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "34%" }}>
      {resumeData.data.interest.data?.length > 0 && (
        <>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Interest</p>
          {resumeData?.data?.interest?.data.map(
            (interest: any, index: number) => (
              <div key={index} style={styles.skillItem}>
                <p
                  style={{
                    marginBottom: "2px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    color: "black",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "12px",
                  }}
                >
                  {"• "} {interest}
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "34%" }}>
      {resumeData.data.software.data?.length > 0 && (
        <>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Softwares</p>
          {resumeData?.data?.software?.data.map(
            (software: any, index: number) => (
              <div key={index} style={styles.skillItem}>
                <p
                  style={{
                    marginBottom: "2px",
                    display: "flex",
                    color: "black",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "12px",
                  }}
                >
                  {"• "}
                  {software}
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "34%" }}>
      {resumeData.data.language.data?.length > 0 && (
        <>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Languages</p>
          {resumeData?.data?.language?.data.map(
            (language: any, index: number) => (
              <div key={index} style={styles.skillItem}>
                <p
                  style={{
                    marginBottom: "2px",
                    display: "flex",
                    color: "black",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "12px",
                  }}
                >
                  {`•  ${language.language} (${language.level})`}
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience: WorkExperienceSection,
  Certification: CertificationSection,
  Skill: SkillSection,
  Education: EducationSection,
  Accomplishment: AccomplishmentSection,
  Portfolio: PortfolioSection,
  Interest: InterestSection,
  Software: SoftwareSection,
  Language: LanguageSection,
};

const getComponentByName = (name: string) => {
  return SECTIONS[name] || null;
};

const Template2lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div
      style={{
        // backgroundColor: bgColor || "#ffffff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ flex: 1 }}>
        {cvInfo?.length &&
          cvInfo.map((sect: { name: string }) => {
            const Component = getComponentByName(sect.name);
            return (
              Component && (
                <div key={sect.name} style={{ marginTop: "10px" }}>
                  <Component
                    name={sect.name || "Unnamed"}
                    resumeData={resumeData}
                    bgColor={bgColor}
                  />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Template2lg;
