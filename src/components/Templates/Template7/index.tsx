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
  <View style={styles.marginTop}>
    {resumeData?.data?.heading?.phone ||
    resumeData?.data?.heading?.email ||
    resumeData?.data?.heading?.linkedin ? (
      <>
        <Text
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          Contact
        </Text>
        <View style={{ marginBottom: 10, color: "white" }}>
          {resumeData?.data?.heading?.phone && (
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              {resumeData?.data?.heading?.phone}{" "}
              <Text style={{ color: "white" }}>(Home)</Text>
            </Text>
          )}

          {resumeData?.data?.heading?.email && (
            <Text style={{ marginBottom: 5, fontSize: 12 }}>
              {resumeData?.data?.heading?.email}
            </Text>
          )}

          {resumeData?.data?.heading?.linkedin && (
            <Text style={{ marginTop: 5 }}>
              <Link
                href={resumeData?.data?.heading?.linkedin}
                style={{ color: "white" }}
              >
                {resumeData?.data?.heading?.linkedin}
              </Link>
            </Text>
          )}

          {resumeData?.data?.heading?.linkedin && (
            <Text
              style={{
                marginBottom: 10,
                color: "white",
                fontSize: 12,
                marginTop: 5,
              }}
            >
              {/* (LinkedIn) */}
              {resumeData?.data?.heading?.linkedin} (Linkedin)
            </Text>
          )}
        </View>
      </>
    ) : null}
  </View>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.summary?.value ? (
      <View style={styles.marginTop}>
        <>
          <Text style={{ fontSize: 16, fontWeight: 900, marginBottom: 3 }}>
            Summary
          </Text>
          <Text
            style={{ marginBottom: 10, textAlign: "justify", fontSize: 10 }}
          >
            {stripHtmlTags(resumeData?.data?.summary?.value)}
          </Text>
        </>
      </View>
    ) : null}
  </>
);

const WorkExperienceSection = ({ resumeData }: any) => (
  <View>
    {resumeData?.data?.workHistory?.data?.length > 0 ? (
      <>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 900,
            // marginBottom: 5,
            marginTop: 5,
          }}
        >
          Experience
        </Text>
        {resumeData?.data.workHistory.data.map((data: any, index: number) => (
          <View wrap={false} key={index} style={styles.marginTop}>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>
              {data.employer}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 3 }}>
              {data.jobTitle}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 3 }}>
              {moment(`${data.startYear}-${data.startMonth}`, "YYYY-MM").format(
                "MMM"
              )}{" "}
              {data.startYear} -{" "}
              {data.isCurrent
                ? "Present"
                : `${moment(
                    `${data.endYear}-${data.endMonth}`,
                    "YYYY-MM"
                  ).format("MMM")}  ${data.endYear}`}
            </Text>
            <Text style={{ color: "gray", marginTop: 3, fontSize: 12 }}>
              {data.location}
            </Text>
            <Text style={{ marginTop: 5, marginBottom: 10, fontSize: 12 }}>
              {data.description === "" ? (
                ""
              ) : (
                <Text style={{ color: "black", fontSize: 12 }}>
                  {stripHtmlTags(data?.description)}
                </Text>
              )}
            </Text>
          </View>
        ))}
      </>
    ) : null}
  </View>
);

const SkillSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.skill.data?.length > 0 && (
      <View style={styles.marginTop}>
        <Text
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          Top Skills
        </Text>
        <View wrap={false} style={styles.skillList}>
          {resumeData?.data.skill.data.map((skill: any, index: number) => (
            <Text
              key={index}
              style={{
                marginBottom: 5,
                color: "white",
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
      </View>
    )}
  </>
);

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data.education.data?.length > 0 && (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 900, marginTop: 5 }}>
          Education
        </Text>
        {resumeData?.data.education.data.map((data: any, index: number) => (
          <View wrap={false} key={index} style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 900,
                // marginBottom: 5,
                marginTop: 5,
              }}
            >
              {data.schoolName}, {data.location1}
            </Text>
            {/* <Text>
          ({data.endMonth.slice(0, 3)}-{data.endYear})
        </Text> */}

            <Text style={{ fontSize: 12 }}>
              {}
              {data.degree}, {data.fieldOfStudy}{" "}
              {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                "en-US",
                {
                  month: "short",
                }
              )}
              -{data.endYear}
            </Text>
            <Text
              style={{
                fontSize: 10,
                marginTop: 5,
                paddingLeft: 5,
                color: "gray",
                marginBottom:
                  index === resumeData?.data.workHistory.data.length - 1
                    ? 5
                    : 5,
              }}
            >
              {/* {stripHtmlTags(resumeData?.data?.education?.data?.description)} */}
              {stripHtmlTags(data?.description)}
            </Text>
          </View>
        ))}
      </View>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 900, marginTop: 5 }}>
          Certificate
        </Text>
        {resumeData?.data?.certificate?.data.map(
          (certification: any, index: number) => (
            <View wrap={false} key={index} style={styles.marginTop}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  // marginBottom: 5,
                  // marginTop: 3,
                }}
              >
                {certification.name}
              </Text>
              <Text style={{ fontSize: 10 }}>
                ({moment(certification.startDate).format("MMM YYYY")} -{" "}
                {moment(certification.endDate).format("MMM YYYY")})
              </Text>
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
      <View style={styles.marginTop}>
        <Text
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          Accomplishment
        </Text>
        <View wrap={false} style={styles.skillList}>
          {resumeData.data.accomplishment.data.map(
            (accomplishment: any, index: number) => (
              <Text
                key={index}
                style={{
                  marginBottom: 5,
                  color: "white",
                  marginTop: 3,
                  paddingTop: 3,
                  fontSize: 10,
                }}
              >
                {accomplishment}
              </Text>
            )
          )}
        </View>
      </View>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <View style={{ marginTop: 5 }}>
          <Text
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Portfolio
          </Text>
          <View wrap={false} style={styles.skillList}>
            {resumeData.data.portfolio.data.map(
              (portfolio: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    marginBottom: 5,
                    color: "white",
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
        </View>
      )}
    </>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <View style={styles.marginTop}>
          <Text
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Interest
          </Text>
          <View wrap={false} style={styles.skillList}>
            {resumeData.data.interest.data.map(
              (interest: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    marginBottom: 5,
                    color: "white",
                    marginTop: 3,
                    paddingTop: 3,
                    fontSize: 10,
                  }}
                >
                  {interest}
                </Text>
              )
            )}
          </View>
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
          <Text style={{ fontSize: 16, fontWeight: 900, marginTop: 10 }}>
            Software
          </Text>
          {resumeData?.data?.software?.data.map(
            (software: any, index: number) => (
              <View wrap={false} key={index} style={styles.marginTop}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 900,

                    // marginBottom: 5,
                    // marginTop: 2,
                  }}
                >
                  {software}
                </Text>
              </View>
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
        <View style={styles.marginTop}>
          <Text
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Language
          </Text>
          <View wrap={false} style={styles.skillList}>
            {resumeData.data.language.data.map(
              (language: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    marginBottom: 5,
                    color: "white",
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
  Software: SoftwareSection,
};

const getComponentByName = (name: string) => {
  return SELECTED_SECTIONS[name] || null;
};

const Template7 = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          ...styles.page,
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        {/* Left Section */}
        <View
          style={{
            width: "40%",
            backgroundColor: `${bgColor}`,
            color: "black",
            paddingLeft: 15,
            paddingTop: 20,
            flexDirection: "column",
            display: "flex",
            // border: "1px solid red",
          }}
        >
          <PersonalInfoSection resumeData={resumeData} />

          <PortfolioSection resumeData={resumeData} />

          <SkillSection resumeData={resumeData} />

          <LanguageSection resumeData={resumeData} />

          <InterestSection resumeData={resumeData} />

          <AccomplishmentSection resumeData={resumeData} />
        </View>

        <View
          style={{
            width: "60%",
            backgroundColor: "white",
            padding: 10,
            paddingTop: 20,
            textAlign: "justify",
          }}
        >
          <Text style={{ marginBottom: 5, fontWeight: 900, fontSize: 22 }}>
            {resumeData?.data.heading?.firstName}{" "}
            {resumeData?.data.heading?.lastName}
          </Text>
          <Text style={{ fontWeight: 900, fontSize: 16 }}>
            {resumeData?.data.heading?.profession}
          </Text>
          <Text style={{ color: "gray", fontSize: 12 }}>
            {resumeData?.data.heading?.city} {resumeData?.data.heading?.country}
            , {resumeData?.data.heading?.postalCode}
          </Text>

          {cvInfo?.length &&
            cvInfo.map((sect: any) => {
              const Component = getComponentByName(sect.name);
              return (
                Component && (
                  <View key={sect.name} style={{ marginTop: 10 }}>
                    <Component
                      name={sect.name || "Unnamed"}
                      resumeData={resumeData}
                      bgColor={bgColor}
                      // style={{ wordWrap: "break-word" }}
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

export default Template7;
