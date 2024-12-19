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

const stripHtmlTags = (html: any) => {
  if (typeof html !== "string") return [];

  // Create a temporary div element to parse the HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Extract all <li> elements from the parsed HTML
  const listItems = div.querySelectorAll("li");

  // Return an array of list item text content
  return Array.from(listItems).map((item) => item.textContent?.trim() || "");
};

// Sanitize text by removing empty list items
const sanitizeText = (text: any) => {
  return stripHtmlTags(text).filter((item) => item.length > 0);
};

const PersonalInfoSection = ({ resumeData }: any) => (
  <View>
    <Text style={{ fontSize: 22, fontWeight: 700 }}>
      {resumeData?.data?.heading?.firstName &&
        resumeData?.data?.heading?.firstName}{" "}
      {resumeData?.data?.heading?.lastName &&
        resumeData?.data?.heading?.lastName}
    </Text>

    <Text style={{ fontSize: 18, marginTop: 10 }}>
      {resumeData?.data?.heading?.profession &&
        resumeData?.data?.heading?.profession}
    </Text>

    <View style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
      {(resumeData?.data?.heading?.email ||
        resumeData?.data?.heading?.phone ||
        resumeData?.data?.heading?.postalCode ||
        resumeData?.data?.portfolio?.data?.name) && (
        <>
          <Text style={{ fontWeight: 700, fontSize: 16 }}>Personal Info</Text>

          {resumeData?.data?.heading?.postalCode && (
            <>
              <Text style={{ marginTop: 10, fontSize: 14 }}>Address:</Text>
              <Text style={{ marginTop: 5, fontSize: 10, paddingTop: 5 }}>
                {resumeData?.data?.heading?.postalCode},{" "}
                {resumeData?.data?.heading?.city},{" "}
                {resumeData?.data?.heading?.country}
              </Text>
            </>
          )}

          {resumeData?.data?.heading?.phone && (
            <>
              <Text style={{ marginTop: 10, fontSize: 14 }}>Phone:</Text>
              <Text style={{ marginTop: 5, fontSize: 10, paddingTop: 5 }}>
                {resumeData?.data?.heading?.phone}
              </Text>
            </>
          )}

          {resumeData?.data?.heading?.email && (
            <>
              <Text style={{ marginTop: 10, fontSize: 14 }}>Email:</Text>
              <Text
                style={{
                  fontSize: 10,
                  paddingTop: 5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                }}
                wrap={true}
              >
                {resumeData?.data?.heading?.email}
              </Text>
            </>
          )}
          {resumeData?.data?.heading?.linkedin && (
            <>
              <Text style={{ marginTop: 10, fontSize: 14 }}>LinkedIn:</Text>
              <Text
                style={{
                  fontSize: 10,
                  paddingTop: 5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                }}
                wrap={true}
              >
                {resumeData?.data?.heading?.linkedin}
              </Text>
            </>
          )}
          {resumeData?.data?.portfolio?.data?.name && (
            <Text style={{ marginTop: 10, fontSize: 14 }}>
              {resumeData?.data?.portfolio?.data?.name}
            </Text>
          )}
        </>
      )}
    </View>
  </View>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <View style={{}}>
    {resumeData?.data?.heading?.email ? (
      <>
        <Text
          style={{
            fontSize: 10,
            marginTop: 5,
            textAlign: "justify",
            flexWrap: "wrap",
          }}
        >
          {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
        </Text>
      </>
    ) : null}
  </View>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <View>
    {resumeData?.data?.workHistory?.data?.length > 0 && (
      <>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            display: "flex",
            borderBottom: "1px solid gray",
            borderTop: "1px solid gray",
            color: "#003d73",
            padding: "4px",
            fontWeight: 900,
          }}
        >
          Work History
        </Text>
        {resumeData.data.workHistory.data.map((data: any, index: any) => (
          <View wrap={false} key={index} style={styles.gridRow}>
            <View style={{ width: "33%" }}>
              <Text style={{ fontWeight: 900, fontSize: 12, color: "gray" }}>
                {moment(`${data.startYear}${data.startMonth}`, "YYYYMM").format(
                  "MMM"
                )}{" "}
                {data.startYear}- {""}
                {data.isCurrent
                  ? "Present"
                  : `${moment(
                      `${data.endYear}${data.endMonth}`,
                      "YYYYMM"
                    ).format("MMM")} ${data.endYear}`}
              </Text>
            </View>
            <View style={{ width: "67%" }}>
              <Text style={{ fontWeight: 900, fontSize: 14, paddingLeft: 5 }}>
                {data.jobTitle}
              </Text>
              <Text
                style={{
                  display: "flex",
                  fontWeight: 500,
                  fontSize: 10,
                  paddingLeft: 5,
                  marginTop: 3,
                  color: "gray",
                }}
              >
                {data.employer} ,{data.location}
              </Text>
              {data.description && (
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    paddingLeft: 5,
                    color: "gray",
                    textAlign: "justify",
                  }}
                >
                  {sanitizeText1(stripHtmlTags1(data?.description))}
                </Text>
              )}
            </View>
          </View>
        ))}
      </>
    )}
  </View>
);

const SkillSection = ({ resumeData }: any) => (
  <View style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
    {resumeData?.data?.skill?.data?.length > 0 && (
      <>
        <Text style={{ fontWeight: 700, fontSize: 16 }}>Skills</Text>
        {resumeData.data.skill.data.map((skill: any, index: any) => (
          // <View wrap={false}>
          <Text
            key={index}
            style={{ fontSize: 12, marginTop: 5, paddingBottom: 5 }}
          >
            {skill?.title}&nbsp;
            {skill.rating !== 0 && <>({skill.rating})</>}
          </Text>
          // </View>
        ))}
      </>
    )}
  </View>
);

