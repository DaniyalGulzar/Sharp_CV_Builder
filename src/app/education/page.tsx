"use client";

import React from "react";
import Education from "@/screens/education";
import withAuth from '@/app/auth/auth/authHOC'

function Educations() {
  return (
    <div className="flex w-full">
      <Education />
    </div>
  );
}

export default withAuth(Educations);
