import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // padding: 10,
    // minHeight: "100vh",
    // fontSize: 12,
    // paddingTop: 5,
    // height: "100%",
    // paddingBottom: 5,
  },
  // leftSection: (bgColor: string) => ({
  //   backgroundColor: bgColor,
  //   color: "white",
  //   padding: 10,
  //   width: "33%",
  //   display: "flex",
  //   flexDirection: "column",
  // }),
  rightSection: {
    backgroundColor: "white",
    // border: "1px solid #ccc",
    padding: 5,
    display: "flex",
    flexDirection: "column",
    // width: "67%",
    // borderRadius: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  contactInfo: {},
  skillList: {},
  textGray: {
    color: "gray",
  },
  marginTop: {},
  fontBold: {
    fontWeight: "bold",
  },
});
