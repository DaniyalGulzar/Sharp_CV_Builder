import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import Link from "next/link";
import moment from "moment";

const stripHtmlTags1 = (html: any): string => {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]+>/g, "");
};

const sanitizeText1 = (text: string) => {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const stripHtmlTags = (html: any): string[] => {
  if (typeof html !== "string") return [];

  // Create a temporary div element to parse the HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Extract all <li> elements from the parsed HTML
  const listItems = div.querySelectorAll("li");

  // Return an array of list item text content
  return Array.from(listItems).map((item) => item.textContent?.trim() || "");
};

const sanitizeText = (text: string): string[] => {
  return stripHtmlTags(text).filter((item) => item.length > 0); // Remove empty items
};

const PersonalInfoSection = ({ resumeData, bgColor }: any) => (
  <div style={{ marginTop: "10px" }}>
    {resumeData?.data?.heading?.phone ||
    resumeData?.data?.heading?.email ||
    resumeData?.data?.heading?.linkedin ? (
      <>
        <span
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: "16px",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Contact
        </span>
        <div style={{ marginBottom: "10px", color: "white" }}>
          {resumeData?.data?.heading?.phone && (
            <span
              style={{
                marginBottom: "5px",
                fontSize: "12px",
                display: "block",
                color: `${bgColor}`,
              }}
            >
              {resumeData?.data?.heading?.phone} <span style={{}}>(Home)</span>
            </span>
          )}

          {resumeData?.data?.heading?.email && (
            <span
              style={{
                marginBottom: "5px",
                fontSize: "12px",
                display: "block",
              }}
            >
              {resumeData?.data?.heading?.email}
            </span>
          )}

          {/* {resumeData?.data?.heading?.linkedin && (
            <span style={{ marginTop: "5px", display: "block" }}>
              <Link
                href={resumeData?.data?.heading?.linkedin}
                style={{ color: "white" }}
              >
                {resumeData?.data?.heading?.linkedin}
              </Link>
            </span>
          )} */}

          {resumeData?.data?.heading?.linkedin && (
            <span
              style={{
                marginBottom: "10px",
                color: "white",
                fontSize: "12px",
                marginTop: "5px",
                display: "block",
              }}
            >
              {/* (LinkedIn) */}
              {resumeData?.data?.heading?.linkedin}{" "}
              <span style={{ color: `${bgColor}` }}>(LinkedIn)</span>
            </span>
          )}
        </div>
      </>
    ) : null}
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.summary?.value ? (
      <div style={{ marginTop: "20px" }}>
        <>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 900,
              marginBottom: "3px",
              display: "block",
            }}
          >
            Summary
          </span>
          <span
            style={{
              marginBottom: "10px",
              textAlign: "justify",
              fontSize: "10px",
              display: "block",
              flexWrap: "wrap",
              wordBreak: "break-word",
            }}
          >
            {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
          </span>
        </>
      </div>
    ) : null}
  </>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <div>
    {resumeData?.data?.workHistory?.data?.length > 0 ? (
      <>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 900,
            // marginBottom: "5px",
            marginTop: "5px",
            display: "block",
          }}
        >
          Experience
        </span>
        {resumeData?.data.workHistory.data.map((data: any, index: number) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <span
              style={{ fontWeight: "bold", fontSize: "12px", display: "block" }}
            >
              {data.employer}
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                marginTop: "3px",
                display: "block",
              }}
            >
              {data.jobTitle}
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                marginTop: "3px",
                display: "block",
              }}
            >
              {moment(`${data.startYear}-${data.startMonth}`, "YYYY-MM").format(
                "MMM"
              )}{" "}
              {data.startYear} -{" "}
              {data.isCurrent
                ? "Present"
                : `${moment(
                    `${data.endYear}-${data.endMonth}`,
                    "YYYY-MM"
                  ).format("MMM")} ${data.endYear}`}
            </span>
            <span
              style={{
                color: "gray",
                marginTop: "3px",
                fontSize: "12px",
                display: "block",
              }}
            >
              {data.location}
            </span>
            <span
              style={{
                marginTop: "5px",
                marginBottom: "10px",
                fontSize: "12px",
                display: "block",
                flexWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              {data.description === "" ? (
                ""
              ) : (
                <span
                  style={{
                    color: "black",
                    fontSize: "10px",
                    flexWrap: "wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {sanitizeText1(stripHtmlTags1(data?.description))}
                </span>
              )}
            </span>
          </div>
        ))}
      </>
    ) : null}
  </div>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.skill.data?.length > 0 && (
      <div style={{ marginTop: "10px" }}>
        <span
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: "16px",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Top Skills
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {resumeData?.data.skill.data.map((skill: any, index: number) => (
            <span
              key={index}
              style={{
                marginBottom: "5px",
                color: "white",
                marginTop: "3px",
                paddingTop: "3px",
                fontSize: "10px",
                display: "block",
              }}
            >
              {skill?.title}&nbsp;
              {skill.rating !== 0 && <>({skill.rating})</>}
            </span>
          ))}
        </div>
      </div>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.education.data?.length > 0 && (
      <div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 900,
            marginTop: "5px",
            display: "block",
          }}
        >
          Education
        </span>
        {resumeData?.data.education.data.map((data: any, index: number) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 900,
                marginTop: "5px",
                display: "block",
              }}
            >
              {data.schoolName}, {data.location1}
            </span>

            <span style={{ fontSize: "12px", display: "block" }}>
              {data.degree}, {data.fieldOfStudy}{" "}
              {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                "en-US",
                {
                  month: "short",
                }
              )}
              -{data.endYear}
            </span>

            <span
              style={{
                fontSize: "10px",
                marginTop: "5px",
                paddingLeft: "5px",
                color: "gray",
                marginBottom: "5px",
                display: "block",
                flexWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              {sanitizeText(data?.description).map((desc, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ marginRight: "5px", fontWeight: "bold" }}>
                    •
                  </span>
                  {desc}
                </div>
              ))}
            </span>
          </div>
        ))}
      </div>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 900,
            marginTop: "5px",
            display: "block",
          }}
        >
          Certificate
        </span>
        {resumeData?.data?.certificate?.data.map(
          (certification: any, index: number) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 900,
                  display: "block",
                }}
              >
                {certification.name}
              </span>
              <span style={{ fontSize: "10px", display: "block" }}>
                ({moment(certification.startDate).format("MMM YYYY")} -{" "}
                {moment(certification.endDate).format("MMM YYYY")})
              </span>
            </div>
          )
        )}
      </div>
    )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <div style={{ marginTop: "10px" }}>
        <span
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: "16px",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Accomplishment
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {resumeData.data.accomplishment.data.map(
            (accomplishment: any, index: number) => (
              <span
                key={index}
                style={{
                  marginBottom: "5px",
                  color: "white",
                  marginTop: "3px",
                  paddingTop: "3px",
                  fontSize: "10px",
                  display: "block",
                }}
              >
                {accomplishment}
              </span>
            )
          )}
        </div>
      </div>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <div style={{ marginTop: "5px" }}>
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "16px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Portfolio
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {resumeData.data.portfolio.data.map(
              (portfolio: any, index: number) => (
                <span
                  key={index}
                  style={{
                    marginBottom: "5px",
                    color: "white",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "10px",
                    display: "block",
                  }}
                >
                  {portfolio.portfolio}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <div style={styles.marginTop}>
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "16px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Interest
          </span>
          <div style={styles.skillList}>
            {resumeData.data.interest.data.map(
              (interest: any, index: number) => (
                <span
                  key={index}
                  style={{
                    marginBottom: "5px",
                    color: "white",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "10px",
                    display: "block",
                  }}
                >
                  {interest}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.software?.data?.length > 0 && (
        <div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 900,
              marginTop: "10px",
              display: "block",
            }}
          >
            Software
          </span>
          {resumeData?.data?.software?.data.map(
            (software: any, index: number) => (
              <div key={index} style={styles.marginTop}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 900,
                    display: "block",
                  }}
                >
                  {software}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length > 0 && (
        <div style={styles.marginTop}>
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "16px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Language
          </span>
          <div style={styles.skillList}>
            {resumeData.data.language.data.map(
              (language: any, index: number) => (
                <span
                  key={index}
                  style={{
                    marginBottom: "5px",
                    color: "white",
                    marginTop: "3px",
                    paddingTop: "3px",
                    fontSize: "10px",
                    display: "block",
                  }}
                >
                  {language.language} ({language.level})
                </span>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

const SELECTED_SECTIONS: any = {
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience: WorkExperienceSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Software: SoftwareSection,
};

const getComponentByName = (name: string) => {
  return SELECTED_SECTIONS[name] || null;
};

const Template7lg = ({ resumeData, bgColor, cvInfo }: any) => {
  console.log(resumeData);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          width: "40%",
          backgroundColor: ` ${bgColor}`,
          color: "black",
          paddingLeft: "15px",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          // height: "1290px",
        }}
      >
        <PersonalInfoSection resumeData={resumeData} />
        <PortfolioSection resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
        <LanguageSection resumeData={resumeData} />
        <InterestSection resumeData={resumeData} />
        <AccomplishmentSection resumeData={resumeData} />
      </div>

      {/* Right Section */}
      <div
        style={{
          width: "60%",
          backgroundColor: "white",
          padding: "10px",
          paddingTop: "20px",
          textAlign: "justify",
          // height: "1290px",
        }}
      >
        <h1 style={{ marginBottom: "5px", fontWeight: 900, fontSize: "22px" }}>
          {resumeData?.data.heading?.firstName}{" "}
          {resumeData?.data.heading?.lastName}
        </h1>
        <h2 style={{ fontWeight: 900, fontSize: "16px" }}>
          {resumeData?.data.heading?.profession}
        </h2>
        <p style={{ color: "gray", fontSize: "12px" }}>
          {resumeData?.data.heading?.city} {resumeData?.data.heading?.country},{" "}
          {resumeData?.data.heading?.postalCode}
        </p>

        {cvInfo?.length &&
          cvInfo.map((sect: any) => {
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

export default Template7lg;
