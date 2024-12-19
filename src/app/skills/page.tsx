"use client";

import React from "react";
import Skill from "@/screens/skills";
import withAuth from '@/app/auth/auth/authHOC'

function Skills() {
  return (
    <div className="flex w-full">
      <Skill />
    </div>
  );
}

export default withAuth(Skills);

