import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    // padding: 20,
    height: "100%",
  },
  section: {
    marginBottom: 10,
    flexDirection: "column",

    // display: "flex",
  },
  header: {
    backgroundColor: "#ffffff",
    border: "2px solid black",
    textAlign: "center",
    padding: 10,
    fontSize: 28,
    fontWeight: 900,
  },
  subSection: {
    // flexDirection: "column",
    // padding: 10,
    // backgroundColor: "#f0f0f0", // You can set dynamic colors here using props if needed
    // minHeight: 300,
    // height: "1267px",
    // width: "40%",
  },
  heading: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "black",
    marginBottom: 3,
  },
  link: {
    fontSize: 12,
    color: "white",
    textDecoration: "underline",
  },
  summarySection: {
    // marginTop: 10,
    // fontSize: 12,
    // lineHeight: 1.5,
    // width: "60%",
    // height: "1267px",
    // textAlign: "justify",
  },
  workExperience: {
    marginTop: 10,
    fontSize: 12,
  },
  education: {
    marginTop: 10,
    fontSize: 12,
  },
  skills: {
    marginTop: 10,
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
  rightAlign: {
    textAlign: "right",
  },
});
