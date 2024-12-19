import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  container: {
    // border: "1px solid black",
    width: "100%",
  },
  heading: {
    textAlign: "center",
  },
  name: {
    fontWeight: "bold",
  },
  profile: {
    display: "flex",
  },
  sectionTitle: {
    color: "gray",
  },
  section: {},
  workItem: {
    display: "flex",
    flexDirection: "row",
  },
  date: {
    width: "30%",
    fontWeight: "bold",
  },
  details: {
    width: "50%",
  },
  location: {
    width: "20%",
    textAlign: "right",
  },
  skillItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
  item: {
    maxWidth: "40%",
    flexBasis: "33.33%",
    color: "#000",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.31",
  },
});
