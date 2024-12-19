"use client";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Template7 from "../Templates/Template7";

// Define styles

// Utility function to split text into chunks with different word limits for the first and subsequent pages
const splitTextIntoChunks = (
  text: string,
  firstPageWordCount: number,
  subsequentPageWordCount: number
) => {
  const words = text.split(" ");
  const chunks = [];

  let currentIndex = 0;

  // First page chunk
  if (words.length > firstPageWordCount) {
    chunks.push(words.slice(0, firstPageWordCount).join(" "));
    currentIndex = firstPageWordCount;
  } else {
    chunks.push(words.join(" "));
    return chunks;
  }

  // Subsequent pages chunks
  while (currentIndex < words.length) {
    chunks.push(
      words
        .slice(currentIndex, currentIndex + subsequentPageWordCount)
        .join(" ")
    );
    currentIndex += subsequentPageWordCount;
  }

  return chunks;
};

// Create a CustomPage component for reusability
// const CustomPage = ({ children }: any) => (
//   <Page style={styles.page}>
//     <View style={{ flex: 1 }}>{children}</View>
//   </Page>
// );

// Create the PDF document
const PressPDF = ({ title }: { title: any }) => {
  //   const reportTextTransformed = title?.replace(/<[^>]*>/g, "");

  //   const chunks = splitTextIntoChunks(reportTextTransformed, 250, 300); // First page limit: 200 words, other pages: 300 words

  return <Template7 resumeData={title} bgColor={"#ccc"}></Template7>;
};

export default PressPDF;
