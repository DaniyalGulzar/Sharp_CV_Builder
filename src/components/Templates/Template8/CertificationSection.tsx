import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
import moment from "moment"; // Ensure you import moment if not already imported

export const CertificationSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  return resume?.data?.certificate?.data?.length ? (
    <>
      {resume?.data?.certificate?.data?.length > 0 && (
        <>
          <View
            wrap={false}
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
            <Text style={styles.sectionTitleText}>{name}</Text>
          </View>
          <View wrap={false} style={styles.lightBlueColor}>
            <View style={styles.coreCompetencies}>
              <View style={{ ...styles.competenciesContent }}>
                {resume?.data?.certificate?.data?.map(
                  (cert: any, index: number) =>
                    cert.name && (
                      <View
                        key={index}
                        style={{
                          color: "#000",
                          fontSize: "10px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "1.31",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: "10px", // Optional: Add margin to separate items
                        }}
                      >
                        <Text
                          style={{
                            width: "60%", // Takes up 60% of the row width for the name
                          }}
                        >
                          {cert.name}
                        </Text>
                        <Text
                          style={{
                            width: "40%", // Takes up 40% of the row width for the dates
                            textAlign: "right", // Align dates to the right
                            fontSize: 10, // Optional: Adjust font size for dates
                          }}
                        >
                          ({moment(cert.startDate).format("MMM YYYY")} -{" "}
                          {moment(cert.endDate).format("MMM YYYY")})
                        </Text>
                      </View>
                    )
                )}
              </View>
            </View>
          </View>
        </>
      )}
    </>
  ) : null;
};
