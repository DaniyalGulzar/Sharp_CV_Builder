import React from "react";
import moment from "moment"; // Ensure you import moment if not already imported
import { pdfStyles as styles } from "./styles";

interface Certification {
  name: string;
  startDate: string;
  endDate: string;
}

interface CertificationSectionProps {
  resume: {
    data?: {
      certificate?: {
        data?: Certification[];
      };
    };
  };
  name: string;
  bgColor: string;
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({
  resume,
  name,
  bgColor,
}) => {
  const certifications = resume?.data?.certificate?.data;

  return (
    <>
      {certifications && certifications.length > 0 ? (
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              {certifications.map((certification, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "1.31",
                    marginBottom: "10px",
                  }}
                >
                  {/* Certification Name */}
                  <p
                    style={{
                      width: "60%",
                      margin: 0,
                    }}
                  >
                    {certification.name}
                  </p>

                  {/* Certification Dates */}
                  <p
                    style={{
                      width: "40%",
                      textAlign: "right",
                      fontSize: "10px",
                      margin: 0,
                    }}
                  >
                    ({moment(certification.startDate).format("MMM YYYY")} -{" "}
                    {moment(certification.endDate).format("MMM YYYY")})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
