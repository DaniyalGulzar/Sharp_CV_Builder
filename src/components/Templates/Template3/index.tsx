import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
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
  <View style={styles.heading}>
    <Text
      style={{
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 22,
      }}
    >
      {resumeData?.data?.heading?.firstName &&
      resumeData?.data?.heading?.lastName
        ? `${resumeData?.data?.heading?.firstName} ${resumeData?.data?.heading?.lastName}, `
        : null}
      {resumeData?.data?.heading?.profession &&
        resumeData?.data?.heading?.profession}
    </Text>
    <Text style={{ fontSize: 12, color: "gray", flexWrap: "wrap" }}>
      {resumeData.data.heading?.city && resumeData.data.heading?.country
        ? `${resumeData.data.heading.city}, ${resumeData.data.heading.country}, `
        : null}
      {resumeData?.data?.heading?.postalCode &&
        `${resumeData?.data?.heading?.postalCode}, `}
      {resumeData?.data?.heading?.email}, {resumeData?.data?.heading?.linkedin}
    </Text>
  </View>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.summary?.value && (
      <View
        style={{
          marginBottom: 10,
          display: "flex",
          borderBottom: "1px solid gray",
          borderTop: "1px solid gray",
          paddingTop: 15,
          paddingBottom: 15,
          flexDirection: "row",
          // alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 16,
            width: "30%",
          }}
        >
          PROFILE
        </Text>
        <Text
          style={{
            width: "70%",
            fontSize: 10,
            color: "gray",
            textAlign: "justify",
            overflow: "hidden", // To handle overflow
            textOverflow: "ellipsis", // Truncate if needed
          }}
        >
          {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
        </Text>
      </View>
    )}
  </>
);

