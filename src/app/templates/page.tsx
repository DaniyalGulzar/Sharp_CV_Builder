"use client";

import TemplatesScreen from "@/screens/templates";
import React from "react";
import withAuth from "@/app/auth/auth/authHOC";

function Template() {
  return (
    <div className="flex w-full">
      <TemplatesScreen />
    </div>
  );
}
export default withAuth(Template);
