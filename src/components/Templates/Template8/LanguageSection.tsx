import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";

export const LanguageSection = ({
  resume,
  name,
  bgColor,
}: {
  resume: any;
  name: string;
  bgColor: any;
}) => {
  return resume?.data?.language?.data?.length > 0 ? (
    <>
      <View
        wrap={false}
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
        <Text style={styles.sectionTitleText}>{name}</Text>
      </View>
      <View wrap={false} style={styles.lightBlueColor}>
        <View style={styles.coreCompetencies}>
          <View style={{ ...styles.competenciesContent }}>
            {resume?.data?.language?.data
              ?.filter((cor: any) => cor?.language?.trim()) // Filter to ensure valid entries
              .map((cor: any, index: number) => (
                <Text
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
                  {"\u2022"} {cor.language}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </>
  ) : null;
};
