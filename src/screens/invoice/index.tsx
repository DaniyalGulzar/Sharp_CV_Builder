import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./style";

const Invoice = () => {
  return (
    <>
      <Document>
        <Page>
          <View style={styles.heading}>
            <View style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{}}>hello</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default Invoice;
