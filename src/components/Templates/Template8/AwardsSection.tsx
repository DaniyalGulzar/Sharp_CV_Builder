import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
import { formatDate } from "@/utils/date";
export const AwardsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.awards?.length ? (
    <>
    {resume?.summary?.awards?.length > 0 &&
    <>
      <View wrap={false} style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{name}</Text>
      </View>
      {resume?.summary?.awards?.map((award: any, index: number) => (
        <View wrap={false} key={index} style={styles.experienceSec}>
          <Text style={{ ...styles.experienceSecText, paddingTop: "5px" }}>
            {award?.title} - {award.issuer}
          </Text>
          <Text style={styles.remoteText}>
            {formatDate(award?.date, "MMM yyyy")}
          </Text>
        </View>
      ))}
      </>
    }
    </>
  ) : null;
};
