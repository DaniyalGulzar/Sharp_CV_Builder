"use client";

import React from "react";
import UploadResume from "@/screens/upload";
import withAuth from '@/app/auth/auth/authHOC'

function Final() {
  return (
    <div className="flex w-full">
      <UploadResume />
    </div>
  );
}
export default withAuth(Final);

