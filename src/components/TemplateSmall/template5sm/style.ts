import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: "white",
  },
  section: {},
  heading: {
    fontWeight: 900,
  },
  subHeading: {
    fontSize: 14,
  },
  text: {
    // marginBottom: 5,
  },
  hr: {
    borderTopWidth: 1,
    marginVertical: 5,
  },
});
