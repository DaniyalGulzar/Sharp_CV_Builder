import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
import { formatDate } from "@/utils/date";
export const ProjectsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.projects?.length ? (
    <>
      <View wrap={false} style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{name}</Text>
      </View>
      {resume?.summary?.projects?.map((proj:any, index:number) => (
        <View wrap={false} key={index}>
          <View style={styles.experienceSec}>
            <View style={{ width: "70%" }}>
              <Text style={styles.experienceSecText}>
                {proj?.name} - {proj?.companyName}
              </Text>
            </View>
            <View style={styles.dateClass}>
              <Text style={styles.remoteText}>
                {formatDate(proj?.startDate, "MMM yyyy")} -{" "}
                {formatDate(proj?.endDate, "MMM yyyy")}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.lightBlueColor}>
              <Text style={styles.lightBlueSectionText}>
                {proj?.description}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  ) : null;
};
