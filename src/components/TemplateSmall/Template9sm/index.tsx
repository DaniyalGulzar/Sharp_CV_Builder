import React from "react";
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

const PersonalInfoSection = ({ resumeData }: any) => (
  <div
    style={{
      textAlign: "center",
      marginBottom: "5px",
      flexWrap: "wrap",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <span style={{ fontSize: "10px", fontWeight: "bold" }}>
      {resumeData?.data?.heading?.firstName &&
        resumeData?.data?.heading?.firstName}{" "}
      {resumeData?.data?.heading?.lastName &&
        resumeData?.data?.heading?.lastName}
    </span>
    <span style={{ fontSize: "5px", lineHeight: "1.5", flexWrap: "wrap" }}>
      {resumeData?.data?.heading?.city && resumeData?.data?.heading?.city},{" "}
      {resumeData?.data?.heading?.country && resumeData?.data?.heading?.country}{" "}
      | {resumeData?.data?.heading?.phone && resumeData?.data?.heading?.phone} |{" "}
      {resumeData?.data?.heading?.email && resumeData?.data?.heading?.email} |{" "}
      {resumeData?.data?.heading?.linkedin &&
        resumeData?.data?.heading?.linkedin}
    </span>
  </div>
);

const ProfessionalTitleSection = ({ resumeData, bgColor }: any) => (
  <>
    {(resumeData?.data?.heading?.profession ||
      resumeData?.data?.summary?.value) && (
      <div
        style={{
          border: "2px double black",
        }}
      />
    )}

    {(resumeData?.data?.heading?.profession ||
      resumeData?.data?.summary?.value) && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {resumeData?.data?.heading?.profession && (
          <span
            style={{
              color: "black",
              fontSize: "7px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "normal",
              marginTop: "2px",
            }}
          >
            {resumeData.data.heading.profession}
          </span>
        )}

        {resumeData?.data?.summary?.value && (
          <p
            style={{
              width: "100%",
              fontSize: "5px",
              color: "black",
              textAlign: "justify",
              // paddingBottom: "2px",
              flexWrap: "wrap",
              wordBreak: "break-word",
            }}
          >
            {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
          </p>
        )}
      </div>
    )}
  </>
);

const SkillSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 ? (
      <>
        <div
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "1px",
            marginBottom: "2px",
            padding: "2px 0",
            backgroundColor: `${bgColor}`,
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
            }}
          >
            SKILL
          </p>
        </div>

        <div
          style={{
            padding: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                marginTop: "4px",
              }}
            >
              {resumeData?.data?.skill?.data.map(
                (skill: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                      marginBottom: "1px",
                      margin: 0,
                      fontSize: 5,
                    }}
                  >
                    • {skill.title}
                    {skill.rating !== 0 && ` (${skill.rating})`}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </>
    ) : null}
  </>
);

const WorkExperienceSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.workHistory?.data?.length > 0 ? (
      <>
        <div
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "1px",
            marginBottom: "2px",
            padding: "2px 0",
            backgroundColor: `${bgColor}`,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
            }}
          >
            WORK EXPERIENCE
          </h2>
        </div>

        {resumeData.data.workHistory.data.map((data: any, index: number) => (
          <div key={index}>
            {/* Employer and Location */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontSize: "7px",
                  fontWeight: "bold",
                  color: "black",
                  margin: 0,
                }}
              >
                {data.employer}
              </p>
              <p
                style={{
                  fontSize: "5px",
                  color: "gray",
                  textAlign: "right",
                  margin: 0,
                }}
              >
                {data.location}
              </p>
            </div>

            {/* Job Title and Duration */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontSize: "7px",
                  fontWeight: "bold",
                  color: "black",
                  margin: 0,
                }}
              >
                {data.jobTitle}
              </p>
              <p
                style={{
                  fontSize: "5px",
                  color: "black",
                  textAlign: "right",
                  margin: 0,
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
                    ).format("MMM")}  ${data.endYear}`}
              </p>
            </div>

            {/* Location */}
            <p
              style={{
                fontSize: "5px",
                color: "gray",
                textAlign: "left",
                marginBottom: 5,
                margin: 0,
              }}
            >
              {data.location}
            </p>

            {/* Description */}
            <div>
              {data.description && (
                <p
                  style={{
                    color: "black",
                    fontSize: "5px",
                    textAlign: "justify",
                    margin: 0,
                    flexWrap: "wrap",
                    wordBreak: "break-word",
                  }}
                >
                  • {sanitizeText1(stripHtmlTags1(data?.description))}
                </p>
              )}
            </div>
          </div>
        ))}
      </>
    ) : null}
  </>
);

const EducationSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 ? (
      <>
        <div
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "1px",
            marginBottom: "2px",
            padding: "2px 0",
            backgroundColor: `${bgColor}`,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
            }}
          >
            EDUCATION
          </h2>
        </div>

        {resumeData.data.education.data.map((data: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* School Name */}
            <p
              style={{
                fontWeight: "bold",
                fontSize: "7px",
                margin: 0,
                color: "black",
              }}
            >
              {data.schoolName}
            </p>

            {/* Degree and Graduation Date */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p
                style={{
                  fontSize: "7px",
                  color: "gray",
                  margin: 0,
                }}
              >
                {data.degree}
              </p>
              <p
                style={{
                  fontSize: "5px",
                  color: "gray",
                  margin: 0,
                }}
              >
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  { month: "short" }
                )}
                -{data.endYear}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                color: "black",
                fontSize: "5px",
                margin: "1px 0 0",
                flexWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              {sanitizeText(data?.description).map((desc, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <span style={{ marginRight: "5px", fontWeight: "bold" }}>
                    •
                  </span>
                  {desc}
                </div>
              ))}{" "}
            </p>
          </div>
        ))}
      </>
    ) : null}
  </>
);

const CertificationSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 ? (
      <>
        <div
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "1px",
            marginBottom: "2px",
            padding: "2px 0",
            backgroundColor: `${bgColor}`,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
            }}
          >
            CERTIFICATION
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {resumeData.data.certificate.data.map(
            (certification: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  color: "#000",
                  fontSize: "5px",
                  fontWeight: 400,
                  marginBottom: "1px", // Optional: Add margin to separate items
                }}
              >
                {/* Certification Name */}
                <p
                  style={{
                    width: "60%", // Takes up 60% of the row width
                    margin: 0,
                  }}
                >
                  {certification.name}
                </p>

                {/* Certification Dates */}
                <p
                  style={{
                    width: "40%", // Takes up 40% of the row width
                    textAlign: "right", // Align dates to the right
                    fontSize: "5px", // Optional: Adjust font size for dates
                    margin: 0,
                  }}
                >
                  ({moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")})
                </p>
              </div>
            )
          )}
        </div>
      </>
    ) : null}
  </>
);

const AccomplishmentSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <>
        {/* Section Header */}
        <div
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "1px",
            marginBottom: "2px",
            padding: "2px 0",
            backgroundColor: `${bgColor}`,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
            }}
          >
            ACCOMPLISHMENT
          </h2>
        </div>

        {/* Accomplishments */}
        <div
          style={{
            padding: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                marginTop: "4px",
              }}
            >
              {resumeData?.data?.accomplishment?.data.map(
                (accomplishment: string, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",

                      marginBottom: "1px",
                      margin: 0,
                      fontSize: 5,
                    }}
                  >
                    • {accomplishment}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </>
    )}
  </>
);

const PortfolioSection = ({ resumeData, bgColor }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <div
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "1px",
              marginBottom: "2px",
              padding: "2px 0",
              backgroundColor: `${bgColor}`,
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                textAlign: "center",
                fontStyle: "normal",
                margin: 0,
              }}
            >
              PORTFOLIO
            </h2>
          </div>

          {/* Portfolio Items */}
          <div
            style={{
              padding: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                {resumeData?.data?.portfolio?.data.map(
                  (portfolio: any, index: number) => (
                    <p
                      key={index}
                      style={{
                        flexBasis:
                          (index + 1) % 3 === 1
                            ? "33.33%"
                            : (index + 1) % 3 === 2
                            ? "40%"
                            : "26.67%",
                        marginBottom: "1px",
                        margin: 0,
                        fontSize: 5,
                      }}
                    >
                      • {portfolio?.portfolio}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const InterestSection = ({ resumeData, bgColor }: any) => {
  // Check if the interests data exists and is not empty
  const interests = resumeData?.data?.interest?.data || [];

  return (
    <>
      {interests.length > 0 && (
        <>
          {/* Section Header */}
          <div
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "1px",
              marginBottom: "2px",
              padding: "2px 0",
              backgroundColor: `${bgColor}`,
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                textAlign: "center",
                fontStyle: "normal",
                margin: 0,
              }}
            >
              INTEREST
            </h2>
          </div>

          {/* Interests List */}
          <div
            style={{
              padding: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                {interests.map((interest: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                      marginBottom: "1px",
                      margin: 0,
                      fontSize: 5,
                    }}
                  >
                    • {interest}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData, bgColor }: any) => {
  const softwareList = resumeData?.data?.software?.data || [];

  return (
    <>
      {softwareList.length > 0 && (
        <>
          {/* Section Header */}
          <div
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "1px",
              marginBottom: "2px",
              padding: "2px 0",
              backgroundColor: `${bgColor}`,
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                textAlign: "center",
                fontStyle: "normal",
                margin: 0,
              }}
            >
              SOFTWARE
            </h2>
          </div>

          {/* Software List */}
          <div
            style={{
              padding: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                {softwareList.map((software: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                      marginBottom: "1px",
                      margin: 0,
                      fontSize: 5,
                    }}
                  >
                    • {software}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData, bgColor }: any) => {
  const languages = resumeData?.data?.language?.data || [];

  return (
    <>
      {languages.length > 0 && (
        <>
          {/* Section Header */}
          <div
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "1px",
              marginBottom: "2px",
              padding: "2px 0",
              backgroundColor: `${bgColor}`,
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "10px",
                fontWeight: 800,
                textAlign: "center",
                fontStyle: "normal",
                margin: 0,
              }}
            >
              LANGUAGE
            </h2>
          </div>

          {/* Languages List */}
          <div
            style={{
              padding: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                {languages.map((language: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                      marginBottom: "1px",
                      margin: 0,
                      fontSize: 5,
                    }}
                  >
                    • {language.language}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  Skill: SkillSection,
  WorkExperience: WorkExperienceSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Accomplishment: AccomplishmentSection,
  Portfolio: PortfolioSection,
  Interest: InterestSection,
  Software: SoftwareSection,
  Language: LanguageSection,
};
const getComponentByName = (name: string) => {
  return SECTIONS[name] || null;
};
const Template9sm = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div
      style={{
        padding: "10px",
        // backgroundColor: bgColor,
      }}
    >
      {cvInfo?.length &&
        cvInfo.map((sect: { name: string }) => {
          const Component = getComponentByName(sect.name);
          return (
            Component && (
              <div
                key={sect.name}
                style={{ marginTop: "3px", wordWrap: "break-word" }}
              >
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
  );
};

export default Template9sm;
