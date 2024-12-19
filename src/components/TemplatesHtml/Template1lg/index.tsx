import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./styles";
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
  <div>
    {/* Name */}
    <p
      style={{
        fontSize: "22px",
        fontWeight: "700",
        margin: "0",
        padding: "0",
      }}
    >
      {resumeData?.data?.heading?.firstName &&
        resumeData?.data?.heading?.firstName}{" "}
      {resumeData?.data?.heading?.lastName &&
        resumeData?.data?.heading?.lastName}
    </p>

    {/* Profession */}
    <p
      style={{
        fontSize: "18px",
        marginTop: "10px",
        margin: "0",
        padding: "0",
      }}
    >
      {resumeData?.data?.heading?.profession}
    </p>

    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      {resumeData?.data?.heading?.email ||
      resumeData?.data?.heading?.phone ||
      resumeData?.data?.heading?.postalCode ||
      resumeData?.data?.portfolio?.data?.name ? (
        <>
          {/* Personal Info */}
          <p
            style={{
              fontWeight: "700",
              fontSize: "16px",
              margin: "0",
              padding: "0",
            }}
          >
            Personal Info
          </p>

          {/* Address */}
          {resumeData?.data?.heading?.postalCode && (
            <>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  margin: "0",
                  padding: "0",
                }}
              >
                Address:
              </p>

              <p
                style={{
                  marginTop: "5px",
                  fontSize: "10px",
                  paddingTop: "5px",
                  margin: "0",
                  padding: "0",
                }}
              >
                {resumeData?.data?.heading?.postalCode},{" "}
                {resumeData?.data?.heading?.city},{" "}
                {resumeData?.data?.heading?.country}
              </p>
            </>
          )}

          {/* Phone */}
          {resumeData?.data?.heading?.phone && (
            <>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  margin: "0",
                  padding: "0",
                }}
              >
                Phone:
              </p>

              <p
                style={{
                  marginTop: "5px",
                  fontSize: "10px",
                  paddingTop: "5px",
                  margin: "0",
                  padding: "0",
                }}
              >
                {resumeData?.data?.heading?.phone}
              </p>
            </>
          )}

          {/* Email */}
          {resumeData?.data?.heading?.email && (
            <>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  margin: "0",
                  padding: "0",
                }}
              >
                Email:
              </p>
              <p
                style={{
                  fontSize: "10px",
                  paddingTop: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "0",
                  padding: "0",
                }}
              >
                {resumeData?.data?.heading?.email}
              </p>
            </>
          )}

          {/* LinkedIn */}
          {resumeData?.data?.heading?.linkedin && (
            <>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  margin: "0",
                  padding: "0",
                }}
              >
                LinkedIn:
              </p>
              <p
                style={{
                  fontSize: "10px",
                  paddingTop: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "0",
                  padding: "0",
                }}
              >
                {resumeData?.data?.heading?.linkedin}
              </p>
            </>
          )}

          {/* Portfolio */}
          {resumeData?.data?.portfolio?.data?.name && (
            <p
              style={{
                marginTop: "10px",
                fontSize: "14px",

                margin: "0",
                padding: "0",
              }}
            >
              {/* {resumeData?.data?.portfolio?.data?.name} */}
            </p>
          )}
        </>
      ) : null}
    </div>
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <div>
    {resumeData?.data?.heading?.email ? (
      <p
        style={{
          fontSize: "10px",
          marginTop: "5px",
          textAlign: "justify",
          margin: "0",
          padding: "0",
          flexWrap: "wrap",
          wordBreak: "break-word",
        }}
      >
        {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
      </p>
    ) : null}
  </div>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <div>
    {resumeData?.data?.workHistory?.data?.length > 0 && (
      <>
        {/* Work History Header */}
        <p
          style={{
            fontSize: "16px",
            marginTop: "10px",
            display: "flex",

            borderBottom: "1px solid gray",
            borderTop: "1px solid gray",
            color: "#003d73",
            padding: "4px",
            fontWeight: 900,
            margin: "0",
          }}
        >
          Work History
        </p>

        {/* Work History Items */}
        {resumeData.data.workHistory.data.map((data: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            {/* Date Section */}
            <div style={{ width: "33%" }}>
              <p
                style={{
                  fontWeight: "900",
                  fontSize: "12px",
                  color: "gray",
                  margin: "0",
                }}
              >
                {moment(`${data.startYear}${data.startMonth}`, "YYYYMM").format(
                  "MMM"
                )}{" "}
                {data.startYear}-{" "}
                {data.isCurrent
                  ? "Present"
                  : `${moment(
                      `${data.endYear}${data.endMonth}`,
                      "YYYYMM"
                    ).format("MMM")} ${data.endYear}`}
              </p>
            </div>

            {/* Job Details Section */}
            <div style={{ width: "67%" }}>
              <p
                style={{
                  fontWeight: "900",
                  fontSize: "14px",
                  paddingLeft: "5px",
                  margin: "0",
                }}
              >
                {data.jobTitle}
              </p>
              <p
                style={{
                  display: "flex",
                  fontWeight: 500,
                  fontSize: 10,
                  paddingLeft: 5,
                  marginTop: 3,
                  color: "gray",
                }}
              >
                {data.employer}, {data.location}
              </p>

              {/* Job Description */}
              {data.description && (
                <p
                  style={{
                    fontSize: "10px",
                    marginTop: "5px",
                    paddingLeft: "5px",
                    color: "gray",
                    textAlign: "justify",
                    margin: "0",
                    wordBreak: "break-word",
                  }}
                >
                  {sanitizeText1(stripHtmlTags1(data.description))}
                </p>
              )}
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);

const SkillSection = ({ resumeData }: any) => {
  return (
    <div
      style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
    >
      {resumeData?.data?.skill?.data?.length > 0 && (
        <>
          <p style={{ fontWeight: "700", fontSize: "16px", marginBottom: "0" }}>
            Skills
          </p>

          {resumeData.data.skill.data.map((skill: any, index: any) => (
            <span
              key={index}
              style={{
                fontSize: "12px",
                marginTop: 5,
                paddingBottom: 5,
                marginBottom: 0,
              }}
            >
              {skill?.title}&nbsp;
              {skill.rating !== 0 && <span>({skill.rating})</span>}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

const EducationSection = ({ resumeData }: any) => {
  return (
    <div>
      {resumeData?.data?.education?.data?.length > 0 && (
        <>
          {/* Education Header */}
          <p
            style={{
              fontSize: 16,
              marginTop: 10,
              display: "flex",
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
              color: "#003d73",
              padding: "4px",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            Education
          </p>

          {/* Education Items */}
          {resumeData.data.education.data.map(
            (data: any, index: any) =>
              data.degree && (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                    flexWrap: "nowrap",
                  }}
                >
                  {/* Date Section */}
                  <div style={{ width: "33%" }}>
                    <p
                      style={{
                        fontWeight: "900",
                        fontSize: "12px",
                        color: "gray",
                      }}
                    >
                      {new Date(
                        `${data.endYear}-${data.endMonth}-01`
                      ).toLocaleString("en-US", { month: "short" })}
                      -{data.endYear}
                    </p>
                  </div>

                  {/* Details Section */}
                  <div style={{ width: "67%" }}>
                    <p
                      style={{
                        fontWeight: "900",
                        fontSize: "14px",
                        paddingLeft: "5px",
                        margin: "0",
                      }}
                    >
                      {data.degree}
                    </p>
                    <p
                      style={{
                        fontWeight: 500,
                        display: "flex",
                        paddingLeft: 5,
                        fontSize: 10,
                        marginTop: 2,
                        margin: "0",
                      }}
                    >
                      {data.schoolName}
                    </p>
                    {data.description && (
                      <p
                        style={{
                          margin: "0",
                          textAlign: "justify",
                          fontSize: 10,
                          marginTop: 5,
                          paddingLeft: 5,
                          color: "gray",
                          wordBreak: "break-word",
                        }}
                      >
                        {sanitizeText(data?.description).map((desc, index) => (
                          <div key={index} style={{ display: "flex" }}>
                            <span
                              style={{ marginRight: "5px", fontWeight: "bold" }}
                            >
                              •
                            </span>
                            {desc}
                          </div>
                        ))}{" "}
                      </p>
                    )}
                  </div>
                </div>
              )
          )}
        </>
      )}
    </div>
  );
};

const CertificationSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginBottom: "25px" }}>
      {resumeData?.data?.certificate?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p
            style={{
              fontSize: 16,
              marginTop: 10,
              display: "flex",
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
              color: "#003d73",
              padding: "4px",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            Certificates
          </p>

          {resumeData.data.certificate.data.map(
            (certification: any, index: number) =>
              certification.name && (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  {/* Certification Name */}
                  <span style={{ fontSize: "12px", color: "gray" }}>
                    • {certification.name}
                  </span>

                  {/* Certification Dates */}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      textAlign: "right",
                    }}
                  >
                    {moment(certification.startDate).format("MMM DD, YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM DD, YYYY")}
                  </span>
                </div>
              )
          )}
        </>
      )}
    </div>
  );
};

const AccomplishmentSection = ({ resumeData }: any) => {
  return (
    <div>
      {resumeData?.data?.accomplishment?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p
            style={{
              fontSize: 16,
              marginTop: 10,
              display: "flex",
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
              color: "#003d73",
              padding: "4px",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            Accomplishments
          </p>

          {/* List of Accomplishments */}
          {resumeData.data.accomplishment.data.map(
            (accomplishment: any, index: number) => (
              <p
                key={index}
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  paddingBottom: 5,
                  display: "flex",
                  color: "gray",
                }}
              >
                • {accomplishment}
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <div
      style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
    >
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p style={{ fontWeight: 700, fontSize: "16px" }}>Portfolios</p>

          {/* List of Portfolios */}
          {resumeData?.data?.portfolio?.data.map(
            (portfolio: any, index: number) => (
              <span
                key={index}
                style={{ fontSize: 12, marginTop: 5, paddingBottom: 5 }}
              >
                {portfolio.portfolio}
              </span>
            )
          )}
        </>
      )}
    </div>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      {resumeData?.data?.interest?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: 0 }}>
            Interests
          </p>
          {resumeData?.data?.interest?.data?.map(
            (interest: any, index: any) => (
              <span
                key={index}
                style={{ fontSize: 12, marginTop: 5, paddingBottom: 5 }}
              >
                {interest}
              </span>
            )
          )}
        </>
      )}
    </div>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <div style={{}}>
      {resumeData?.data?.software?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p
            style={{
              fontSize: 16,
              marginTop: 5,
              display: "flex",
              borderBottom: "1px solid gray",
              borderTop: "1px solid gray",
              color: "#003d73",
              padding: "4px",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            Softwares
          </p>

          {/* List of Software */}
          {resumeData.data.software.data.map((software: any, index: number) => (
            <p
              key={index}
              style={{
                fontSize: 12,
                marginTop: 5,
                paddingBottom: 5,
                display: "flex",
                color: "gray",
                flexDirection: "row",
              }}
            >
              {"• "} {software}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      {resumeData?.data?.language?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: 0 }}>
            Languages
          </p>

          {/* List of Languages */}
          {resumeData.data.language.data.map((language: any, index: number) => (
            <span
              key={index}
              style={{
                fontSize: 12,
                marginTop: 5,
                paddingBottom: 5,
                // lineHeight: 1.5,
              }}
            >
              {`${language.language} (${language.level})`}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

const SELECTED_SECTIONS: any = {
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience: WorkExperienceSection,
  Education: EducationSection,
  Certification: CertificationSection,
  Accomplishment: AccomplishmentSection,
  Software: SoftwareSection,
};

const getComponentByName = (name: string) => {
  return SELECTED_SECTIONS[name] || null;
};

const Template1lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div
      style={{
        ...styles.page,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        // height: "100vh",
        // height: "100%",
        backgroundColor: "#E4E4E4",
        // padding: "10px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: `${bgColor}`,
          color: "white",
          paddingLeft: 15,
          paddingTop: 10,
          width: "40%",
          display: "flex",
          // height: "100%",
          flexDirection: "column",
          // paddingBottom: 120,
        }}
      >
        <PersonalInfoSection resumeData={resumeData} />
        <PortfolioSection resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
        <LanguageSection resumeData={resumeData} />
        <InterestSection resumeData={resumeData} />
      </div>

      <div
        style={{
          width: "60%",
          backgroundColor: "white",
          padding: 10,
          paddingTop: 10,
          textAlign: "justify",
          // height: "100%",
        }}
      >
        {cvInfo?.length &&
          cvInfo.map((sect: { name: string }) => {
            const Component = getComponentByName(sect.name);
            return (
              Component && (
                <div key={sect.name} style={{ marginTop: 5 }}>
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

export default Template1lg;
