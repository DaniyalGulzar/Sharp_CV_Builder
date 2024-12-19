"use client";

import React, { useEffect, useState } from "react";
import UserList from "@/screens/super-admin/user-list";
import { useSession } from "next-auth/react";

function AdminUserList() {
  const [role, setRole] = useState<string | null>(null);
  const { data: session }: any = useSession();
  
  useEffect(() => {
    if (!session) return;
    setRole(session.user.role);
  }, [session]);

  return (
    <div className="flex w-full">
      {role === "SuperAdmin" ? <UserList /> : null}
    </div>
  );
}
export default AdminUserList;
