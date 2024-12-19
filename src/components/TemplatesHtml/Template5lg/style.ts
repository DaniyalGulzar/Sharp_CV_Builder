import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: "white",
  },
  section: {
    marginBottom: 10,
    marginTop: 20,
    padding: "5px",
  },
  heading: {
    fontSize: 24,
    fontWeight: 900,
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 3,
  },
  text: {
    // marginBottom: 5,
  },
  hr: {
    borderTopWidth: 1,
    marginVertical: 5,
  },
});
