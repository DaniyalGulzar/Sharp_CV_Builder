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
    width: "70%",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 10,
    borderBottom: "1px solid gray",
    borderTop: "1px solid gray",
    color: "#003d73",
    padding: 4,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  educationItem: {
    flexDirection: "row",
    marginTop: 10,
  },
  dateColumn: {
    width: "33%",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
  },
  detailsColumn: {
    width: "67%",
    paddingLeft: 5,
  },
  degreeText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  schoolText: {
    fontWeight: "medium",
    fontSize: 10,
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 5,
    padding: 10,

    // paddingLeft: 5,
  },
  listItem: {
    flexDirection: "row",
    display: "flex",
    marginBottom: 2,
  },
  bullet: {
    marginRight: 2,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 10,
    color: "gray",
  },
});
