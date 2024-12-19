import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import Link from "next/link";
import moment from "moment";

const stripHtmlTags = (html: any): string => {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]+>/g, "");
};

const PersonalInfoSection = ({ resumeData }: any) => (
  <View style={[styles.subSection]}>
    {(resumeData?.data?.heading?.firstName ||
      resumeData?.data?.heading?.lastName) && (
      <>
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          PERSONAL DETAILS
        </Text>

        <Text style={{ fontWeight: "bold", color: "white", fontSize: 12 }}>
          Name:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.firstName}{" "}
          {resumeData?.data?.heading?.lastName}
        </Text>
      </>
    )}

    {(resumeData?.data?.heading?.city ||
      resumeData?.data?.heading?.country ||
      resumeData?.data?.heading?.postalCode) && (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Address:{" "}
        </Text>
        <Text
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
        </Text>
      </>
    )}

    {resumeData?.data?.heading?.phone && (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Phone Number:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.phone}
        </Text>
      </>
    )}

    {resumeData?.data?.heading?.email && (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Email Address:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.email}
        </Text>
      </>
    )}

    {resumeData?.data?.heading?.linkedin && (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Linkedin:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.linkedin}
        </Text>
      </>
    )}
  </View>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <View style={{ width: "100%", marginBottom: 2 }}>
    {resumeData?.data?.summary?.value ? (
      <Text
        style={{
          color: "gray",
          fontSize: 10,
          textAlign: "justify",
        }}
      >
        {stripHtmlTags(resumeData?.data?.summary?.value)}
      </Text>
    ) : null}
  </View>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.workHistory?.data?.length > 0 && (
      <View style={styles.workExperience}>
        <Text
          style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          WORK EXPERIENCE
        </Text>

        {resumeData.data.workHistory.data.map((data: any, index: number) => (
          <View key={index} style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center", // Ensures proper alignment of job title and date
                marginBottom: 5, // Added margin for spacing between elements
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "bold",
                  width: "60%", // Limit width to avoid overflow
                  overflow: "hidden", // Hide overflow content
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                }}
              >
                {data.jobTitle}
              </Text>

              <Text
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
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: "black",
                marginBottom: 3,
                overflow: "hidden", // Hide any overflow content
                textOverflow: "ellipsis", // Add ellipsis for overflow text
              }}
            >
              {data.location}
            </Text>

            <Text
              style={{
                fontSize: 10,
                color: "gray",
                marginBottom: 2,
                overflow: "hidden", // Hide any overflow content
                textOverflow: "ellipsis", // Add ellipsis for overflow text
              }}
            >
              {data.description ? (
                <Text style={{ color: "black" }}>
                  {stripHtmlTags(data?.description)}
                </Text>
              ) : (
                ""
              )}
            </Text>
          </View>
        ))}
      </View>
    )}
  </>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <View>
        <Text
          style={{ borderBottom: "2px solid gray", paddingBottom: 5 }}
        ></Text>

        <View style={styles.skills}>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: 900,
              marginBottom: 5,
            }}
          >
            SKILLS
          </Text>
          {resumeData.data.skill.data.map((data: any, index: number) => (
            <>
              <View key={index} style={styles.section}>
                <Text style={{ fontSize: 12, color: "black" }}>
                  {data.title}&nbsp;
                  {data.rating !== 0 && <>({data.rating})</>}
                </Text>
              </View>
            </>
          ))}
        </View>
      </View>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 && (
      <View style={styles.education}>
        <Text
          style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          EDUCATION AND QUALIFICATION
        </Text>

        {resumeData.data.education.data.map((data: any, index: number) => (
          <View key={index} style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center", // Ensures proper alignment
                marginBottom: 5, // Added margin for spacing between elements
              }}
            >
              <Text
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
              </Text>

              <Text
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
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: "black",
                marginBottom: 3,
                overflow: "hidden", // Hide any overflow content
                textOverflow: "ellipsis", // Add ellipsis for overflow text
              }}
            >
              {data.schoolName}
            </Text>
          </View>
        ))}
      </View>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData.data.certificate?.data?.length > 0 &&
      resumeData.data.certificate.data[0].name !== "" && (
        <View>
          <Text
            style={{ borderBottom: "2px solid gray", paddingBottom: 5 }}
          ></Text>

          <View style={styles.skills}>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: 900,
                marginBottom: 5,
              }}
            >
              CERTIFICATE
            </Text>
            {resumeData.data.certificate?.data.map(
              (certification: any, index: number) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "black" }}>
                    {certification.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: "black" }}>
                    {moment(certification.startDate).format("MMM YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM YYYY")}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <View>
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          ACCOMPLISHMENT
        </Text>
        {resumeData.data.accomplishment.data.map(
          (accomplishment: any, index: number) => (
            <View key={index}>
              <Text
                key={index}
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
              </Text>
            </View>
          )
        )}
      </View>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            PORTFOLIO
          </Text>
          {resumeData.data.portfolio.data.map(
            (portfolio: any, index: number) => (
              <View key={index}>
                <Text
                  key={index}
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
                </Text>
              </View>
            )
          )}
        </View>
      )}
    </>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            INTEREST
          </Text>
          {resumeData.data.interest.data.map((interest: any, index: number) => (
            <View key={index}>
              <Text
                key={index}
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
              </Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.software?.data?.length > 0 && (
        <View>
          <Text
            style={{ borderBottom: "2px solid gray", paddingBottom: 5 }}
          ></Text>
          <View style={styles.skills}>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: 900,
                marginBottom: 5,
              }}
            >
              SOFTWARE
            </Text>
            {resumeData.data.software.data.map(
              (software: any, index: number) => (
                <View key={index} style={styles.section}>
                  <Text style={{ fontSize: 12, color: "black" }}>
                    {software}
                  </Text>
                  {/* <Text style={styles.rightAlign}>{data.level}</Text> */}
                </View>
              )
            )}
          </View>
        </View>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            LANGUAGE
          </Text>
          {resumeData.data.language.data.map((language: any, index: number) => (
            <View key={index}>
              <Text
                key={index}
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
              </Text>
            </View>
          ))}
        </View>
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

const Template4 = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          position: "relative",
          // padding: 20,
        }}
      >
        <View style={{ padding: 10 }}>
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
        {/* Left section with full-height background color */}
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

        {/* Right section */}
        <View
          style={{
            marginLeft: "40%",
            backgroundColor: "white",
            paddingLeft: 10,
            paddingRight: 10,
            width: "60%",
            textAlign: "justify",
            // marginTop: 10,
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

export default Template4;
