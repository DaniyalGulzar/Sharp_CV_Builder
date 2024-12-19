import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import React from "react";
import { pdfStyles as styles } from "./style";
import moment from "moment";
import { Span } from "next/dist/trace";
import { SiPanasonic } from "react-icons/si";

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

const PersonalInfoSection = ({ resumeData, customStyle }: any) => (
  <div>
    <div className="flex flex-col">
      {/* Name */}
      <span className="text-[10px]   font-semibold">
        {resumeData?.data?.heading?.firstName &&
          resumeData?.data?.heading?.firstName}{" "}
        {resumeData?.data?.heading?.lastName &&
          resumeData?.data?.heading?.lastName}
      </span>

      {/* Profession */}
      <span className="text-[7px] ">
        {resumeData?.data?.heading?.profession}
      </span>
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.heading?.email ||
      resumeData?.data?.heading?.phone ||
      resumeData?.data?.heading?.postalCode ||
      resumeData?.data?.portfolio?.data?.name ? (
        <>
          {/* Personal Info */}
          <span className="text-[7px]  pt-[1px] font-semibold">
            Personal Info
          </span>

          {/* Address */}
          {resumeData?.data?.heading?.postalCode && (
            <>
              <span className="text-[5px] font-semibold">Address:</span>
              <span
                className="text-[3px]  "
                // style={{
                //   marginTop: "5px",
                //   fontSize: "10px",
                //   paddingTop: "5px",
                //   margin: "0",
                //   padding: "0",
                // }}
              >
                {resumeData?.data?.heading?.postalCode},{" "}
                {resumeData?.data?.heading?.city},{" "}
                {resumeData?.data?.heading?.country}
              </span>
            </>
          )}

          {/* Phone */}
          {resumeData?.data?.heading?.phone && (
            <>
              <span
                className="text-[5px] "
                // style={{
                //   marginTop: "10px",
                //   fontSize: "14px",
                //   margin: "0",
                //   padding: "0",
                // }}
              >
                Phone:
              </span>
              <span className="text-[3px]  truncate">
                {resumeData?.data?.heading?.phone}
              </span>
            </>
          )}

          {/* Email */}
          {resumeData?.data?.heading?.email && (
            <>
              <span className="text-[5px] ">Email:</span>
              <span className="text-[3px]  truncate">
                {resumeData?.data?.heading?.email}
              </span>
            </>
          )}

          {/* LinkedIn */}
          {resumeData?.data?.heading?.linkedin && (
            <>
              <span className="text-[5px] ">LinkedIn:</span>
              <span
                // style={{
                //   fontSize: "10px",
                //   paddingTop: "5px",
                //   overflow: "hidden",
                //   textOverflow: "ellipsis",
                //   margin: "0",
                //   padding: "0",
                // }}
                className="text-[3px]   truncate"
              >
                {resumeData?.data?.heading?.linkedin}
              </span>
            </>
          )}

          {/* Portfolio */}
          {resumeData?.data?.portfolio?.data?.name && (
            <span
              className="text-[3px]  "
              //   style={{
              //     marginTop: "10px",
              //     fontSize: "12px",

              //     margin: "0",
              //     padding: "0",
              //   }}
            >
              {resumeData?.data?.portfolio?.data?.name}
            </span>
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
        className="text-[5px] text-justify"
        // style={{
        //   fontSize: "10px",
        //   marginTop: "5px",
        //   textAlign: "justify",
        //   margin: "0",
        //   padding: "0",
        // }}
        style={{ flexWrap: "wrap", wordBreak: "break-word" }}
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
          className="text-[10px]  mt-[2px] 
  border-b border-gray-500 
  border-t 
  text-[#003d73] 
  p-[4px] 
  font-extrabold "
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
              marginTop: "1px",
            }}
          >
            {/* Date Section */}
            <div style={{ width: "33%" }}>
              <p
                className="text-[5px] font-semibold text-black-500"
                // style={{
                //   fontWeight: "900",
                //   fontSize: "12px",
                //   color: "gray",
                //   margin: "0",
                // }}
              >
                {moment(`${data.startYear}${data.startMonth}`, "YYYYMM").format(
                  "MMM"
                )}{" "}
                {data.startYear} -{" "}
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
              <div className="flex flex-col">
                <span className="text-[7px] font-semibold pl-[2px]">
                  {data.jobTitle}
                </span>
                <span className="text-[5px] pl-[2px]  text-gray-500">
                  {data.employer}, {data.location}
                </span>
              </div>

              {data.description && (
                <p className="text-[5px] mt-[2px] pl-[2px] text-gray-500 text-justify">
                  {stripHtmlTags1(data.description)}
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
    <div style={{ marginTop: "2px", display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.skill?.data?.length > 0 && (
        <>
          <span className="text-[10px] font-semibold">Skills</span>

          {/* Skill Items */}
          {resumeData.data.skill.data.map((skill: any, index: any) => (
            <span key={index} className="text-[5px] mt-[1px] pb-[2px]">
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
            className="text-[10px]  mt-[2px] 
             border-b border-gray-500 
             border-t
             text-[#003d73] 
             p-[1px] 
             font-extrabold "
          >
            Education
          </p>

          {/* Education Items */}
          {resumeData.data.education.data.map((data: any, index: any) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2px",
                flexWrap: "nowrap",
              }}
            >
              {/* Date Section */}
              <div style={{ width: "33%" }}>
                <p className="font-semibold text-[5px] text-black-500">
                  {new Date(
                    `${data.endYear}-${data.endMonth}-01`
                  ).toLocaleString("en-US", { month: "short" })}
                  -{data.endYear}
                </p>
              </div>

              {/* Details Section */}
              <div style={{ width: "67%" }}>
                <div className="flex flex-col">
                  <span className="font-semibold text-[5px] pl-[2px]">
                    {data.degree}
                  </span>
                  <span className="text-[5px] pl-[2px] mt-[1px]">
                    {data.schoolName}
                  </span>
                </div>
                {data.description && (
                  <p
                    // style={{
                    //   fontSize: "10px",
                    //   marginTop: "5px",
                    //   paddingLeft: "5px",
                    //   color: "gray",
                    //   margin: "0",
                    //   textAlign: "justify",
                    // }}
                    className="text-[5px] mt-[2px] pl-[2px] text-gray-500 text-justify"
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
                    ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const CertificationSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      {resumeData?.data?.certificate?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <p
            className="text-[10px]  mt-[2px] 
            border-b border-gray-500 
            border-t 
            text-[#003d73] 
            p-[1px] 
            font-extrabold "
          >
            Certificates
          </p>

          {resumeData.data.certificate.data.map(
            (certification: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Certification Name */}
                <span className="text-[5px] text-gray-500">
                  • {certification.name}
                </span>

                {/* Certification Dates */}
                <span
                  //   style={{
                  //     fontSize: "12px",
                  //     color: "gray",
                  //     textAlign: "right",
                  //   }}
                  className="text-[5px] text-black-500 text-right"
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
            className="text-[10px]  mt-[2px] 
           border-b border-gray-500 
           border-t
           text-[#003d73] 
           p-[1px] 
           font-extrabold "
          >
            Accomplishments
          </p>

          {/* List of Accomplishments */}
          {resumeData.data.accomplishment.data.map(
            (accomplishment: any, index: number) => (
              <p key={index} className="text-[5px] flex text-gray-500">
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
    <div style={{ marginTop: "2px", display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.portfolio?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <span className=" font-semibold text-[10px]">Portfolios</span>

          {/* List of Portfolios */}
          {resumeData?.data?.portfolio?.data.map(
            (portfolio: any, index: number) => (
              <span key={index} className="text-[5px] mt-[1px] pb-[2px]">
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
    <div style={{ marginTop: "2px", display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.interest?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <span className=" font-semibold text-[10px]">Interests</span>

          {resumeData?.data?.interest?.data?.map(
            (interest: any, index: any) => (
              <span
                key={index}
                //
                className="text-[5px] mt-[1px] pb-[2px]"
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
          <p
            className="text-[10px]  mt-[2px] 
             border-b border-gray-500 
             border-t
             text-[#003d73] 
             p-[1px] 
             font-extrabold "
          >
            Softwares
          </p>

          {/* List of Software */}
          {resumeData.data.software.data.map((software: any, index: number) => (
            <span
              key={index}
              className="text-[5px] flex text-gray-500 flex-row"
            >
              {"• "} {software}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

const LanguageSection = ({ resumeData }: any) => {
  return (
    <div style={{ marginTop: "2px", display: "flex", flexDirection: "column" }}>
      {resumeData?.data?.language?.data?.length > 0 && (
        <>
          {/* Section Header */}
          <span className="text-[10px]  font-semibold">Languages</span>

          {resumeData.data.language.data.map((language: any, index: number) => (
            <span key={index} className="text-[5px] mt-[1px] pb-[2px]">
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

const Template1sm = ({
  resumeData,
  bgColor,
  cvInfo,
  customStyle = {
    headingSize: 10,
    subHeading: 8,
  },
}: any) => {
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
          paddingLeft: 5,
          paddingTop: 2,
          width: "40%",
          display: "flex",
          flexDirection: "column",
          // paddingBottom: 50,
          // boxSizing: "border-box",
          // height: "600px",
        }}
      >
        <PersonalInfoSection
          customStyle={customStyle}
          resumeData={resumeData}
        />
        <PortfolioSection resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
        <LanguageSection resumeData={resumeData} />
        <InterestSection resumeData={resumeData} />
      </div>

      <div
        style={{
          width: "60%",
          backgroundColor: "white",
          padding: 5,
          paddingTop: 5,
          textAlign: "justify",
          boxSizing: "border-box",
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

export default Template1sm;
