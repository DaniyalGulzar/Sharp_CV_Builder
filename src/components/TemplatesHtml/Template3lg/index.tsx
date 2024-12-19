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
  <div style={{ textAlign: "center", marginBottom: "10px" }}>
    <span
      style={{
        marginBottom: "10px",
        fontWeight: "bold",
        fontSize: "22px",
      }}
    >
      {resumeData?.data?.heading?.firstName &&
      resumeData?.data?.heading?.lastName
        ? `${resumeData?.data?.heading?.firstName} ${resumeData?.data?.heading?.lastName}, `
        : null}
      {resumeData?.data?.heading?.profession &&
        resumeData?.data?.heading?.profession}
    </span>
    <p style={{ fontSize: "12px", color: "gray", wordWrap: "break-word" }}>
      {resumeData?.data?.heading?.city && resumeData?.data?.heading?.country
        ? `${resumeData?.data?.heading?.city}, ${resumeData?.data?.heading?.country}, `
        : null}
      {resumeData?.data?.heading?.postalCode &&
        `${resumeData?.data?.heading?.postalCode}, `}
      {resumeData?.data?.heading?.email}, {resumeData?.data?.heading?.linkedin}
    </p>
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.summary?.value && (
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          borderBottom: "1px solid gray",
          borderTop: "1px solid gray",
          paddingTop: "15px",
          paddingBottom: "15px",
          flexDirection: "row",
          // alignItems: "center",
        }}
      >
        <p
          style={{
            color: "gray",
            fontSize: "16px",
            width: "30%",
            margin: 0,
          }}
        >
          PROFILE
        </p>
        <p
          style={{
            width: "70%",
            fontSize: "10px",
            color: "gray",
            textAlign: "justify",
            flexWrap: "wrap",
            wordBreak: "break-word",

            margin: 0,
          }}
        >
          {sanitizeText1(stripHtmlTags1(resumeData?.data?.summary?.value))}
        </p>
      </div>
    )}
  </>
);

{
  /* <div
style={{
  display: "flex",
  borderBottom: "1px solid gray",
  borderTop: "1px solid gray",
  paddingTop: "5px",
  paddingBottom: "5px",
}}
>
<p
  style={{
    color: "gray",
    fontSize: "10px",
    width: "30%",
    margin: 0,
  }}
>
  PROFILE
</p>
<p
  style={{
    width: "70%",
    fontSize: "5px",
    color: "gray",
    textAlign: "justify",
    wordBreak: "break-word",
    margin: 0,
  }}
>
  {sanitizeText(stripHtmlTags(resumeData?.data?.summary?.value))}
</p>
</div> */
}

