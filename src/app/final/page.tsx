"use client";

import React from "react";
import Finalize from "@/screens/finalize";
import withAuth from '@/app/auth/auth/authHOC'

function Final() {
  return (
    <div className="flex w-full">
      <Finalize />
    </div>
  );
}
export default withAuth(Final);
