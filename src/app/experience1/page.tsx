"use client";

import ExperienceScreen1 from "@/screens/experience1";
import React from "react";
import withAuth from '@/app/auth/auth/authHOC'

function Experience() {
  return (
    <div className="flex w-full">
      <ExperienceScreen1 />
    </div>
  );
}

export default withAuth(Experience);