const WorkExperienceSection = ({ resumeData }: any) =>
  resumeData?.data?.workHistory?.data?.length > 0 && (
    <div
      style={{
        marginBottom: "10px",
        borderBottom: "1px solid gray",
        paddingBottom: "5px",
      }}
    >
      <p
        style={{
          color: "gray",
          marginBottom: "5px",
          fontSize: "16px",
          // fontWeight: "bold",
        }}
      >
        WORK HISTORY
      </p>
      {resumeData.data.workHistory.data.map((data: any, index: number) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "5px",
            marginTop: "5px",
            // alignItems: "flex-start",
          }}
        >
          <p
            style={{
              width: "30%",
              fontSize: "12px",
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
                )}  ${data.endYear}`}
          </p>
          <div style={{ width: "50%", fontSize: "12px" }}>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "gray",
              }}
            >
              {data.jobTitle}, {data.employer}
            </p>
            {data.description && (
              <p
                style={{
                  color: "gray",
                  textAlign: "justify",
                  fontSize: "10px",
                  wordBreak: "break-word",
                }}
              >
                {sanitizeText1(stripHtmlTags1(data.description))}
              </p>
            )}
          </div>
          <p
            style={{
              width: "20%",
              fontSize: "12px",
              textAlign: "center",
              color: "gray",
            }}
          >
            {data.location}
          </p>
        </div>
      ))}
    </div>
  );

const SkillSection = ({ resumeData }: any) =>
  resumeData?.data?.skill?.data?.length > 0 && (
    <div
      style={{
        marginBottom: "10px",
        borderBottom: "1px solid gray",
        paddingBottom: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "30%",
          }}
        >
          <p
            style={{
              color: "gray",
              fontSize: "16px",
              // fontWeight: "bold",
            }}
          >
            Skills
          </p>
        </div>

        {/* Skills List */}
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {resumeData.data.skill.data.map((skill: any, index: number) => (
            <p
              key={index}
              style={{
                fontSize: "10px",
                color: "gray",
                marginBottom: "2px", // Adds some space between each item
              }}
            >
              {skill.title}&nbsp;
              {skill.rating !== 0 && <span>({skill.rating})</span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

const EducationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.education?.data?.length > 0 && (
      <div
        style={{
          marginBottom: "10px",
          borderBottom: "1px solid gray",
          paddingBottom: "5px",
        }}
      >
        <p
          style={{
            color: "gray",
            marginBottom: "5px",
            fontSize: "16px",
          }}
        >
          EDUCATION
        </p>
        {resumeData.data.education.data.map((data: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5px",
            }}
          >
            <p
              style={{
                width: "30%",
                fontSize: "12px",
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
            </p>
            <div style={{ width: "50%", fontSize: "12px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "gray",
                }}
              >
                {data.degree}, {data.schoolName}
              </p>
              <p
                style={{
                  color: "gray",
                  fontSize: "10px",
                  textAlign: "justify",
                  wordBreak: "break-word",

                  marginBottom:
                    index === resumeData?.data.education.data.length - 1
                      ? "10px"
                      : "15px",
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
            <p
              style={{
                width: "20%",
                fontSize: "12px",
                textAlign: "center",
                color: "gray",
              }}
            >
              {data.location}
            </p>
          </div>
        ))}
      </div>
    )}
  </>
);

const CertificationSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.certificate?.data?.length > 0 && (
      <div
        style={{
          marginBottom: "10px",
          borderBottom: "1px solid gray",
          paddingBottom: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {/* Certificates Title */}
          <div
            style={{
              width: "30%",
            }}
          >
            <p
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            >
              Certificates
            </p>
          </div>

          {/* Certificates and Dates */}
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resumeData.data.certificate?.data.map(
                (certification: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px",
                    }}
                  >
                    {certification.name}
                  </p>
                )
              )}
            </div>

            <div
              style={{
                width: "50%", // Occupies half the available width
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end", // Aligns the dates to the right
              }}
            >
              {resumeData.data.certificate?.data.map(
                (certification: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px",
                    }}
                  >
                    {moment(certification.startDate).format("MMM YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM YYYY")}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

const AccomplishmentSection = ({ resumeData }: any) => (
  <>
    {resumeData?.data?.accomplishment?.data?.length > 0 && (
      <div
        style={{
          marginBottom: "10px",
          borderBottom: "1px solid gray",
          paddingBottom: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {/* Accomplishments Title */}
          <div
            style={{
              width: "30%",
            }}
          >
            <p
              style={{
                color: "gray",
                fontSize: "16px",
              }}
            >
              Accomplishments
            </p>
          </div>

          {/* Accomplishments List */}
          <div
            style={{
              width: "70%", // Occupies 70% of the row
              display: "flex",
              flexDirection: "column", // Stack the accomplishments vertically
            }}
          >
            {resumeData.data.accomplishment.data.map(
              (accomplishment: any, index: number) => (
                <p
                  key={index}
                  style={{
                    fontSize: "10px",
                    color: "gray",
                    marginBottom: "2px", // Adds some space between each item
                  }}
                >
                  {accomplishment}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

const PortfolioSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <div
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {/* Portfolios Title */}
            <div
              style={{
                width: "30%",
              }}
            >
              <p
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                Portfolios
              </p>
            </div>

            {/* Portfolio List */}
            <div
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the portfolio items vertically
              }}
            >
              {resumeData.data.portfolio.data.map(
                (portfolio: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px", // Adds some space between each item
                    }}
                  >
                    {portfolio.portfolio}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InterestSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <div
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "30%",
              }}
            >
              <p
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                Interests
              </p>
            </div>

            <div
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column",
              }}
            >
              {resumeData.data.interest.data.map(
                (interest: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px", // Adds some space between each item
                    }}
                  >
                    {interest}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SoftwareSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.software?.data?.length > 0 && (
        <div
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {/* Softwares Title */}
            <div
              style={{
                width: "30%",
              }}
            >
              <p
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                Softwares
              </p>
            </div>

            {/* Software List */}
            <div
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the software names vertically
              }}
            >
              {resumeData?.data?.software?.data.map(
                (software: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px", // Adds some space between each item
                    }}
                  >
                    {software}
                  </p>
                )
              )}
            </div>
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
        <div
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid gray",
            paddingBottom: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            {/* Languages Title */}
            <div
              style={{
                width: "30%",
              }}
            >
              <p
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                Languages
              </p>
            </div>

            {/* Language List */}
            <div
              style={{
                width: "70%", // Occupies 70% of the row
                display: "flex",
                flexDirection: "column", // Stack the languages vertically
              }}
            >
              {resumeData?.data?.language?.data?.map(
                (language: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "2px", // Adds some space between each item
                    }}
                  >
                    {language.language} ({language.level})
                  </p>
                )
              )}
            </div>
          </div>
        </div>
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

const Template3lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div>
      <div style={styles.page}>
        {/* <div style={styles.container}> */}
        {cvInfo?.length &&
          cvInfo.map((sect: { name: string }) => {
            const Component = getComponentByName(sect.name);
            return (
              <div key={sect.name} style={{ marginTop: 10 }}>
                <Component
                  name={sect.name || "Unnamed"}
                  resumeData={resumeData}
                  bgColor={bgColor}
                />
              </div>
            );
          })}
      </div>
    </div>
    // </div>
  );
};

export default Template3lg;
