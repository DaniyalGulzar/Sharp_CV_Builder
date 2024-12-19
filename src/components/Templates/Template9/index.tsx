import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import moment from "moment";

const stripHtmlTags = (html: any): string => {
  if (typeof html !== "string") return ""; // Return empty string if html is not a string
  return html.replace(/<[^>]+>/g, "");
};

const PersonalInfoSection = ({ resumeData }: any) => (
  <View style={styles.heading}>
    <Text
      style={{
        textAlign: "center",
        marginBottom: 10,
        fontWeight: 1000,
        fontSize: 28,
      }}
    >
      {resumeData?.data?.heading?.firstName &&
        resumeData?.data?.heading?.firstName}{" "}
      {resumeData?.data?.heading?.lastName &&
        resumeData?.data?.heading?.lastName}{" "}
    </Text>
    <Text style={{ fontSize: 12, flexWrap: "wrap", lineHeight: "1.5" }}>
      {resumeData?.data?.heading?.city && resumeData?.data?.heading?.city},
      {resumeData?.data?.heading?.country && resumeData?.data?.heading?.country}{" "}
      |{resumeData?.data?.heading?.phone && resumeData?.data?.heading?.phone} |{" "}
      {resumeData?.data?.heading?.email && resumeData?.data?.heading?.email} |{" "}
      {resumeData?.data?.heading?.linkedin &&
        resumeData?.data?.heading?.linkedin}
    </Text>
  </View>
);

const ProfessionalTitleSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.heading?.profession ||
    resumeData?.data?.summary?.value ? (
      <View
        style={{
          border: "2px double black",
        }}
      />
    ) : null}

    {resumeData?.data?.heading?.profession ||
    resumeData?.data?.summary?.value ? (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {resumeData?.data?.heading?.profession && (
          <Text
            style={{
              color: "black",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "normal",
              marginTop: "5px",
            }}
          >
            {resumeData.data.heading.profession}
          </Text>
        )}

        {resumeData?.data?.summary?.value && (
          <Text
            style={{
              width: "100%",
              fontSize: 12,
              color: "black",
              textAlign: "justify",
              paddingBottom: 5,
            }}
          >
            {stripHtmlTags(resumeData?.data?.summary?.value)}
          </Text>
        )}
      </View>
    ) : null}
  </>
);

const SkillSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 ? (
      <>
        <View
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "5px",
            marginBottom: "10px",
            paddingVertical: "5px",
            backgroundColor: `${bgColor}`,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textAlign: "center",
            }}
          >
            SKILL
          </Text>
        </View>

        <View
          wrap={false}
          style={{
            padding: "5px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {resumeData?.data?.skill?.data.map(
                (skill: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      ...styles.item,
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                    }}
                  >
                    {"\u2022"} {skill.title}&nbsp;
                    {skill.rating !== 0 && <>({skill.rating})</>}
                  </Text>
                )
              )}
            </View>
          </View>
        </View>
      </>
    ) : null}
  </>
  ////
);

const WorkExperienceSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.workHistory?.data?.length > 0 ? (
      <>
        <View
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "5px",
            marginBottom: "10px",
            paddingVertical: "5px",
            backgroundColor: `${bgColor}`,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textAlign: "center",
            }}
          >
            WORK EXPERIENCE
          </Text>
        </View>

        {resumeData.data.workHistory.data.map((data: any, index: number) => (
          <View
            wrap={false}
            key={index}
            style={{
              marginBottom: 10,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: "bold", color: "black" }}
              >
                {data.employer}
              </Text>
              <Text style={{ fontSize: 10, color: "gray", textAlign: "right" }}>
                {data.location}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "black" }}
              >
                {data.jobTitle}
              </Text>

              <Text
                style={{ fontSize: 10, color: "black", textAlign: "right" }}
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
              </Text>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "gray",
                textAlign: "left",
                marginBottom: 5,
              }}
            >
              {data.location}
            </Text>

            <View>
              <Text style={{ color: "black", fontSize: 12 }}>
                {data.description === "" ? (
                  ""
                ) : (
                  <>
                    <Text style={{ color: "black", textAlign: "justify" }}>
                      {"\u2022"} {stripHtmlTags(data?.description)}
                    </Text>
                  </>
                )}
              </Text>
            </View>
          </View>
        ))}
      </>
    ) : null}
  </>
);

const EducationSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 ? (
      <>
        <View
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "5px",
            marginBottom: "10px",
            paddingVertical: "5px",
            backgroundColor: `${bgColor}`,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textAlign: "center",
            }}
          >
            EDUCATION
          </Text>
        </View>

        {resumeData.data.education.data.map((data: any, index: number) => (
          <View
            wrap={false}
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>
              {data.schoolName}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 2,
              }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}>{data.degree}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                  }
                )}
                -{data.endYear}
              </Text>
            </View>
            <Text
              style={{ color: "black", fontSize: "10px", margin: "5px 0 0" }}
            >
              {stripHtmlTags(data?.description)}
            </Text>
          </View>
        ))}
      </>
    ) : null}
  </>
);

const CertificationSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 ? (
      <>
        <View
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "5px",
            marginBottom: "10px",
            paddingVertical: "5px",
            backgroundColor: `${bgColor}`,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textAlign: "center",
            }}
          >
            CERTIFICATION
          </Text>
        </View>

        <View
          wrap={false}
          style={{
            // width: "60%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {resumeData.data.certificate.data.map(
            (certification: any, index: number) => (
              // <View
              //   key={index}
              //   style={{
              //     display: "flex",
              //     flexDirection: "row",
              //     marginBottom: 5,
              //   }}
              // >
              //   <Text
              //     style={{
              //       fontSize: 10,
              //       color: "black",
              //     }}
              //   >
              //     {certification.name}
              //   </Text>
              //   <Text
              //     style={{
              //       width: "40%",
              //       textAlign: "right",
              //       fontSize: 10,
              //     }}
              //   >
              //     ({moment(certification.startDate).format("MMM YYYY")} -{" "}
              //     {moment(certification.endDate).format("MMM YYYY")})
              //   </Text>
              // </View>
              <View
                key={index}
                style={{
                  color: "#000",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.31",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "10px", // Optional: Add margin to separate items
                }}
              >
                <Text
                  style={{
                    width: "60%", // Takes up 60% of the row width for the name
                  }}
                >
                  {certification.name}
                </Text>
                <Text
                  style={{
                    width: "40%", // Takes up 40% of the row width for the dates
                    textAlign: "right", // Align dates to the right
                    fontSize: 10, // Optional: Adjust font size for dates
                  }}
                >
                  ({moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")})
                </Text>
              </View>
            )
          )}
        </View>
      </>
    ) : null}
  </>
);

const AccomplishmentSection = ({ resumeData, bgColor }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <>
        <View
          wrap={false}
          style={{
            borderTop: "2px double black",
            borderBottom: "2px double black",
            marginTop: "5px",
            marginBottom: "10px",
            paddingVertical: "5px",
            backgroundColor: `${bgColor}`,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textAlign: "center",
            }}
          >
            ACCOMPLISHMENT
          </Text>
        </View>
        <View
          wrap={false}
          style={{
            padding: "5px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              {resumeData?.data?.accomplishment?.data.map(
                (accomplishment: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      ...styles.item,
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                    }}
                  >
                    {"\u2022"} {accomplishment}
                  </Text>
                )
              )}
            </View>
          </View>
        </View>
      </>
    )}
  </>
);

const PortfolioSection = ({ resumeData, bgColor }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 ? (
        <>
          <View
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "5px",
              marginBottom: "10px",
              paddingVertical: "5px",
              backgroundColor: `${bgColor}`,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              PORTFOLIO
            </Text>
          </View>

          <View
            wrap={false}
            style={{
              padding: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                {resumeData?.data?.portfolio?.data.map(
                  (portfolio: any, index: number) => (
                    <Text
                      key={index}
                      style={{
                        ...styles.item,
                        flexBasis:
                          (index + 1) % 3 === 1
                            ? "33.33%"
                            : (index + 1) % 3 === 2
                            ? "40%"
                            : "26.67%",
                      }}
                    >
                      {"\u2022"} {portfolio?.portfolio}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>

          {/* <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            {resumeData?.data?.portfolio?.data.map(
              (portfolio: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    color: "black",
                    marginBottom: 2,
                    marginTop: 3,
                    textAlign: "left",
                  }}
                >
                  {"• "} {portfolio?.portfolio}
                </Text>
              )
            )}
          </View> */}
        </>
      ) : null}
    </>
  );
};

const InterestSection = ({ resumeData, bgColor }: any) => {
  const interests = resumeData?.data?.interest?.data || [];
  return (
    <>
      {interests.length > 0 && (
        <>
          <View
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "5px",
              marginBottom: "10px",
              paddingVertical: "5px",
              backgroundColor: `${bgColor}`,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              INTEREST
            </Text>
          </View>

          <View
            wrap={false}
            style={{
              padding: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                {interests.map((interest: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      ...styles.item,
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                    }}
                  >
                    {"\u2022"} {interest}
                  </Text>
                ))}
              </View>
            </View>
          </View>
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
          <View
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "5px",
              marginBottom: "10px",
              paddingVertical: "5px",
              backgroundColor: `${bgColor}`,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              SOFTWARE
            </Text>
          </View>

          <View
            wrap={false}
            style={{
              padding: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                {softwareList.map((software: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      ...styles.item,
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                    }}
                  >
                    {"\u2022"} {software}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData, bgColor }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length && (
        <>
          <View
            style={{
              borderTop: "2px double black",
              borderBottom: "2px double black",
              marginTop: "5px",
              marginBottom: "10px",
              paddingVertical: "5px",
              backgroundColor: `${bgColor}`,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              LANGUAGE
            </Text>
          </View>

          <View
            wrap={false}
            style={{
              padding: "5px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                {resumeData.data.language.data.map(
                  (language: any, index: number) => (
                    <Text
                      key={index}
                      style={{
                        ...styles.item,
                        flexBasis:
                          (index + 1) % 3 === 1
                            ? "33.33%"
                            : (index + 1) % 3 === 2
                            ? "40%"
                            : "26.67%",
                      }}
                    >
                      {"\u2022"} {language.language}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
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
const Template9 = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {cvInfo?.length &&
            cvInfo.map((sect: { name: string }) => {
              const Component = getComponentByName(sect.name);
              return (
                Component && (
                  <View key={sect.name} style={{ marginTop: 10 }}>
                    <Component
                      name={sect.name || "Unnamed"}
                      resumeData={resumeData}
                      bgColor={bgColor}
                      // style={{ wordWrap: "break-word" }} // Applying it to the text inside the component
                    />
                  </View>
                )
              );
            })}
        </View>
      </Page>
    </Document>
  );
};

export default Template9;
