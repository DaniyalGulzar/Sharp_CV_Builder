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
  const stripHtmlTags1 = (html: any): string => {
    if (typeof html !== "string") return "";
    return html.replace(/<[^>]+>/g, "");
  };

  const sanitizeText1 = (text: string) => {
    return text
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const stripHtmlTags = (html: any): string[] => {
    if (typeof html !== "string") return [];

    // Create a temporary div element to parse the HTML
    const div = document.createElement("div");
    div.innerHTML = html;

    // Extract all <li> elements from the parsed HTML
    const listItems = div.querySelectorAll("li");

    // Return an array of list item text content
    return Array.from(listItems).map((item) => item.textContent?.trim() || "");
  };

  const sanitizeText = (text: string): string[] => {
    return stripHtmlTags(text).filter((item) => item.length > 0); // Remove empty items
  };
  return resume?.data?.education?.data?.length ? (
    <>
      {resume?.data?.education?.data?.length > 0 && (
        <>
          <div
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
            <span style={styles.sectionTitleText}>{name}</span>
          </div>
          {resume?.data?.education?.data?.map((edu: any, index: number) => (
            <div key={index}>
              <div style={styles.experienceSec}>
                <div style={{ width: "70%" }}>
                  <p style={styles.experienceSecText}>
                    {edu?.degree} - {edu.schoolName}
                  </p>
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <p
                    style={{
                      color: "#000",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 700,
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
                  </p>
                </div>
              </div>
              {edu?.description && (
                <div style={styles.lightBlueColor}>
                  <p style={styles.lightBlueSectionText}>
                    {/* {exp?.description} */}
                    {/* {historyText} */}
                    {sanitizeText(edu?.description).map((desc, index) => (
                      <div key={index} style={{ display: "flex" }}>
                        <span
                          style={{ marginRight: "5px", fontWeight: "bold" }}
                        >
                          •
                        </span>
                        {desc}
                      </div>
                    ))}{" "}
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  ) : null;
};
