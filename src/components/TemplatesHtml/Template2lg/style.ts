import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    padding: 20,
    fontSize: 12,
  },
  leftSection: {
    backgroundColor: "#333333", // Change as per bgColor if needed
    color: "white",
    padding: 10,
    width: "20%",
  },
  rightSection: {
    backgroundColor: "white",
    // padding: 10,
    width: "100%",
    // borderLeft: "1px solid #ddd",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    color: "#0000EE",
    textDecoration: "underline",
  },
  skillItem: {
    marginBottom: 3,
  },

  // section: {
  //   paddingTop: 4,
  // },
  linkContainer: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "#1E90FF",
    // Equivalent to text-blue-600
  },
  iconText: {
    // marginRight: 8,
    fontSize: 12,
  },
  infoText: {
    fontSize: 12,
  },
});
