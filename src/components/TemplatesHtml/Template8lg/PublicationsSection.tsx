import React from "react";
import { pdfStyles as styles } from "./styles";

export const PublicationsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.publications?.length ? (
    <>
      <div style={styles.sectionTitle}>
        <p style={styles.sectionTitleText}>{name}</p>
      </div>
      {resume?.summary?.publications?.map((publication: any, index: number) => (
        <div style={{ ...styles.experienceSec, marginTop: "5px" }} key={index}>
          <a
            href={publication?.publicationUrl || ""}
            style={styles.experienceSecText}
          >
            {publication?.name}
          </a>
        </div>
      ))}
    </>
  ) : null;
};
