import { Link } from "@react-pdf/renderer"; // Only Link is needed
import { pdfStyles as styles } from "./styles";

export const PortfolioSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  return resume?.data?.portfolio?.data?.length ? (
    <>
      {resume?.data?.portfolio?.data?.length > 0 && (
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "#DDE4F0",
                padding: "5px",
                borderLeft: "1px solid #526130",
                borderRight: "1px solid #526130",
                borderTop: "1px solid #526130",
              }}
            >
              {resume?.data?.portfolio?.data.map(
                (portfolio: any, index: number) => (
                  <p
                    key={index}
                    style={{
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                      marginBottom: "5px",
                      fontSize: "10px",
                      lineHeight: "1.5",
                    }}
                  >
                    • {portfolio?.portfolio}
                  </p>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
};
