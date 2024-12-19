import React from "react";
import { formatDate } from "@/utils/date";
import { pdfStyles as styles } from "./styles";

export const AwardsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.awards?.length ? (
    <>
      {resume?.summary?.awards?.length > 0 && (
        <>
          <div
            className={`${styles.sectionTitle}`}
            style={{ padding: "5px 0px" }}
          >
            <span className={`${styles.sectionTitleText}`}>{name}</span>
          </div>
          {resume?.summary?.awards?.map((award: any, index: number) => (
            <div
              key={index}
              className={`${styles.experienceSec}`}
              style={{ paddingTop: "5px" }}
            >
              <span
                className={`${styles.experienceSecText}`}
                style={{ paddingTop: "5px" }}
              >
                {award?.title} - {award.issuer}
              </span>
              <span className={`${styles.remoteText}`}>
                {formatDate(award?.date, "MMM yyyy")}
              </span>
            </div>
          ))}
        </>
      )}
    </>
  ) : null;
};
