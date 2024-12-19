import { Text, View, Link } from "@react-pdf/renderer";
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
      <View wrap={false} style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{name}</Text>
      </View>
      <View style={{ paddingLeft: "8px" }}>
        {resume.summary.keyHighlights.map((high: any, index: any) => (
          <View
            key={index}
            wrap={false}
            style={{
              ...styles.bulletPoint,
              marginTop: "2px",
              paddingRight: "10px",
            }}
          >
            <Text>{"\u2022"}&nbsp;</Text>
            <Text>{high}</Text>
          </View>
        ))}
      </View>
    </>
  ) : null;
};
