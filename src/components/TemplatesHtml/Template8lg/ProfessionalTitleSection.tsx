import { pdfStyles as styles } from "./styles";

// Utility function to strip HTML tags
const stripHtmlTags = (html: any) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ""); // Removes HTML tags
};

const sanitizeText = (text: string) => {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
export const ProfessionalTitleSection = ({
  resume,
  bgColor,
}: {
  resume: any;
  bgColor: any;
}) => {
  const summaryText = sanitizeText(stripHtmlTags(resume?.data?.summary?.value));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${bgColor}`,
        alignItems: "center",
        marginTop: "14px",
        padding: "8px 16px",
        textAlign: "justify",
        flexWrap: "wrap",
      }}
    >
      {/* Check if resume profession exists */}
      {resume?.data?.heading?.profession && (
        <span
          style={{
            color: "white",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 800,
            lineHeight: "normal",
            textAlign: "justify",
          }}
        >
          {resume.data.heading.profession}
        </span>
      )}

      {/* Check if summaryText exists */}
      {summaryText && (
        <span
          style={{
            color: "white",
            textAlign: "justify",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            marginTop: "8px",
            flexWrap: "wrap",
            wordBreak: "break-word",
          }}
        >
          {summaryText}
        </span>
      )}
    </div>
  );
};
