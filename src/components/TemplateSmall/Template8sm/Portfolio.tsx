import { Link } from "@react-pdf/renderer"; // Only Link is needed
import { pdfStyles as styles } from "./style";

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
              backgroundColor: `${bgColor}`,
              marginTop: "2px",
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
                border: "1px solid #526130",
              }}
            >
              {resume?.data?.portfolio?.data.map(
                (portfolio: any, index: number) => (
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
                    • {portfolio?.portfolio}
                  </span>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
};
