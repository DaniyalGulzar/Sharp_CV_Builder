"use client";

import React, { useEffect, useState } from "react";
import ChangeEmailRequest from "@/screens/Customer-support/change-email-dashbaord";
import { useSession } from "next-auth/react";

function CustomerSupportDashBoard() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);
  return (
    <>
    {role === "CustomerSupport" ?
    <div className="flex w-full">
      <ChangeEmailRequest /> 
    </div>
    : null}
    </>
  );
}
export default CustomerSupportDashBoard;