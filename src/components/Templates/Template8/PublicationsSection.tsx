import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
export const PublicationsSection = ({
  resume,
  name,
}: {
  resume: any;
  name: string;
}) => {
  return resume?.summary?.publications?.length ? (
    <>
      <View wrap={false} style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{name}</Text>
      </View>
      {resume?.summary?.publications?.map((publication:any, index:number) => (
        <View wrap={false} style={{...styles.experienceSec, marginTop:"5px"}} key={index}>
          <Link src={publication?.publicationUrl || ""}>
            <Text style={styles.experienceSecText}>{publication?.name}</Text>
          </Link>
        </View>
      ))}
    </>
  ) : null;
};
