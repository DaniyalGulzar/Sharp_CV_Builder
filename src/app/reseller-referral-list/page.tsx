"use client";

import React, { useEffect, useState } from "react";
import ResellerReferralList from "@/screens/reseller-referral-list";
import { useSession } from "next-auth/react";

function ReferralList() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);
  return (
    <div className="flex w-full">
      {role === "Reseller" ? <ResellerReferralList /> : null}
    </div>
  );
}
export default ReferralList;