const EducationSection = ({ resumeData }: any) => (
  <View>
    {resumeData?.data?.education?.data?.length > 0 && (
      <>
        <Text
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
        </Text>
        {resumeData.data.education.data.map((data: any, index: any) => (
          <View
            wrap={false}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              // flexWrap: "nowrap",
            }}
          >
            <View style={{ width: "33%" }}>
              <Text
                style={{
                  fontWeight: 900,
                  fontSize: 12,
                  color: "gray",
                }}
              >
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  { month: "short" }
                )}
                -{data.endYear}
              </Text>
            </View>
            <View style={{ width: "67%" }}>
              <Text style={{ fontWeight: 900, fontSize: 14, paddingLeft: 5 }}>
                {data.degree}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  display: "flex",
                  paddingLeft: 5,
                  fontSize: 10,
                  marginTop: 2,
                }}
              >
                {data.schoolName}
              </Text>
              {data.description && (
                <View
                  style={{
                    margin: 0,
                    textAlign: "justify",
                    fontSize: 10,
                    marginTop: 5,
                    paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {sanitizeText(data.description).map((desc, idx) => (
                    <View
                      key={idx}
                      style={{
                        display: "flex",
                        paddingRight: "10px",
                        flexDirection: "row", // Ensures items are displayed in a row
                        alignItems: "flex-start", // Aligns the bullet with the text
                        marginBottom: 5, // Adds some spacing between lines
                      }}
                    >
                      <Text
                        style={{
                          marginRight: 5, // Adds space between the bullet and text
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "gray",
                        }}
                      >
                        •
                      </Text>
                      <Text style={{ fontSize: 10, color: "gray" }}>
                        {desc}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </>
    )}
  </View>
);

const CertificationSection = ({ resumeData }: any) => (
  <View style={{ marginBottom: 25 }}>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <>
        <Text
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
        </Text>

        {resumeData.data.certificate.data.length > 0 &&
          resumeData.data.certificate.data.map(
            (certification: any, index: number) => (
              <View
                wrap={false}
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center", // Vertically align items
                  marginTop: 5,
                  paddingBottom: 5,
                }}
              >
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {"• "} {certification.name}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "gray", textAlign: "right" }}
                >
                  {moment(certification.startDate).format("MMM DD, YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM DD, YYYY")}
                </Text>
              </View>
            )
          )}
      </>
    )}
  </View>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <View>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <>
        <Text
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
        </Text>

        {resumeData.data.accomplishment.data.map(
          (accomplishment: any, index: number) => (
            <View wrap={false} key={index}>
              <Text
                key={index}
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  paddingBottom: 5,
                  display: "flex",
                  color: "gray",
                }}
              >
                {"• "}
                {accomplishment}
              </Text>
            </View>
          )
        )}
      </>
    )}
  </View>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <View style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <>
          <Text style={{ fontWeight: 700, fontSize: 16 }}>Portfolios</Text>

          {resumeData?.data?.portfolio?.data.map(
            (portfolio: any, index: number) => (
              // <View wrap={false}>
              <Text
                wrap={false}
                key={index}
                style={{ fontSize: 12, marginTop: 5, paddingBottom: 5 }}
              >
                {portfolio.portfolio}
              </Text>
              // </View>
            )
          )}
        </>
      )}
    </View>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <View style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <>
          <Text style={{ fontWeight: 700, fontSize: 16 }}>Interests</Text>

          {resumeData?.data?.interest?.data?.map(
            (interest: any, index: any) => (
              // <View wrap={false}>
              <Text
                wrap={false}
                key={index}
                style={{ fontSize: 12, marginTop: 5, paddingBottom: 5 }}
              >
                {interest}
              </Text>
              // </View>
            )
          )}
        </>
      )}
    </View>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <View style={{}}>
      {resumeData?.data?.software?.data?.length > 0 && (
        <>
          <Text
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
          </Text>

          {resumeData.data.software.data.map((software: any, index: number) => (
            <View wrap={false} key={index}>
              <Text
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
              </Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <View style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.language?.data?.length > 0 && (
        <>
          <Text style={{ fontWeight: 700, fontSize: 16 }}>Languages</Text>
          {/* <View wrap={false}> */}
          {resumeData.data.language.data.map((language: any, index: number) => (
            <Text
              wrap={false}
              key={index}
              style={{
                fontSize: 12,
                marginTop: 5,
                paddingBottom: 5,
                lineHeight: 1.5,
              }}
            >
              {`${language.language} (${language.level})`}
            </Text>
          ))}
          {/* </View> */}
        </>
      )}
    </View>
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
    <Document>
      <Page
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        {/* Left Column */}
        <View
          style={{
            backgroundColor: `${bgColor}`,
            color: "white",
            paddingLeft: 15,
            paddingTop: 10,
            width: "40%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PersonalInfoSection resumeData={resumeData} />
          <PortfolioSection resumeData={resumeData} />
          <SkillSection resumeData={resumeData} />
          <LanguageSection resumeData={resumeData} />
          <InterestSection resumeData={resumeData} />
        </View>

        {/* Right Column */}
        <View
          style={{
            width: "60%",
            backgroundColor: "white",
            padding: 10,
            paddingTop: 10,
            textAlign: "justify",
          }}
        >
          {cvInfo?.length &&
            cvInfo.map((sect: { name: string }) => {
              const Component = getComponentByName(sect.name);
              return (
                Component && (
                  <View key={sect.name} style={{ marginTop: 5 }}>
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
      </Page>
    </Document>
  );
};

export default Template1lg;
