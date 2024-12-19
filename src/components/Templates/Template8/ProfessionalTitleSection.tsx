import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";

// Utility function to strip HTML tags
const stripHtmlTags = (html: any) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ""); // Removes HTML tags
};

export const ProfessionalTitleSection = ({
  resume,
  bgColor,
}: {
  resume: any;
  bgColor: any;
}) => {
  const summaryText = stripHtmlTags(resume?.data?.summary?.value);

  return (
    <View
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: `${bgColor}`,
          alignItems: "center",
          marginTop: "14px",
          padding: "8px 16px",
        }}
      >
        {/* Check if resume profession exists */}
        {resume?.data?.heading?.profession && (
          <Text style={styles.professionalTitleText}>
            {resume.data.heading.profession}
          </Text>
        )}

        {/* Check if summaryText exists */}
        {summaryText && (
          <Text style={styles.professionalTitleSubText}>
            {summaryText}
          </Text>
        )}
      </View>

  );
};
