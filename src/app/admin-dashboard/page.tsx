"use client";
import React, { useEffect, useState } from "react";
import ADMINDASHBOARD from "@/screens/super-admin/admin-dashboard";
import { useSession } from "next-auth/react";

function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);
  return (
    <div className="flex w-full">
      {role === "SuperAdmin" ? <ADMINDASHBOARD /> : null}
    </div>
  );
}

export default AdminDashboard;
