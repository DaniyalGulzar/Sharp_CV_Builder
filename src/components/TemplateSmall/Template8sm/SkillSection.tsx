import { pdfStyles as styles } from "./style";

export const SkillSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  return resume?.data?.skill?.data?.length ? (
    <>
      {resume?.data?.skill?.data?.length > 0 && (
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

          <div style={styles.lightBlueColor}>
            <div style={styles.coreCompetencies}>
              <div style={{ ...styles.competenciesContent }}>
                {resume?.data?.skill?.data.map((skill: any, index: number) => (
                  <span
                    key={index}
                    style={{
                      ...styles.item,
                      flexBasis:
                        (index + 1) % 3 === 1
                          ? "33.33%"
                          : (index + 1) % 3 === 2
                          ? "40%"
                          : "26.67%",
                    }}
                  >
                    {"\u2022"} {skill.title}&nbsp;
                    {skill.rating !== 0 && <>({skill.rating})</>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
};
