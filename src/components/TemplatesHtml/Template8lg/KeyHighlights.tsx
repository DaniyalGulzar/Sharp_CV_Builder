import React from "react";
import { pdfStyles as styles } from "./styles";

export const KeyHighlights = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.keyHighlights?.length ? (
    <>
      <div className={`${styles.sectionTitle}`}>
        <span className={`${styles.sectionTitleText}`}>{name}</span>
      </div>
      <div style={{ paddingLeft: "8px" }}>
        {resume.summary.keyHighlights.map((high: any, index: number) => (
          <div
            key={index}
            style={{
              ...styles.bulletPoint,
              marginTop: "2px",
              paddingRight: "10px",
            }}
          >
            <span>{"\u2022"}&nbsp;</span>
            <span>{high}</span>
          </div>
        ))}
      </div>
    </>
  ) : null;
};