const WorkExperienceSection = ({ resumeData }: any) =>
  resumeData?.data?.workHistory?.data?.length > 0 && (
    <View
      style={{
        marginBottom: 10,
        borderBottom: "1px solid gray",
        paddingBottom: 5,
      }}
    >
      <Text
        style={{
          color: "gray",
          marginBottom: 5,
          fontSize: 16,
        }}
      >
        WORK HISTORY
      </Text>
      {resumeData.data.workHistory.data.map((data: any, index: number) => (
        <View
          wrap={false}
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              width: "30%",
              fontSize: 10,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            {moment(`${data.startYear}-${data.startMonth}`, "YYYY-MM").format(
              "MMM"
            )}{" "}
            {data.startYear} -{" "}
            {data.isCurrent
              ? "Present"
              : `${moment(`${data.endYear}-${data.endMonth}`, "YYYY-MM").format(
                  "MMM"
                )} ${data.endYear}`}
          </Text>
          <View style={{ width: "50%", fontSize: 12 }}>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 10,
                color: "gray",
              }}
            >
              {data.jobTitle}, {data.employer}
            </Text>
            <Text style={{ color: "gray", fontSize: 10 }}>
              {data.description === "" ? (
                ""
              ) : (
                <Text
                  style={{
                    color: "gray",
                    textAlign: "justify",
                    fontSize: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {sanitizeText1(stripHtmlTags1(data?.description))}
                </Text>
              )}
            </Text>
          </View>
          <Text
            style={{
              width: "20%",
              fontSize: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            {data.location}
          </Text>
        </View>
      ))}
    </View>
  );

const SkillSection = ({ resumeData }: any) =>
  resumeData?.data?.skill?.data?.length > 0 && (
    // <View wrap={false}>
    <View
      style={{
        marginBottom: 10,
        borderBottom: "1px solid gray",
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <View
          style={{
            width: "30%",
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 16,
            }}
          >
            Skills
          </Text>
        </View>

        <View
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {resumeData.data.skill.data.map((skill: any, index: number) => (
            <Text
              wrap={false}
              key={index}
              style={{
                fontSize: 10,
                color: "gray",
                marginBottom: 2, // Adds some space between each item
              }}
            >
              {skill.title}&nbsp;
              {skill.rating !== 0 && <>({skill.rating})</>}
            </Text>
          ))}
        </View>
      </View>
    </View>
    // </View>
  );

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 && (
      <View
        style={{
          marginBottom: 10,
          borderBottom: "1px solid gray",
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            color: "gray",
            marginBottom: 5,
            fontSize: 16,
          }}
        >
          EDUCATION
        </Text>
        {resumeData.data.education.data.map((data: any, index: number) => (
          <View
            wrap={false}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              // marginBottom: 5,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                width: "30%",
                fontSize: 10,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                "en-US",
                {
                  month: "short",
                }
              )}
              -{data.endYear}
            </Text>
            <View style={{ width: "50%", fontSize: 12 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 5,
                  color: "gray",
                }}
              >
                {data.degree}, {data.schoolName}
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 10,
                  textAlign: "justify",
                  overflow: "hidden", // To handle overflow
                  textOverflow: "ellipsis", // Truncate if needed
                  marginBottom:
                    index === resumeData?.data.workHistory.data.length - 1
                      ? 10
                      : 15,
                }}
              >
                {/* {stripHtmlTags(resumeData?.data?.education?.data?.description)} */}
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
                    <Text style={{ fontSize: 10, color: "gray" }}>{desc}</Text>
                  </View>
                ))}
              </Text>
            </View>
            <Text
              style={{
                width: "20%",
                fontSize: 10,
                textAlign: "center",
                color: "gray",
              }}
            >
              {data.location}
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
      <View
        style={{
          marginBottom: 10,
          borderBottom: "1px solid gray",
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <View
            style={{
              width: "30%",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 16,
              }}
            >
              Certificates
            </Text>
          </View>

          {/* Certificates and Dates */}
          <View
            wrap={false}
            style={{
              width: "70%", // Occupies 70% of the row
              display: "flex",
              flexDirection: "row", // Arrange name and dates side by side
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%", // Occupies half the available width
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resumeData.data.certificate?.data.map(
                (certification: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2,
                    }}
                  >
                    {certification.name}
                  </Text>
                )
              )}
            </View>

            <View
              style={{
                width: "50%", // Occupies half the available width
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end", // Aligns the dates to the right
              }}
            >
              {resumeData.data.certificate?.data.map(
                (certification: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2,
                    }}
                  >
                    {moment(certification.startDate).format("MMM YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM YYYY")}
                  </Text>
                )
              )}
            </View>
          </View>
        </View>
      </View>
    )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <View
        style={{
          marginBottom: 10,
          borderBottom: "1px solid gray",
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <View
            style={{
              width: "30%",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 16,
              }}
            >
              Accomplishments
            </Text>
          </View>

          <View
            wrap={false}
            style={{
              width: "70%", // Occupies 70% of the row
              display: "flex",
              flexDirection: "column", // Stack the skill titles vertically
            }}
          >
            {resumeData.data.accomplishment.data.map(
              (accomplishment: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    color: "gray",
                    marginBottom: 2, // Adds some space between each item
                  }}
                >
                  {accomplishment}
                </Text>
              )
            )}
          </View>
        </View>
      </View>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <View
          style={{
            marginBottom: 10,
            borderBottom: "1px solid gray",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <View
              style={{
                width: "30%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Portfolios
              </Text>
            </View>

            <View
              wrap={false}
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the skill titles vertically
              }}
            >
              {resumeData.data.portfolio.data.map(
                (portfolio: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2, // Adds some space between each item
                    }}
                  >
                    {portfolio.portfolio}
                  </Text>
                )
              )}
            </View>
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
        <View
          style={{
            marginBottom: 10,
            borderBottom: "1px solid gray",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <View
              style={{
                width: "30%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Interests
              </Text>
            </View>

            <View
              wrap={false}
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the skill titles vertically
              }}
            >
              {resumeData.data.interest.data.map(
                (interest: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2, // Adds some space between each item
                    }}
                  >
                    {interest}
                  </Text>
                )
              )}
            </View>
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
        <View
          style={{
            marginBottom: 10,
            borderBottom: "1px solid gray",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <View
              style={{
                width: "30%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Softwares
              </Text>
            </View>

            <View
              wrap={false}
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the skill titles vertically
              }}
            >
              {resumeData?.data?.software?.data.map(
                (software: any, index: number) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2, // Adds some space between each item
                    }}
                  >
                    {software}
                  </Text>
                )
              )}
            </View>
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
        <View
          style={{
            marginBottom: 10,
            borderBottom: "1px solid gray",
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <View
              style={{
                width: "30%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Languages
              </Text>
            </View>

            <View
              wrap={false}
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resumeData?.data?.language?.data?.map(
                (language: any, index: any) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 10,
                      color: "gray",
                      marginBottom: 2,
                    }}
                  >
                    {language.language} ({language.level})
                  </Text>
                )
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const SECTIONS: any = {
  PersonalInfo: PersonalInfoSection,
  ProfessionalTitle: ProfessionalTitleSection,
  WorkExperience: WorkExperienceSection,
  Skill: SkillSection,
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

const Template3 = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={{ padding: 20, width: "100%" }}> */}
        {cvInfo?.length &&
          cvInfo.map((sect: { name: string }) => {
            const Component = getComponentByName(sect.name);
            return (
              <View key={sect.name} style={{ marginTop: 10 }}>
                <Component
                  name={sect.name || "Unnamed"}
                  resumeData={resumeData}
                  bgColor={bgColor}
                />
              </View>
            );
          })}
        {/* </View> */}
      </Page>
    </Document>
  );
};

export default Template3;
