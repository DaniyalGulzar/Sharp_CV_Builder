import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  page: {
    //  padding: 20,
    fontSize: 12,
    // paddingBottom: 10,
    position: "relative",
    // marginBottom: 5,
  },
  header: {
    flexDirection: "row",

    // marginBottom: 20,
  },
  // headerLeft: (bgColor?: string) => ({
  //   backgroundColor: bgColor || "#000000",
  //   flex: 1,
  //   height: 60,
  // }),
  headerRight: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 50,
  },
  footerLeft: {
    // position: "absolute",
    flex: 1,
    height: 50,
    // bottom: 0,
    // right: 0,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "#1E40AF",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 5,
  },
  link: {
    color: "#2563EB",
    textDecoration: "none",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 5,
  },
});
