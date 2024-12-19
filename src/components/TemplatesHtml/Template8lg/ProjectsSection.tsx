import React from "react";
import { pdfStyles as styles } from "./styles";
import { formatDate } from "@/utils/date";

export const ProjectsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.projects?.length ? (
    <>
      <div style={styles.sectionTitle}>
        <p style={styles.sectionTitleText}>{name}</p>
      </div>
      {resume?.summary?.projects?.map((proj: any, index: number) => (
        <div key={index}>
          <div style={styles.experienceSec}>
            <div style={{ width: "70%" }}>
              <p style={styles.experienceSecText}>
                {proj?.name} - {proj?.companyName}
              </p>
            </div>
            <div style={styles.dateClass}>
              <p style={styles.remoteText}>
                {formatDate(proj?.startDate, "MMM yyyy")} -{" "}
                {formatDate(proj?.endDate, "MMM yyyy")}
              </p>
            </div>
          </div>
          <div>
            <div style={styles.lightBlueColor}>
              <p style={styles.lightBlueSectionText}>{proj?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  ) : null;
};
