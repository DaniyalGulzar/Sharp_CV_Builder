import React from "react";
import { pdfStyles as styles } from "./styles";
import { formatDate } from "@/utils/date";
import moment from "moment";

export const WorkExperienceSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  const stripHtmlTags = (html: any): string => {
    if (typeof html !== "string") return ""; // Return empty string if html is not a string
    return html.replace(/<[^>]+>/g, "");
  };

  return resume?.data?.workHistory?.data?.length ? (
    <>
      {resume?.data?.workHistory?.data?.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px 0px",
              backgroundColor: `${bgColor}`,
              marginTop: "6px",
            }}
          >
            <span style={styles.sectionTitleText}>{name}</span>
          </div>
          {resume?.data?.workHistory?.data?.map((exp: any, index: number) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div style={{ width: "70%" }}>
                  <span
                    style={{ ...styles.experienceSecText, marginTop: "5px" }}
                  >
                    {exp.jobTitle}
                    {exp?.employer && <>&nbsp;-&nbsp;{exp.employer}</>}
                    {exp?.location && <>&nbsp;-&nbsp;{exp.location}</>}
                  </span>
                </div>
                <div style={{ width: "30%", textAlign: "right" }}>
                  <span
                    style={{ fontWeight: "bold", fontSize: 12, marginTop: 3 }}
                  >
                    {moment(
                      `${exp.startYear}-${exp.startMonth}`,
                      "YYYY-MM"
                    ).format("MMM")}{" "}
                    {exp.startYear} -{" "}
                    {exp.isCurrent
                      ? "Present"
                      : `${moment(
                          `${exp.endYear}-${exp.endMonth}`,
                          "YYYY-MM"
                        ).format("MMM")} ${exp.endYear}`}
                  </span>
                </div>
              </div>
              {exp?.description && (
                <div style={styles.lightBlueColor}>
                  <span style={styles.lightBlueSectionText}>
                    {stripHtmlTags(exp?.description)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  ) : null;
};
