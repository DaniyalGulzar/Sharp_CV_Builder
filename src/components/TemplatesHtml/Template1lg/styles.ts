import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    display: "flex",
    backgroundColor: "#E4E4E4",
    // padding: "10px",
    margin: "0 auto",
  },
  sectionRight: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    width: "60%",
    marginLeft: "40%",
    // height: "1267px",
    textAlign: "justify",
    marginBottom: "120px",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeading: {},
  contentText: {
    fontSize: 12,
    marginTop: 5,
  },
  boldText: {
    fontWeight: 700,
  },
  gridRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  gridColLeft: {
    width: "25%",
  },
  gridColRight: {
    width: "75%",
  },
});
