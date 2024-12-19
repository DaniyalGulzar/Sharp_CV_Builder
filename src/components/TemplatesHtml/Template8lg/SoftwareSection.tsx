import React from "react";
import { pdfStyles as styles } from "./styles"; // Import the styles

export const SoftwareSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  return resume?.data?.software?.data?.length ? (
    <>
      {resume?.data?.software?.data?.length > 0 && (
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
          <div style={styles.lightBlueColor}>
            <div style={styles.coreCompetencies}>
              <div style={{ ...styles.competenciesContent }}>
                {resume?.data?.software?.data?.map(
                  (cor: any, index: number) => (
                    <span
                      key={index}
                      style={{
                        ...styles.item,
                        flexBasis:
                          (index + 1) % 3 === 1
                            ? "33.33%"
                            : (index + 1) % 3 === 2
                            ? "40%"
                            : "26.67%",
                      }}
                    >
                      {"\u2022"} {cor}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
};
