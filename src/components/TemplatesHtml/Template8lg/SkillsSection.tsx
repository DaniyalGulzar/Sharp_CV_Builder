import { pdfStyles as styles } from "./styles";

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
              padding: "5px 0px",
              backgroundColor: `${bgColor}`,
              marginTop: "6px",
            }}
          >
            <span style={styles.sectionTitleText}>{name}</span>
          </div>

          <div style={styles.lightBlueColor}>
            <div style={styles.coreCompetencies}>
              <div style={{ ...styles.competenciesContent }}>
                {resume?.data?.skill?.data?.map(
                  (cor: { title: string; rating: number }, index: number) => (
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
                      {"\u2022"} {cor.title}&nbsp;
                      {cor.rating !== 0 && <>( {cor.rating} )</>}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  ) : null;
};
