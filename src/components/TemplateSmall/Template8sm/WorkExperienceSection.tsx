import React from "react";
import { pdfStyles as styles } from "./style";
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

  const sanitizeText = (text: string) => {
    return text
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
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
              backgroundColor: `${bgColor}`,
              marginTop: "2px",
            }}
          >
            <span style={styles.sectionTitleText}>{name}</span>
          </div>
          {resume?.data?.workHistory?.data?.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                {/* Left Content */}
                <div className="w-3/4">
                  <span className="text-[7px] font-bold">
                    {exp.jobTitle}
                    {exp?.employer && <>&nbsp;-&nbsp;{exp.employer}</>}
                    {exp?.location && <>&nbsp;-&nbsp;{exp.location}</>}
                  </span>
                </div>

                {/* Right Dates */}
                <div className="w-1/4 text-right">
                  <span className="font-bold text-[5px]">
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
                  <p
                    style={{
                      color: "#000",
                      fontSize: "5px",
                      fontStyle: "italic",
                      fontWeight: 500,
                      flexWrap: "wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {sanitizeText(stripHtmlTags(exp?.description))}
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  ) : null;
};
