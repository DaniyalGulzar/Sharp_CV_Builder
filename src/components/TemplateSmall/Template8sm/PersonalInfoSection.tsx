import React from "react";
import { pdfStyles as styles } from "./style";
import { customFormatPhoneNumber } from "@/utils/phone";

export const PersonalInfoSection = ({ resume }: { resume: any }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "5px",
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span style={{ fontSize: "10px", fontWeight: "bold" }}>
        {resume?.data?.heading?.firstName && resume?.data?.heading?.firstName}{" "}
        {resume?.data?.heading?.lastName && resume?.data?.heading?.lastName}
      </span>
      <span style={{ fontSize: "5px" }}>
        {resume?.data?.heading?.city && resume?.data?.heading?.city},{" "}
        {resume?.data?.heading?.country && resume?.data?.heading?.country} |{" "}
        {resume?.data?.heading?.phone && resume?.data?.heading?.phone} |{" "}
        {resume?.data?.heading?.email && resume?.data?.heading?.email} |{" "}
        {resume?.data?.heading?.linkedin && resume?.data?.heading?.linkedin}
      </span>
    </div>
  );
};
