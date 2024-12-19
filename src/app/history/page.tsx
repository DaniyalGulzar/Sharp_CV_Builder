"use client";
import React from "react";
import HistoryScreen from "@/screens/history";
import withAuth from '@/app/auth/auth/authHOC'

function History() {
  return (
    <div className="flex w-full">
      <HistoryScreen />
    </div>
  );
}

export default withAuth(History);

