import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import Link from "next/link";
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
  <div style={styles.section}>
    {resumeData && resumeData.length > 0 && (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        ></div>
        <div style={styles.hr} />
      </>
    )}
    {(resumeData?.data?.heading?.city ||
      resumeData?.data?.heading?.country ||
      resumeData?.data?.heading?.postalCode) && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "12px",
            marginTop: "15px",
          }}
        >
          Address:
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: "10px",
            marginTop: "2px",
          }}
        >
          {resumeData.data.heading?.city &&
          resumeData.data.heading?.country &&
          resumeData.data.heading?.postalCode
            ? `${resumeData.data.heading?.city}, ${resumeData.data.heading?.country}, ${resumeData.data.heading?.postalCode}`
            : resumeData.data.heading?.city && resumeData.data.heading?.country
            ? `${resumeData.data.heading?.city}, ${resumeData.data.heading?.country}`
            : resumeData.data.heading?.city
            ? resumeData.data.heading?.city
            : resumeData.data.heading?.country
            ? resumeData.data.heading?.country
            : resumeData.data.heading?.postalCode
            ? resumeData.data.heading?.postalCode
            : ""}
        </p>
      </>
    )}

    {resumeData?.data?.heading?.phone && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          Phone:
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: "10px",
            marginTop: "5px",
          }}
        >
          {resumeData?.data?.heading?.phone}
        </p>
      </>
    )}

    {resumeData?.data?.heading?.email && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          Email:
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: "10px",
            marginTop: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexWrap: "nowrap",
          }}
        >
          {resumeData?.data?.heading?.email}
        </p>
      </>
    )}

    {resumeData?.data?.heading?.linkedin && (
      <>
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          LinkedIn:
        </span>
        <p
          style={{
            fontWeight: "bold",
            color: "gray",
            fontSize: "10px",
            marginTop: "5px",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {resumeData.data.heading?.linkedin}
        </p>
      </>
    )}
  </div>
);

const ProfessionalTitleSection = ({ resumeData }: any) => (
  <div style={styles.text}>
    {resumeData?.data?.summary?.value ? (
      <p
        style={{
          color: "gray",
          textAlign: "justify",
          fontSize: "10px",
          padding: "5px",
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
  <>
    {resumeData?.data.workHistory.data?.length > 0 && (
      <div style={styles.section}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // marginTop: 10,
          }}
          className=""
        >
          <img
            src="/images/pngs/experienceicon.png"
            alt="Skills Icon"
            className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
          />
          <span style={{ fontSize: 16, fontWeight: 900 }}>Experience</span>
        </div>
        <div style={styles.hr} />
        {resumeData?.data.workHistory.data.map((data: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <div style={{ width: "30%" }}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: "12px",
                  color: "black",
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
              </p>
            </div>
            <div style={{ width: "70%" }}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: "12px",
                  paddingLeft: "5px",
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
                {data.employer} ,{data.location}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "5px",
                  paddingLeft: "5px",
                  color: "gray",
                  wordBreak: "break-word",
                  textAlign: "justify",
                }}
              >
                {data.description === "" ? (
                  ""
                ) : (
                  <span
                    style={{
                      color: "gray",
                      wordBreak: "break-word",
                      textAlign: "justify",
                    }}
                  >
                    {sanitizeText1(stripHtmlTags1(data.description))}
                  </span>
                )}
              </p>
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
      <div style={styles.section}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
          className=""
        >
          <img
            src="/images/pngs/competency.png"
            alt="Skills Icon"
            className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
          />
          <span className="text-[16px] font-bold">Skills</span>
        </div>

        <div style={styles.hr} />
        {resumeData.data.skill.data.map((skill: any, index: number) => (
          <p
            key={index}
            style={{
              marginBottom: "5px",
              color: "gray",
              marginTop: "3px",
              paddingTop: "3px",
              fontSize: "10px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
          className=""
        >
          <img
            src="/images/pngs/educationicon.png"
            alt="Skills Icon"
            className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
          />
          <span style={{ fontSize: 16, fontWeight: 900 }}>Education</span>
        </div>
        <div style={styles.hr} />
        {resumeData?.data.education.data.map((data: any, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <div style={{ width: "30%" }}>
              <p style={{ fontWeight: 900, fontSize: "12px", color: "black" }}>
                {new Date(`${data.endYear}-${data.endMonth}-01`).toLocaleString(
                  "en-US",
                  { month: "short" }
                )}
                -{data.endYear}
              </p>
            </div>
            <div style={{ width: "70%" }}>
              <p
                style={{
                  fontWeight: 900,
                  fontSize: "12px",
                  paddingLeft: "5px",
                }}
              >
                {data.degree}
              </p>
              <p
                style={{
                  fontWeight: 500,
                  display: "flex",
                  paddingLeft: "5px",
                  fontSize: "12px",
                  marginTop: "2px",
                }}
              >
                {data.schoolName}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "5px",
                  paddingLeft: "5px",
                  color: "gray",
                  wordBreak: "break-word",

                  marginBottom:
                    index === resumeData?.data.education.data.length - 1
                      ? "10px"
                      : "3px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
          className=""
        >
          <img
            src="/images/pngs/certificateicon.png"
            alt="Skills Icon"
            className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
          />
          <span className="text-[16px] font-bold">Certificate</span>
        </div>
        <div style={styles.hr} />
        {resumeData.data.certificate?.data.map(
          (certification: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <div style={{ width: "30%" }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 12,
                    color: "black",
                  }}
                >
                  {moment(certification.startDate).format("MMM YYYY")} -{" "}
                  {moment(certification.endDate).format("MMM YYYY")}
                </span>
              </div>
              <div style={{ width: "70%" }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {certification.name}
                </span>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
          className=""
        >
          <img
            src="/images/pngs/accompicon.png"
            alt="Skills Icon"
            className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
          />
          <span className="text-[16px] font-bold">Accomplishment</span>
        </div>
        <div style={styles.hr} />
        {resumeData.data.accomplishment.data.map(
          (accomplishment: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <div style={{ width: "30%" }}>
                {/* Placeholder for any future content */}
              </div>
              <div style={{ width: "70%" }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {accomplishment}
                </span>
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
        <div style={styles.section}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
            className=""
          >
            <img
              src="/images/pngs/portfolioicon.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
            />
            <span className="text-[16px] font-bold">Portfolio</span>
          </div>
          <div style={styles.hr} />

          <div className="flex flex-col">
            {resumeData.data.portfolio.data.map(
              (portfolio: any, index: number) => (
                <span
                  key={index}
                  className="mb-1 mt-1 pt-1 text-gray-500 text-[10px]"
                >
                  {portfolio.portfolio}
                </span>
              )
            )}
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
        <div style={styles.section}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // marginTop: 10,
            }}
            className=""
          >
            <img
              src="/images/pngs/interesticon.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
            />
            <span className="text-[16px] font-bold">Interest</span>
          </div>
          <div style={styles.hr} />
          {resumeData.data.interest.data.map((interest: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <div style={{ width: "30%" }}>
                {/* Placeholder for any future content */}
              </div>
              <div style={{ width: "70%" }}>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 10,
                    paddingLeft: 5,
                    color: "gray",
                  }}
                >
                  {interest}
                </span>
              </div>
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
        <div style={styles.section}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
            className=""
          >
            <img
              src="/images/pngs/softwareicon.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[10px]"
            />
            <span className="text-[16px] font-bold">Software</span>
          </div>
          <div style={styles.hr} />
          {resumeData.data.software.data.map((software: any, index: number) => (
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
          ))}
        </div>
      )}
    </>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <>
      {resumeData?.data?.language?.data?.length > 0 && (
        <div style={styles.section}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
            className=""
          >
            <img
              src="/images/pngs/languageicon.png"
              alt="Skills Icon"
              className="w-[20px] h-[20px] mr-[10px]" // Adjust width and height, and margin right
            />
            <span className="text-[16px] font-bold">Language</span>
          </div>
          <div style={styles.hr} />
          {resumeData.data.language.data.map((language: any, index: number) => (
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
              {language.language} ({language.level})
            </p>
          ))}
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
  return SELECTED_SECTIONS[name] || null; // Return the component or null if not found
};

const Template5lg = ({ resumeData, bgColor, cvInfo }: any) => {
  return (
    <div>
      <div style={styles.page}>
        <div style={styles.section}>
          <span style={{ fontSize: 22, fontWeight: 900 }}>
            {resumeData?.data?.heading?.firstName}{" "}
            {resumeData?.data?.heading?.lastName}
          </span>
          <p style={{ fontSize: 16, marginBottom: 10, marginTop: 3 }}>
            {resumeData?.data?.heading?.profession}
          </p>

          <ProfessionalTitleSection resumeData={resumeData} />
        </div>

        {/* Left Side - Personal Info & Skills */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* Personal Details Section */}
          <div
            style={{
              color: "black",
              width: "30%",
              flexDirection: "column",
              paddingTop: 10,

              height: "1290px",
            }}
          >
            <PersonalInfoSection resumeData={resumeData} />

            <SkillSection resumeData={resumeData} />

            <SoftwareSection resumeData={resumeData} />

            <PortfolioSection resumeData={resumeData} />

            <LanguageSection resumeData={resumeData} />
          </div>

          {/* Right Side - Experience and Education */}
          <div
            style={{
              backgroundColor: "white",
              paddingLeft: 15,
              width: "70%",
              textAlign: "justify",
              paddingTop: 10,

              height: "1290px",
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
    </div>
  );
};

export default Template5lg;
