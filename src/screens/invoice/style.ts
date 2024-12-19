import { StyleSheet } from "@react-pdf/renderer";
export const pdfStyles = StyleSheet.create({
    page: {
      padding: 10,
      fontSize: 7,
    },
    section: {
      marginBottom: 10,
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