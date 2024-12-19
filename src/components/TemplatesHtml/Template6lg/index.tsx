import React from "react";
import { pdfStyles as styles } from "./style";
import moment from "moment";
// import { ProfessionalTitleSection } from "../Template8/ProfessionalTitleSection";

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
  <div style={styles.section}>
    {(resumeData?.data?.heading?.city ||
      resumeData?.data?.heading?.country ||
      resumeData?.data?.heading?.postalCode ||
      resumeData?.data?.heading?.phone ||
      resumeData?.data?.heading?.email ||
      resumeData?.data?.heading?.linkedin) && (
      <>
        <span style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Personal Info
        </span>
        <div style={styles.divider} />
      </>
    )}

    {resumeData?.data?.heading?.city ||
    resumeData?.data?.heading?.country ||
    resumeData?.data?.heading?.postalCode ? (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Address:{" "}
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.city}, {resumeData.data.heading?.country},{" "}
          {resumeData.data.heading?.postalCode}
        </p>
      </>
    ) : null}

    {resumeData?.data?.heading?.phone ? (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Phone:{" "}
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.phone}
        </p>
      </>
    ) : null}

    {resumeData?.data?.heading?.email ? (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Email:{" "}
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.email}
        </p>
      </>
    ) : null}

    {resumeData?.data?.heading?.linkedin ? (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          LinkedIn:{" "}
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.linkedin}
        </p>
      </>
    ) : null}
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <div>
    <span
      style={{
        fontSize: 10,
        textAlign: "justify",
        color: "gray",
        display: "block", // To ensure it takes full width
        flexWrap: "wrap",
        wordBreak: "break-word",
      }}
    >
      {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
    </span>
  </div>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.workHistory.data?.length > 0 && (
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Experience
        </span>
        <div style={styles.divider} />
        {resumeData?.data.workHistory.data.map((data: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <div style={{ width: "20%" }}>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  color: "black",
                  textOverflow: "ellipsis", // Ensure truncation works
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden", // Hide overflowing text
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
              </span>
            </div>
            <div style={{ width: "10%" }} />

            <div style={{ width: "70%", marginLeft: 0 }}>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  // paddingLeft: 5,
                }}
              >
                {data.jobTitle}
              </span>
              <span
                style={{
                  display: "flex",
                  fontWeight: 500,
                  fontSize: 12,
                  // paddingLeft: 5,
                  marginTop: 3,
                  color: "gray",
                }}
              >
                {data.employer} ,{data.location}
              </span>
              <span
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  // paddingLeft: 5,
                  color: "gray",
                  wordBreak: "break-word",
                }}
              >
                {data.description === "" ? (
                  ""
                ) : (
                  <span
                    style={{
                      color: "gray",
                      fontSize: 10,
                      wordBreak: "break-word",
                    }}
                  >
                    {sanitizeText1(stripHtmlTags1(data.description))}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <div style={{ marginBottom: 10, marginTop: 5 }}>
        <span style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Skills
        </span>
        <div style={styles.divider} />
        {resumeData?.data?.skill?.data.map((skill: any, index: number) => (
          <p
            key={index}
            style={{
              marginBottom: 5,
              color: "gray",
              marginTop: 3,
              paddingTop: 3,
              fontSize: 10,
            }}
          >
            {skill?.title}&nbsp;
            {skill.rating !== 0 && <>({skill.rating})</>}
          </p>
        ))}
      </div>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.education.data?.length > 0 && (
      <div style={styles.section}>
        <span style={styles.subheading}>Education</span>
        <div style={styles.divider} />
        {resumeData?.data.education.data.map((data: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <div style={{ width: "20%" }}>
              <span style={{ fontWeight: 900, fontSize: 12, color: "black" }}>
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                  }
                )}
                -{data.endYear}
              </span>
            </div>
            <div style={{ width: "10%" }} />

            <div style={{ width: "70%" }}>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  // paddingLeft: 5,
                }}
              >
                {data.degree},{data.fieldOfStudy}
              </span>
              <span
                style={{
                  fontWeight: 500,
                  display: "flex",
                  // paddingLeft: 5,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {data.schoolName}
              </span>
              <span
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  // paddingLeft: 5,
                  color: "gray",
                  wordBreak: "break-word",

                  marginBottom:
                    index === resumeData?.data.education.data.length - 1
                      ? 10
                      : 3,
                }}
              >
                {/* {sanitizeText(stripHtmlTags(data.description))} */}
                {sanitizeText(data?.description).map((desc, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <span style={{ marginRight: "5px", fontWeight: "bold" }}>
                      •
                    </span>
                    {desc}
                  </div>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <div style={styles.section}>
        <span style={styles.subheading}>Certificate</span>
        <div style={styles.divider} />
        {resumeData?.data?.certificate?.data.map(
          (certification: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <div style={{ width: "50%" }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 12,
                    color: "black",
                    textOverflow: "ellipsis", // Ensure truncation works
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    // overflow: "hidden",
                  }}
                >
                  {moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")}
                </span>
              </div>
              {/* <div style={{ width: "10%" }} /> */}

              <div style={{ width: "50%" }}>
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    // paddingLeft: 5,
                    color: "gray",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  {certification.name}
                </p>
              </div>
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
      <div style={styles.section}>
        <span style={styles.subheading}>Accomplishment</span>
        <div style={styles.divider} />
        {resumeData?.data?.accomplishment?.data.map(
          (accomplishment: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <div style={{ width: "30%" }}></div>
              <div style={{ width: "70%" }}>
                <p
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    // paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {accomplishment}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <span style={styles.subheading}>Portfolio</span>
          <div style={styles.divider} />
          {resumeData?.data?.portfolio?.data.map(
            (portfolio: any, index: number) => (
              <p
                key={index}
                style={{
                  marginBottom: 5,
                  color: "gray",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 10,
                }}
              >
                {portfolio.portfolio}
              </p>
            )
          )}
        </div>
      )}
    </>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <div style={styles.section}>
          <span style={styles.subheading}>Interest</span>
          <div style={styles.divider} />
          {resumeData?.data?.interest?.data.map(
            (interest: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <div style={{ width: "30%" }}></div>
                <div style={{ width: "70%" }}>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: 10,
                      // paddingLeft: 5,
                      color: "gray",
                    }}
                  >
                    {interest}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.software?.data?.length > 0 && (
        <div style={{ marginBottom: 10, marginTop: 5 }}>
          <span style={styles.subheading}>Software</span>
          <div style={styles.divider} />
          {resumeData?.data?.software?.data.map(
            (software: any, index: number) => (
              <p
                key={index}
                style={{
                  marginBottom: 5,
                  color: "gray",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 10,
                }}
              >
                {software}
              </p>
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
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <span style={styles.subheading}>Language</span>
          <div style={styles.divider} />
          <div className="flex flex-col">
            {resumeData?.data?.language?.data.map(
              (language: any, index: number) => (
                <span
                  key={index}
                  style={{
                    color: "gray",
                    marginTop: 3,
                    paddingTop: 3,
                    fontSize: 10,
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
  WorkExperience: WorkExperienceSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Accomplishment: AccomplishmentSection,
  Interest: InterestSection,
};

const getComponentByName = (name: string) => {
  return SELECTED_SECTIONS[name] || null;
};

const Template6lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div style={styles.page}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          padding: 10,
          width: "100%",
        }}
      >
        <div style={{ width: "40%" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 900,
              color: "#1E3A8A",
            }}
          >
            {resumeData?.data?.heading?.firstName &&
              resumeData?.data?.heading?.firstName}{" "}
            {resumeData?.data?.heading?.lastName &&
              resumeData?.data?.heading?.lastName}
          </h1>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "5px",
              marginTop: "5px",
              color: "#1E3A8A",
            }}
          >
            {resumeData?.data?.heading?.profession &&
              resumeData?.data?.heading?.profession}
          </p>
        </div>

        <div style={{ width: "60%" }}>
          <ProfessionalTitleSection resumeData={resumeData} wrap={false} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Personal Details Section */}
        <div
          style={{
            color: "black",
            width: "30%",
            flexDirection: "column",
            paddingTop: 10,

            minHeight: "1267px",
          }}
        >
          <PersonalInfoSection resumeData={resumeData} />

          <SkillSection resumeData={resumeData} />

          <SoftwareSection resumeData={resumeData} />

          <PortfolioSection resumeData={resumeData} />

          <LanguageSection resumeData={resumeData} />
        </div>
        <div
          style={{
            borderLeft: "1px solid gray",
            marginLeft: 10,
          }}
        />
        {/* Right Side - Experience and Education */}
        <div
          style={{
            backgroundColor: "white",
            paddingLeft: 15,
            width: "70%",
            textAlign: "justify",
            paddingTop: 10,

            minHeight: "1267px",
          }}
        >
          {cvInfo?.length &&
            cvInfo.map((sect: { name: string }) => {
              const Component = getComponentByName(sect.name);
              return (
                Component && (
                  <div key={sect.name} style={{ marginTop: 10 }}>
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
    </div>
  );
};

export default Template6lg;
