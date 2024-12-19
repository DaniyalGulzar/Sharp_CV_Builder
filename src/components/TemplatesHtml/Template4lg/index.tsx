import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import Link from "next/link";
import moment from "moment";

const stripHtmlTags = (html: any): string => {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]+>/g, "");
};

const sanitizeText = (text: string) => {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const PersonalInfoSection = ({ resumeData }: any) => (
  <div style={styles.subSection}>
    {(resumeData?.data?.heading?.firstName ||
      resumeData?.data?.heading?.lastName) && (
      <>
        <span
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          PERSONAL DETAILS
        </span>

        <span style={{ fontWeight: "bold", color: "white", fontSize: 12 }}>
          Name:{" "}
        </span>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.firstName}{" "}
          {resumeData?.data?.heading?.lastName}
        </span>
      </>
    )}

    {(resumeData?.data?.heading?.city ||
      resumeData?.data?.heading?.country ||
      resumeData?.data?.heading?.postalCode) && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Address:{" "}
        </span>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.city && `${resumeData.data.heading.city}, `}
          {resumeData.data.heading?.country &&
            `${resumeData.data.heading.country}, `}
          {resumeData.data.heading?.postalCode}
        </span>
      </>
    )}

    {resumeData?.data?.heading?.phone && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Phone Number:{" "}
        </span>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.phone}
        </span>
      </>
    )}

    {resumeData?.data?.heading?.email && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Email Address:{" "}
        </span>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.email}
        </span>
      </>
    )}

    {resumeData?.data?.heading?.linkedin && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Linkedin:{" "}
        </span>
        <span
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.linkedin}
        </span>
      </>
    )}
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <div style={{ width: "100%", marginBottom: 2 }}>
    {resumeData?.data?.summary?.value ? (
      <span
        style={{
          color: "gray",
          fontSize: 10,
          textAlign: "justify",
        }}
      >
        {stripHtmlTags(resumeData?.data?.summary?.value)}
      </span>
    ) : null}
  </div>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.workHistory?.data?.length > 0 && (
      <div style={styles.workExperience}>
        <span
          style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          WORK EXPERIENCE
        </span>

        {resumeData.data.workHistory.data.map((data: any, index: number) => (
          <div key={index} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "bold",
                  width: "60%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.jobTitle}
              </span>

              <span
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "right",
                  width: "40%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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

            <span
              style={{
                fontSize: 12,
                color: "black",
                marginBottom: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.location}
            </span>

            <span
              style={{
                fontSize: 10,
                color: "gray",
                marginBottom: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.description ? (
                <span style={{ color: "black" }}>
                  {stripHtmlTags(data?.description)}
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        ))}
      </div>
    )}
  </>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <div>
        <hr style={{ borderBottom: "2px solid gray", marginBottom: 5 }} />

        <div style={styles.skills}>
          <h2
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            SKILLS
          </h2>
          {resumeData.data.skill.data.map((data: any, index: number) => (
            <div key={index} style={styles.section}>
              <span style={{ fontSize: 12, color: "black" }}>
                {data.title}&nbsp;
                {data.rating !== 0 && <span>({data.rating})</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 && (
      <div style={styles.education}>
        <h2
          style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          EDUCATION AND QUALIFICATION
        </h2>

        {resumeData.data.education.data.map((data: any, index: number) => (
          <div key={index} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center", // Ensures proper alignment
                marginBottom: 5, // Added margin for spacing between elements
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "bold",
                  width: "60%", // Limit width to avoid overflow
                  overflow: "hidden", // Hide overflow content
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                }}
              >
                {data.degree}
              </span>

              <span
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "right", // Align dates to the right side
                  width: "40%", // Limit width to avoid overlap
                  overflow: "hidden", // Hide overflow content
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                }}
              >
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                  }
                )}
                - {data.endYear}
              </span>
            </div>

            <span
              style={{
                fontSize: 12,
                color: "black",
                marginBottom: 3,
                overflow: "hidden", // Hide any overflow content
                textOverflow: "ellipsis", // Add ellipsis for overflow text
              }}
            >
              {data.schoolName}
            </span>
          </div>
        ))}
      </div>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData.data.certificate?.data?.length > 0 &&
      resumeData.data.certificate.data[0].name !== "" && (
        <div>
          <hr style={{ borderBottom: "2px solid gray", paddingBottom: 5 }} />

          <div style={styles.skills}>
            <h2
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: 900,
                marginBottom: 5,
              }}
            >
              CERTIFICATE
            </h2>
            {resumeData.data.certificate?.data.map(
              (certification: any, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 12, color: "black" }}>
                    {certification.name}
                  </span>
                  <span style={{ fontSize: 12, color: "black" }}>
                    {moment(certification.startDate).format("MMM YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM YYYY")}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          ACCOMPLISHMENT
        </h2>
        {resumeData.data.accomplishment.data.map(
          (accomplishment: any, index: number) => (
            <div key={index}>
              <span
                style={{
                  marginBottom: 2,
                  display: "flex",
                  color: "white",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 12,
                }}
              >
                {"• "} {accomplishment}
              </span>
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
        <div>
          <h2
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            PORTFOLIO
          </h2>
          {resumeData.data.portfolio.data.map(
            (portfolio: any, index: number) => (
              <div key={index}>
                <span
                  style={{
                    marginBottom: 2,
                    display: "flex",
                    color: "white",
                    marginTop: 3,
                    paddingTop: 3,
                    fontSize: 12,
                  }}
                >
                  {portfolio.portfolio}
                </span>
              </div>
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
        <div>
          <h2
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            INTEREST
          </h2>
          {resumeData.data.interest.data.map((interest: any, index: number) => (
            <div key={index}>
              <span
                style={{
                  marginBottom: 2,
                  display: "flex",
                  color: "white",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 12,
                }}
              >
                {"• "} {interest}
              </span>
            </div>
          ))}
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
          <div
            style={{
              borderBottom: "2px solid gray",
              paddingBottom: 5,
            }}
          />
          <div style={styles.skills}>
            <h2
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: 900,
                marginBottom: 5,
              }}
            >
              SOFTWARE
            </h2>
            {resumeData.data.software.data.map(
              (software: any, index: number) => (
                <div key={index} style={styles.section}>
                  <span style={{ fontSize: 12, color: "black" }}>
                    {software}
                  </span>
                  {/* <span style={styles.rightAlign}>{data.level}</span> */}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            LANGUAGE
          </h2>
          {resumeData.data.language.data.map((language: any, index: number) => (
            <div key={index}>
              <span
                style={{
                  marginBottom: 2,
                  display: "flex",
                  color: "white",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 10,
                }}
              >
                {"• "}
                {language.language} ({language.level})
              </span>
            </div>
          ))}
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
  Skill: SkillSection,
  Software: SoftwareSection,
};

const getComponentByName = (name: string) => {
  return SELECTED_SECTIONS[name] || null; // Return the component or null if not found
};

const Template4lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          position: "relative",
        }}
      >
        <View style={{ padding: 10 }}>
          {/* Header with Name */}
          <View
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid black",
              textAlign: "center",
              padding: 10,
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            <Text>
              {resumeData?.data?.heading?.firstName}{" "}
              {resumeData?.data?.heading?.lastName}
            </Text>
          </View>
        </View>

        {/* Left Section with Full-Height Background */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            backgroundColor: `${bgColor}`,
            paddingLeft: 15,
            paddingTop: 10,
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PersonalInfoSection resumeData={resumeData} />
          <PortfolioSection resumeData={resumeData} />
          <InterestSection resumeData={resumeData} />
          <AccomplishmentSection resumeData={resumeData} />
          <LanguageSection resumeData={resumeData} />
        </View>

        {/* Right Section with Content Sections */}
        <View
          style={{
            marginLeft: "40%",
            backgroundColor: "white",
            paddingLeft: 10,
            paddingRight: 10,
            width: "60%",
            textAlign: "justify",
          }}
        >
          <View>
            {cvInfo?.length &&
              cvInfo.map((sect: { name: string }) => {
                const Component = getComponentByName(sect.name); // Get component by name
                return (
                  Component && (
                    <View key={sect.name} style={{ marginTop: 10 }}>
                      <Component
                        name={sect.name || "Unnamed"}
                        resumeData={resumeData}
                        bgColor={bgColor}
                      />
                    </View>
                  )
                );
              })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template4lg;
