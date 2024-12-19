"use client";

import React from "react";
import Summarycom from "@/screens/summary";
import withAuth from '@/app/auth/auth/authHOC'

function Summary() {
  return (
    <div className="flex w-full">
      <Summarycom />
    </div>
  );
}
export default withAuth(Summary);

