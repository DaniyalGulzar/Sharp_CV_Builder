import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  container: {
    // border: "1px solid black",
    padding: 20,
    width: "100%",
    border: "1px solid red ",
  },
  heading: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profile: {
    marginBottom: 10,
    display: "flex",
  },
  sectionTitle: {
    color: "gray",
    marginBottom: 5,
    fontSize: 16,
  },
  section: {
    marginBottom: 10,
  },
  workItem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  date: {
    width: "30%",
    fontSize: 10,
    fontWeight: "bold",
  },
  details: {
    width: "50%",
    fontSize: 10,
  },
  location: {
    width: "20%",
    fontSize: 10,
    textAlign: "right",
  },
  skillItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
});
