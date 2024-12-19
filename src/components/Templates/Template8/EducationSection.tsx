import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
export const EducationSection = ({
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
  return resume?.data?.education?.data?.length ? (
    <>
      {resume?.data?.education?.data?.length > 0 && (
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
          {resume?.data?.education?.data?.map((edu: any, index: number) => (
            <View wrap={false} key={index}>
              <View style={styles.experienceSec}>
                <View style={{ width: "70%" }}>
                  <Text style={styles.experienceSecText}>
                    {edu?.degree} - {edu.schoolName}
                  </Text>
                </View>
                <View style={styles.dateClass}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "131.31%",
                      display: "flex",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {new Date(
                      `${edu.endYear}-${edu.endMonth}-01`
                    ).toLocaleString("en-US", {
                      month: "short",
                    })}
                    -{edu.endYear}
                  </Text>
                </View>
              </View>
              {edu?.description && (
                <View style={styles.lightBlueColor}>
                  <Text style={styles.lightBlueSectionText}>
                    {/* {exp?.description} */}
                    {/* {historyText} */}
                    {stripHtmlTags(edu?.description)}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </>
      )}
    </>
  ) : null;
};
