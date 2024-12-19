import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
import { formatDate } from "@/utils/date";
import moment from "moment";
export const WorkExperienceSection = ({
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
  return resume?.data?.workHistory?.data?.length ? (
    <>
      {resume?.data?.workHistory?.data?.length > 0 && (
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
          {resume?.data?.workHistory?.data?.map((exp: any, index: number) => (
            <View wrap={false} key={index}>
              <View style={styles.experienceSec}>
                <View style={{ width: "70%" }}>
                  <Text
                    style={{ ...styles.experienceSecText, marginTop: "5px" }}
                  >
                    {exp.jobTitle}
                    {exp?.employer && <>&nbsp;-&nbsp;{exp.employer}</>}
                    {exp?.location && <>&nbsp;-&nbsp;{exp.location}</>}
                  </Text>
                </View>
                <View style={styles.dateClass}>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 12, marginTop: 3 }}
                  >
                    {moment(
                      `${exp.startYear}-${exp.startMonth}`,
                      "YYYY-MM"
                    ).format("MMM")}{" "}
                    {exp.startYear} -{" "}
                    {exp.isCurrent
                      ? "Present"
                      : `${moment(
                          `${exp.endYear}-${exp.endMonth}`,
                          "YYYY-MM"
                        ).format("MMM")}  ${exp.endYear}`}
                  </Text>
                </View>
              </View>
              {exp?.description && (
                <View style={styles.lightBlueColor}>
                  <Text style={styles.lightBlueSectionText}>
                    {/* {exp?.description} */}
                    {/* {historyText} */}
                    {stripHtmlTags(exp?.description)}
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
