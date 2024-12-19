import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import Link from "next/link";
import moment from "moment";
// import { ProfessionalTitleSection } from "../Template8/ProfessionalTitleSection";

const stripHtmlTags = (html: any): string => {
  if (typeof html !== "string") return ""; // Return empty string if html is not a string
  return html.replace(/<[^>]+>/g, "");
};

const PersonalInfoSection = ({ resumeData }: any) => (
  <View style={styles.section}>
    {(resumeData?.data?.heading?.city ||
      resumeData?.data?.heading?.country ||
      resumeData?.data?.heading?.postalCode ||
      resumeData?.data?.heading?.phone ||
      resumeData?.data?.heading?.email ||
      resumeData?.data?.heading?.linkedin) && (
      <>
        <Text style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Personal Info
        </Text>
        <View style={styles.divider} />
      </>
    )}

    {resumeData?.data?.heading?.city ||
    resumeData?.data?.heading?.country ||
    resumeData?.data?.heading?.postalCode ? (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Address:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.city}, {resumeData.data.heading?.country},{" "}
          {resumeData.data.heading?.postalCode}
        </Text>
      </>
    ) : null}

    {resumeData?.data?.heading?.phone ? (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Phone:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData?.data?.heading?.phone}
        </Text>
      </>
    ) : null}

    {resumeData?.data?.heading?.email ? (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Email:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.email}
        </Text>
      </>
    ) : null}

    {resumeData?.data?.heading?.linkedin ? (
      <>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          LinkedIn:{" "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: 10,
            marginTop: 5,
          }}
        >
          {resumeData.data.heading?.linkedin}
        </Text>
      </>
    ) : null}
  </View>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <View>
    <Text
      style={{
        fontSize: 10,
        textAlign: "justify",
        color: "gray",
      }}
    >
      {stripHtmlTags(resumeData?.data?.summary?.value)}
    </Text>
  </View>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.workHistory.data?.length > 0 && (
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Experience
        </Text>
        <View style={styles.divider} />
        {resumeData?.data.workHistory.data.map((data: any, index: any) => (
          <View
            wrap={false}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              // Add this line
            }}
          >
            <View style={{ width: "17%" }}>
              <Text
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  color: "black",
                  textOverflow: "ellipsis",
                  // lineHeight: 14, // Reduce line height for better compactness
                }}
              >
                {moment(
                  `${data.startYear}-${data.startMonth}`,
                  "YYYY-MM"
                ).format("MMM YYYY")}{" "}
                -{" "}
                {data.isCurrent
                  ? "Present"
                  : moment(
                      `${data.endYear}-${data.endMonth}`,
                      "YYYY-MM"
                    ).format("MMM YYYY")}
              </Text>
            </View>

            <View style={{ width: "10%" }}></View>
            <View style={{ width: "73%", marginLeft: 0 }}>
              <Text
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  // paddingLeft: 5,
                }}
              >
                {data.jobTitle}
              </Text>
              <Text
                style={{
                  display: "flex",
                  fontWeight: 500,
                  fontSize: 12,
                  // paddingLeft: 5,
                  marginTop: 3,
                  color: "gray",
                }}
              >
                {data.employer}, {data.location}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  // paddingLeft: 5,
                  color: "gray",
                }}
              >
                {/* {stripHtmlTags(resumeData?.data?.workHistory?.data[0]?.description)} */}
                {data.description === "" ? (
                  ""
                ) : (
                  <Text style={{ color: "gray", fontSize: 10 }}>
                    {stripHtmlTags(data?.description)}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        ))}
      </View>
    )}
  </>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <View style={{ marginBottom: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 16, color: "#1E40AF", fontWeight: "bold" }}>
          Skills
        </Text>
        <View style={styles.divider} />
        {resumeData?.data?.skill?.data.map((skill: any, index: number) => (
          <Text
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
          </Text>
        ))}
      </View>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.education.data?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.subheading}>Education</Text>
        <View style={styles.divider} />
        {resumeData?.data.education.data.map((data: any, index: any) => (
          <View
            wrap={false}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View style={{ width: "17%" }}>
              <Text style={{ fontWeight: 900, fontSize: 12, color: "black" }}>
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                  }
                )}
                -{data.endYear}
              </Text>
            </View>
            <View style={{ width: "10%" }}></View>
            <View style={{ width: "73%" }}>
              <Text
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  // paddingLeft: 5,
                }}
              >
                {data.degree},{data.fieldOfStudy}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  display: "flex",
                  // paddingLeft: 5,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {data.schoolName}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  // paddingLeft: 5,
                  color: "gray",
                  marginBottom:
                    index === resumeData?.data.workHistory.data.length - 1
                      ? 10
                      : 3,
                }}
              >
                {/* {stripHtmlTags(resumeData?.data?.education?.data?.description)} */}
                {stripHtmlTags(data?.description)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.subheading}>Certificate</Text>
        <View style={styles.divider} />
        {resumeData?.data?.certificate?.data.map(
          (certification: any, index: number) => (
            <View
              wrap={false}
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontWeight: 900,
                    fontSize: 12,
                    color: "black",
                  }}
                >
                  {moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")}{" "}
                </Text>
              </View>

              <View
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end", // Align items to the end horizontally
                }}
              >
                <Text
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    color: "gray",
                  }}
                >
                  {certification.name}
                </Text>
              </View>
            </View>
          )
        )}
      </View>
    )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.subheading}>Accomplishment</Text>
        <View style={styles.divider} />
        {resumeData?.data?.accomplishment?.data.map(
          (accomplishment: any, index: number) => (
            <View
              wrap={false}
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View style={{ width: "27%" }}></View>
              <View style={{ width: "73%" }}>
                <Text
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    // paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {accomplishment}
                </Text>
              </View>
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
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.subheading}>Portfolio</Text>
          <View style={styles.divider} />
          {resumeData?.data?.portfolio?.data.map(
            (portfolio: any, index: number) => (
              <Text
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
              </Text>
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
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.subheading}>Interest</Text>
          {/* Divider with explicit width */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#D1D5DB",
              marginVertical: 5,
            }}
          />
          {resumeData?.data?.interest?.data.map(
            (interest: any, index: number) => (
              <View
                wrap={false}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "27%" }}></View>
                <View style={{ width: "73%" }}>
                  <Text
                    style={{
                      fontWeight: 900,
                      fontSize: 10,
                      color: "gray",
                    }}
                  >
                    {interest}
                  </Text>
                </View>
              </View>
            )
          )}
        </View>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.software?.data?.length > 0 && (
        <View style={{ marginBottom: 10, marginTop: 5 }}>
          <Text style={styles.subheading}>Software</Text>
          <View style={styles.divider} />
          {resumeData?.data?.software?.data.map(
            (software: any, index: number) => (
              <Text
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
              </Text>
            )
          )}
        </View>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length > 0 && (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.subheading}>Language</Text>
          <View style={styles.divider} />
          {resumeData?.data?.language?.data.map(
            (language: any, index: number) => (
              <Text
                key={index}
                style={{
                  // marginBottom: 5,
                  color: "gray",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 10,
                }}
              >
                {language.language} ({language.level})
              </Text>
            )
          )}
        </View>
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

const Template6 = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.section}>
          <Text style={{ fontSize: 22, fontWeight: 900 }}>
            {resumeData?.data?.heading?.firstName}{" "}
            {resumeData?.data?.heading?.lastName}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 3 }}>
            {resumeData?.data?.heading?.profession}
          </Text>

          <ProfessionalTitleSection resumeData={resumeData} />
        </View> */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            padding: 10,
            width: "100%",
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
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
            </Text>
            <Text
              style={{
                fontSize: "16px",
                marginBottom: "5px",
                marginTop: "5px",
                color: "#1E3A8A",
              }}
            >
              {resumeData?.data?.heading?.profession &&
                resumeData?.data?.heading?.profession}
            </Text>
          </View>

          <View style={{ width: "60%" }}>
            <ProfessionalTitleSection resumeData={resumeData} wrap={false} />
          </View>
        </View>

        <View style={{ flexDirection: "row", display: "flex" }}>
          {/* Personal Details Section */}
          <View
            style={{
              color: "black",
              paddingTop: 10,
              width: "30%",
              flexDirection: "column",
            }}
          >
            <PersonalInfoSection resumeData={resumeData} />

            <SkillSection resumeData={resumeData} />

            <SoftwareSection resumeData={resumeData} />

            <PortfolioSection resumeData={resumeData} />

            <LanguageSection resumeData={resumeData} />
          </View>

          <View
            style={{
              borderLeft: "1px solid gray",
              marginLeft: 10,
            }}
          />

          {/* Right Side - Experience and Education */}
          <View
            style={{
              backgroundColor: "white",

              paddingLeft: 15,
              paddingTop: 10,
              width: "70%",
              textAlign: "justify",
            }}
          >
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

export default Template6;
