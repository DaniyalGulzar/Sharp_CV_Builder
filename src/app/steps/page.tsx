"use client"

import StepsScreen from "@/screens/steps";
import React from "react";
import withAuth from '@/app/auth/auth/authHOC'

function Steps() {
  return (
    <div className="flex w-full">
      <StepsScreen />
    </div>
  );
};
export default withAuth(Steps);

