"use client";

import React, { useEffect, useState } from "react";
import ResellerCrud from "@/screens/super-admin/reseller";
import { useSession } from "next-auth/react";

function SuperAdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);
  return (
    <div className="flex w-full">
      {role === "SuperAdmin" ? <ResellerCrud /> : null}
    </div>
  );
}
export default SuperAdminDashboard;
