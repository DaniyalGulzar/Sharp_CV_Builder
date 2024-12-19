import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./style";

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
              backgroundColor: `${bgColor}`,
              marginTop: "2px",
            }}
          >
            <span style={styles.sectionTitleText}>{name}</span>
          </div>

          {resume?.data?.education?.data?.map((edu: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div className="w-3/4 p-0">
                  <span className="text-[7px] font-bold">
                    {edu?.degree} - {edu.schoolName}
                  </span>
                </div>
                <div className="w-1/4 text-right">
                  <span className="font-bold text-[5px]">
                    {new Date(
                      `${edu.endYear}-${edu.endMonth}-01`
                    ).toLocaleString("en-US", {
                      month: "short",
                    })}
                    -{edu.endYear}
                  </span>
                </div>
              </div>
              {edu?.description && (
                <div style={styles.lightBlueColor}>
                  <p
                    style={{
                      color: "#000",
                      fontSize: "5px",
                      fontStyle: "italic",
                      fontWeight: 500,
                      flexWrap: "wrap",
                      wordBreak: "break-word",
                    }}
                  >
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
