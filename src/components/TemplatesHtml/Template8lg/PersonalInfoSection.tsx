import React from "react";

export const PersonalInfoSection = ({ resume }: { resume: any }) => {
  return (
    <div
      style={{ textAlign: "center", marginBottom: "20px", flexWrap: "wrap" }}
    >
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}
      >
        {resume?.data?.heading?.firstName && resume?.data?.heading?.firstName}{" "}
        {resume?.data?.heading?.lastName && resume?.data?.heading?.lastName}
      </h1>
      <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
        {resume?.data?.heading?.city && resume?.data?.heading?.city},{" "}
        {resume?.data?.heading?.country && resume?.data?.heading?.country} |{" "}
        {resume?.data?.heading?.phone && resume?.data?.heading?.phone} |{" "}
        {resume?.data?.heading?.email && resume?.data?.heading?.email} |{" "}
        {resume?.data?.heading?.linkedin && resume?.data?.heading?.linkedin}
      </p>
    </div>
  );
};
